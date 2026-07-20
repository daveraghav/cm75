import { NextResponse } from "next/server";
import { submitRsvp } from "@/lib/coda";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const codaData = {
      "c-UVzbroWefM": data.title,
      "c-vdLbyggfxc": data.fullName,
      "c-QvB82aV0h4": data.organisation,
      "c-RrvT4gMpV4": data.events, // Array of strings
      "c-lgUGVGeoEP": data.phone,
      "c-WBQw1-XKFV": data.email,
      "c-EuQxqdCbUO": data.specialRequirements,
      "c-PVtkAdAxew": data.partyCount,
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
