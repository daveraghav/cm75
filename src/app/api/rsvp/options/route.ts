import { NextResponse } from "next/server";
import { getRsvpOptions } from "@/lib/coda";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const options = await getRsvpOptions();
    return NextResponse.json(options);
  } catch (error: any) {
    console.error("Fetch RSVP Options Error:", error);
    return NextResponse.json({ titles: [], events: [] }, { status: 500 });
  }
}
