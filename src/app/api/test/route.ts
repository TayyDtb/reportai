import { NextResponse } from "next/server";

/**
 * Temporary debug endpoint. Remove or restrict before production —
 * exposes a prefix of ANTHROPIC_API_KEY over the network.
 */
export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY ?? "";
  const prefix = key.slice(0, 15);

  return NextResponse.json({
    anthropicApiKeyPrefix: prefix,
    keyLength: key.length
  });
}
