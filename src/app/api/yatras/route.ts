import { NextResponse } from "next/server";
import { fetchCoda } from "@/lib/coda";

export const dynamic = 'force-dynamic';

const CODA_DOC_ID = process.env.CODA_DOC_ID;
const TABLE_ID = "grid-sync-1054-Table-dynamic-7d732c10a0257d78bcc179ab2941dbee0613320f6422067d6b26b6e62d2d2826";
const STATUS_COLUMN_ID = "c-GGlBmT6_60";
const STATUS_KEYWORDS = ["confirmed", "live", "followup", "follow-up", "follow up", "complete", "potential", "provisional"];

const getAllowedStatusOptions = (options: string[]) => {
  const normalized = options.filter(Boolean);
  const matched = normalized.filter(option => {
    const lower = option.toLowerCase();
    return STATUS_KEYWORDS.some(keyword => lower.includes(keyword));
  });

  return matched;
};

export async function GET() {
  try {
    const [rowsResult, statusColumnResult] = await Promise.allSettled([
      fetchCoda(`/docs/${CODA_DOC_ID}/tables/${TABLE_ID}/rows?useColumnNames=false&valueFormat=rich`),
      fetchCoda(`/docs/${CODA_DOC_ID}/tables/${TABLE_ID}/columns/${STATUS_COLUMN_ID}`),
    ]);

    if (rowsResult.status !== "fulfilled") {
      throw rowsResult.reason;
    }

    const data = rowsResult.value;
    const statusOptions = statusColumnResult.status === "fulfilled"
      ? (statusColumnResult.value.format?.options || []).map((opt: any) => opt.name)
      : [];
    const allowedStatusOptions = getAllowedStatusOptions(statusOptions);
    
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
        
        const lowerStatus = status.toLowerCase();
        const isLiveOrConfirmed = allowedStatusOptions.length > 0
          ? allowedStatusOptions.some(option => lowerStatus.includes(option.toLowerCase()))
          : STATUS_KEYWORDS.some(keyword => lowerStatus.includes(keyword));
        
        return isLiveOrConfirmed && !isTestBooking && displayOnWebsite && isFuture && name.trim() !== "";
      })
      .map((row: any) => ({
        id: row.id,
        name: cleanRichText(row.values["c-nt9EyNdKMS"] || row.values["c-Nxi1p8B_Co"]),
        date: cleanRichText(row.values["c-VPvKp33AS8"]) || "TBC",
      }))
      .sort((a: any, b: any) => {
        const aTime = a.date && a.date !== "TBC" ? new Date(a.date).getTime() : NaN;
        const bTime = b.date && b.date !== "TBC" ? new Date(b.date).getTime() : NaN;

        const aValid = Number.isFinite(aTime);
        const bValid = Number.isFinite(bTime);

        if (aValid && bValid) return aTime - bTime;
        if (aValid) return -1;
        if (bValid) return 1;
        return a.name.localeCompare(b.name);
      });

    return NextResponse.json(yatras);
  } catch (error: any) {
    console.error("Fetch Yatras Error:", error);
    return NextResponse.json([], { status: 500 });
  }
}
