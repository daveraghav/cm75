import { NextResponse } from "next/server";
import { fetchCoda } from "@/lib/coda";

const CODA_DOC_ID = process.env.CODA_DOC_ID;
const TABLE_ID = "grid-3fCtsRiA3y"; // People Table
const COLUMN_ID = "c-wuPInc9Fy4";  // Location Column

export async function GET() {
  try {
    const data = await fetchCoda(`/docs/${CODA_DOC_ID}/tables/${TABLE_ID}/columns/${COLUMN_ID}`);
    
    // Extract select options
    const locations = (data.format?.options || []).map((opt: any) => opt.name);

    return NextResponse.json(locations);
  } catch (error: any) {
    console.error("Fetch Locations Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
