import { NextResponse } from "next/server";
import type { GeneratedReportSections } from "@/types/generated-report";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";

type RequestBody = {
  notes?: string;
  address?: string;
  inspectionType?: string;
};

function buildPrompt(notes: string, address: string, inspectionType: string): string {
  return `You are a senior certified home inspector drafting a formal, client-facing inspection report. Write in third person ("The inspector observed..."), professional tone, and accurate technical language. Expand and organize the inspector's raw notes into a complete narrative. If certain topics are thin or missing in the notes, still produce a substantive section by inferring typical conditions for ${inspectionType} properties unless the notes explicitly contradict that—always flag uncertainty as "cannot be fully assessed from notes" rather than inventing site-specific measurements.

Property address: ${address}
Inspection type: ${inspectionType}

Inspector's raw field notes:
"""
${notes}
"""

Respond with ONLY a single JSON object (no markdown fences, no commentary before or after). Use exactly these keys and non-empty string values suitable for embedding in PDF-style reports:

- "executiveSummary"
- "roofCondition"
- "foundation"
- "electricalSystems"
- "plumbing"
- "hvac"
- "recommendations"

Section focus:
- executiveSummary: high-level overview, overall condition, urgency of follow-ups
- roofCondition: coverings, flashing, drainage, attic signs if referenced
- foundation: slabs, crawl, basement water, cracks, grading if referenced
- electricalSystems: panels, grounding, observable defects, GFCI references if any
- plumbing: supply/waste/fixtures/leaks/water heater if referenced
- hvac: equipment age if known, operation, ducts, combustion safety if referenced
- recommendations: prioritized next steps for homeowners and trades

Each value should be 1–3 tight paragraphs unless the notes demand more.`;
}

function extractJson(text: string): string {
  const trimmed = text.trim();
  const fence = /^```(?:json)?\s*([\s\S]*?)```$/m.exec(trimmed);
  if (fence) return fence[1].trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

function validateReport(parsed: unknown): parsed is GeneratedReportSections {
  if (!parsed || typeof parsed !== "object") return false;
  const o = parsed as Record<string, unknown>;
  const keys: (keyof GeneratedReportSections)[] = [
    "executiveSummary",
    "roofCondition",
    "foundation",
    "electricalSystems",
    "plumbing",
    "hvac",
    "recommendations"
  ];
  return keys.every((k) => typeof o[k] === "string" && (o[k] as string).trim().length > 0);
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY || "";
  console.log("API KEY LENGTH:", apiKey.length);

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Anthropic API key is not configured. Set ANTHROPIC_API_KEY in your environment."
      },
      { status: 500 }
    );
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const notes = typeof body.notes === "string" ? body.notes.trim() : "";
  const address =
    typeof body.address === "string" ? body.address.trim() : "";
  const inspectionType =
    typeof body.inspectionType === "string" ? body.inspectionType.trim() : "";

  if (!notes) {
    return NextResponse.json(
      { error: "Inspection notes are required." },
      { status: 400 }
    );
  }
  if (!address) {
    return NextResponse.json(
      { error: "Property address is required." },
      { status: 400 }
    );
  }
  if (!inspectionType) {
    return NextResponse.json(
      { error: "Inspection type is required." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 8192,
        messages: [{ role: "user", content: buildPrompt(notes, address, inspectionType) }]
      })
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => "");
      console.error("[generate-report] Anthropic error:", response.status, errBody);
      return NextResponse.json(
        {
          error: "The AI service returned an error. Please try again in a moment."
        },
        { status: response.status === 529 ? 503 : 502 }
      );
    }

    const data = (await response.json()) as {
      content?: Array<{ type?: string; text?: string }>;
    };
    const textBlock = data.content?.find((c) => c.type === "text");
    const rawText =
      typeof textBlock?.text === "string" ? textBlock.text : "";

    if (!rawText) {
      return NextResponse.json(
        { error: "Empty response from AI service." },
        { status: 502 }
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(extractJson(rawText));
    } catch {
      return NextResponse.json(
        {
          error:
            "Could not parse the AI response. Please regenerate or shorten your notes."
        },
        { status: 502 }
      );
    }

    if (!validateReport(parsed)) {
      return NextResponse.json(
        {
          error: "AI response missing required sections. Please try again."
        },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[generate-report]", err);
    return NextResponse.json(
      { error: "Failed to generate report." },
      { status: 500 }
    );
  }
}
