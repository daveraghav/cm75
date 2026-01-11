import { NextResponse } from "next/server";
import { fetchCoda } from "@/lib/coda";

const CODA_DOC_ID = process.env.CODA_DOC_ID;
const TABLE_ID = "grid-sync-1054-Table-dynamic-7d732c10a0257d78bcc179ab2941dbee0613320f6422067d6b26b6e62d2d2826";

export async function GET() {
  try {
    const data = await fetchCoda(`/docs/${CODA_DOC_ID}/tables/${TABLE_ID}/rows?useColumnNames=false`);
    
    // Filter and map yatras
    console.log("Coda Data Received:", JSON.stringify(data.items[0], null, 2));
    
    const yatras = data.items
      .filter((row: any) => {
        const status = (row.values["c-GGlBmT6_60"] || "").toString();
        const isTestBooking = row.values["c-00ofsnuDNv"] === true;
        const name = (row.values["c-Nxi1p8B_Co"] || "").toString();
        
        // Filter by status (Confirmed or Live) AND exclude rows where "Test booking" is checked
        const isLiveOrConfirmed = status.includes("Confirmed") || status.includes("Live");
        
        return isLiveOrConfirmed && !isTestBooking && name.trim() !== "";
      })
      .map((row: any) => ({
        id: row.id,
        name: row.values["c-Nxi1p8B_Co"],
        date: row.values["c-VPvKp33AS8"] || "",
      }))
      .sort((a: any, b: any) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

    return NextResponse.json(yatras);
  } catch (error: any) {
    console.error("Fetch Yatras Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
