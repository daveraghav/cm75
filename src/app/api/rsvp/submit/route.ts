import { NextResponse } from "next/server";
import { submitRsvp } from "@/lib/coda";

const MAX_PARTY_SIZE = 10;

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const partyCount = Number(data.partyCount);
    if (!Number.isInteger(partyCount) || partyCount < 1 || partyCount > MAX_PARTY_SIZE) {
      return NextResponse.json(
        { error: `Party size must be between 1 and ${MAX_PARTY_SIZE} people (including yourself).` },
        { status: 400 }
      );
    }

    const codaData = {
      "c-UVzbroWefM": data.title,
      "c-vdLbyggfxc": data.fullName,
      "c-QvB82aV0h4": data.organisation,
      "c-RrvT4gMpV4": data.events, // Array of strings
      "c-lgUGVGeoEP": data.phone,
      "c-WBQw1-XKFV": data.email,
      "c-EuQxqdCbUO": data.specialRequirements,
      "c-PVtkAdAxew": partyCount,
      "c-VxBPUthWR0": data.notes,
      "c-qT003IVQVT": data.subscribe,
    };

    await submitRsvp(codaData);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Coda RSVP Submission Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
