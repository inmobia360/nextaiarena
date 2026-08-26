import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "nextai-arena",
    timestamp: new Date().toISOString(),
  });
}
