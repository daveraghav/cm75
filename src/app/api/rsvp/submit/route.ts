import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Registrations are now closed. Please email rsvp@chinmayauk.org to RSVP." },
    { status: 410 }
  );
}
