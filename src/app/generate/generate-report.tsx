"use client";

import type { ReactNode } from "react";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

import type { GeneratedReportSections } from "@/types/generated-report";

type Phase = "idle" | "loading" | "done";

const TYPE_LABELS: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  "new-construction": "New Construction"
};

export function GenerateReport() {
  const addressId = useId();
  const typeId = useId();
  const notesId = useId();

  const [phase, setPhase] = useState<Phase>("idle");
  const [report, setReport] = useState<GeneratedReportSections | null>(null);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const notes = String(formData.get("notes") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();
    const typeRaw = String(formData.get("inspectionType") ?? "");

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setError(null);
    setReport(null);
    setPhase("loading");

    try {
      const inspectionType =
        TYPE_LABELS[typeRaw] ?? (typeRaw || "Inspection");

      const response = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, address, inspectionType }),
        signal: ac.signal
      });

      const data = (await response.json().catch(() => ({}))) as
        | GeneratedReportSections
        | { error?: string };

      if (!response.ok) {
        const message =
          typeof (data as { error?: string }).error === "string"
            ? (data as { error: string }).error
            : "Could not generate the report.";
        setError(message);
        setPhase("idle");
        return;
      }

      setReport(data as GeneratedReportSections);
      setPhase("done");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
      setPhase("idle");
    }
  }

  function handleReset() {
    abortRef.current?.abort();
    setPhase("idle");
    setReport(null);
    setError(null);
  }

  const inputDisabled = phase === "loading";

  return (
    <div className="w-full max-w-3xl space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-card md:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <label htmlFor={notesId} className="block">
            <span className="mb-2 block text-sm font-medium text-headline">
              Inspection notes
            </span>
            <textarea
              id={notesId}
              name="notes"
              rows={10}
              required
              className="w-full resize-y rounded-lg border border-gray-200 bg-white px-4 py-3 text-headline outline-none transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
              placeholder="Enter findings, measurements, deficiencies, recommendations…"
              disabled={inputDisabled}
            />
          </label>

          <label htmlFor={typeId} className="block">
            <span className="mb-2 block text-sm font-medium text-headline">
              Inspection type
            </span>
            <select
              id={typeId}
              name="inspectionType"
              required
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-headline outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
              defaultValue=""
              disabled={inputDisabled}
            >
              <option value="" disabled>
                Select a type…
              </option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="new-construction">New Construction</option>
            </select>
          </label>

          <label htmlFor={addressId} className="block">
            <span className="mb-2 block text-sm font-medium text-headline">
              Property address
            </span>
            <input
              id={addressId}
              name="address"
              type="text"
              required
              autoComplete="street-address"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-headline outline-none transition placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
              placeholder="123 Main St, Springfield, ST 12345"
              disabled={inputDisabled}
            />
          </label>

          <button
            type="submit"
            disabled={phase === "loading"}
            className="w-full rounded-lg bg-accent py-4 text-lg font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/92 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate Report
          </button>
        </form>
      </div>

      {phase === "loading" ? (
        <div
          role="status"
          aria-live="polite"
          className="animate-pulse rounded-2xl border border-accent/15 bg-accent/5 px-6 py-5 text-center text-base font-semibold text-headline"
        >
          AI is generating your report...
        </div>
      ) : null}

      {error ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-900"
        >
          {error}
        </div>
      ) : null}

      {phase === "done" && report ? (
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight text-headline md:text-2xl">
            Inspection report
          </h2>

          <ReportSection title="Executive Summary">
            <ReportBody text={report.executiveSummary} />
          </ReportSection>

          <ReportSection title="Roof Condition">
            <ReportBody text={report.roofCondition} />
          </ReportSection>

          <ReportSection title="Foundation">
            <ReportBody text={report.foundation} />
          </ReportSection>

          <ReportSection title="Electrical Systems">
            <ReportBody text={report.electricalSystems} />
          </ReportSection>

          <ReportSection title="Plumbing">
            <ReportBody text={report.plumbing} />
          </ReportSection>

          <ReportSection title="HVAC">
            <ReportBody text={report.hvac} />
          </ReportSection>

          <ReportSection title="Recommendations">
            <ReportBody text={report.recommendations} />
          </ReportSection>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              Generate another report
            </button>
          </div>
        </div>
      ) : null}

      <p className="text-center text-sm text-slate-500">
        <Link href="/" className="font-semibold text-slate-600 hover:text-accent">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

function ReportBody({ text }: Readonly<{ text: string }>) {
  const blocks = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <>
      {blocks.map((para, index) => (
        <p key={index} className="mb-3 last:mb-0">
          {para}
        </p>
      ))}
    </>
  );
}

function ReportSection({
  title,
  children
}: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-slate-50/70 p-6 shadow-sm">
      <h3 className="mb-3 text-base font-semibold text-headline">{title}</h3>
      <div className="text-sm leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}
