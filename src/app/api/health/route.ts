import { NextResponse } from "next/server";

/** Example API route — replace or extend per client. See docs/BACKEND.md */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "guvani-app-starter",
    hint: "Read docs/BACKEND.md before adding backend features",
  });
}
