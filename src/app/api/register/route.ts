import { NextResponse } from "next/server";
import { registerForEvent } from "@/lib/coda";

const TABLE_ID = "grid-3fCtsRiA3y"; // People Table

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Map frontend fields to Coda Column IDs for the People table
    const codaData = {
      "c-rZ9KroAK5e": data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim(), // Full Name (fallback to joining)
      "c-xMcm4BsqD5": data.firstName, // First Name
      "c-wh0I8bH1Pw": data.lastName,  // Surname
      "c-vIgbOysVdU": data.email,    // Email Address
      "c-Fm0EQERoEQ": data.phone,    // Phone Number
      "c-wuPInc9Fy4": data.city,     // Location
      "c-QKPF4SeChY": data.areaOfInterest, // Area of Interest
      "c-JbV0QvPZYz": data.events || data.event,    // Yatra (supports array of IDs)
      "c-yW5dQ-WL1h": data.subscribe, // Subscribed checkbox
      "c-qHz6jtPLg5": data.source || "CM75 Registration", // Source
      "c-B6JxOGKeC5": new Date().toISOString(), // Registered On
    };

    await registerForEvent(TABLE_ID, codaData);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Coda Registration Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
