import { NextResponse } from "next/server";
import { fetchCoda } from "@/lib/coda";

export const dynamic = 'force-dynamic';

const CODA_DOC_ID = process.env.CODA_DOC_ID;
const TABLE_ID = "grid-3fCtsRiA3y";
const COLUMN_ID = "c-QKPF4SeChY";

export async function GET() {
  try {
    const data = await fetchCoda(`/docs/${CODA_DOC_ID}/tables/${TABLE_ID}/columns/${COLUMN_ID}`);
    
    if (data.format && data.format.options) {
      const options = data.format.options.map((opt: any) => opt.name);
      return NextResponse.json(options);
    }
    
    return NextResponse.json([]);
  } catch (error: any) {
    console.error("Fetch Interests Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
