import { NextResponse } from "next/server";
import { fetchCoda } from "@/lib/coda";

export const dynamic = 'force-dynamic';

const CODA_DOC_ID = process.env.CODA_DOC_ID;
const TABLE_ID = "grid-sync-1054-Table-dynamic-7d732c10a0257d78bcc179ab2941dbee0613320f6422067d6b26b6e62d2d2826";

export async function GET() {
  try {
    const data = await fetchCoda(`/docs/${CODA_DOC_ID}/tables/${TABLE_ID}/rows?useColumnNames=false&valueFormat=rich`);
    
    // Helper to clean Coda's rich text (removes all triple backticks)
    const cleanRichText = (val: any): string => {
      if (Array.isArray(val)) {
        return val.map(v => cleanRichText(v)).join(", ");
      }
      if (typeof val !== 'string') return val?.toString() || "";
      return val.replace(/```/g, '').trim();
    };

    // Filter and map yatras
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Start of today

    const yatras = data.items
      .filter((row: any) => {
        const status = cleanRichText(row.values["c-GGlBmT6_60"] || "").toString();
        const isTestBooking = row.values["c-00ofsnuDNv"] === true;
        const name = cleanRichText(row.values["c-Nxi1p8B_Co"] || "").toString();
        const displayOnWebsite = row.values["c-WUNoH1bQH-"] === true;
        
        // Date check: Only show events from today onwards
        const startDateVal = cleanRichText(row.values["c-VPvKp33AS8"]);
        const isFuture = startDateVal ? new Date(startDateVal) >= now : true;
        
        // Filter by status (Confirmed or Live) AND exclude rows where "Test booking" is checked
        // AND ensure "Display on website" is true
        const isLiveOrConfirmed = status.includes("Confirmed") || status.includes("Live");
        
        return isLiveOrConfirmed && !isTestBooking && displayOnWebsite && isFuture && name.trim() !== "";
      })
      .map((row: any) => ({
        id: row.id,
        name: cleanRichText(row.values["c-nt9EyNdKMS"] || row.values["c-Nxi1p8B_Co"]),
        date: cleanRichText(row.values["c-VPvKp33AS8"]) || "",
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
