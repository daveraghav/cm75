import { NextResponse } from "next/server";
import { fetchCoda } from "@/lib/coda";
import { geocodeAddress } from "@/lib/geocoding";

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get("all") === "true";

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

    // Filter and map yatras for the event timeline
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Start of today

    const events = data.items
      .filter((row: any) => {
        const status = cleanRichText(row.values["c-GGlBmT6_60"] || "").toString();
        const isTestBooking = row.values["c-00ofsnuDNv"] === true;
        const name = cleanRichText(row.values["c-Nxi1p8B_Co"] || "").toString();
        const location = cleanRichText(row.values["c-kYqV9PswOT"]) || "TBC";
        
        const lowerStatus = status.toLowerCase();
        const isValidStatus = allowedStatusOptions.length > 0
          ? allowedStatusOptions.some(option => lowerStatus.includes(option.toLowerCase()))
          : STATUS_KEYWORDS.some(keyword => lowerStatus.includes(keyword));
        
        return isValidStatus && !isTestBooking && name.trim() !== "" && location !== "TBC";
      })
      .map((row: any) => {
        const cells = row.values;
        const startVal = cleanRichText(cells["c-VPvKp33AS8"]);
        const endVal = cleanRichText(cells["c-5H6RVLh1bm"]);
        const displayOnWebsite = cells["c-WUNoH1bQH-"] === true;
        
        let dateDisplay = "";
        let timeDisplay = "";
        let isMultiDay = false;
        
        if (startVal) {
          const start = new Date(startVal);
          const end = endVal ? new Date(endVal) : null;
          isMultiDay = end ? (start.toLocaleDateString() !== end.toLocaleDateString()) : false;
          
          const startDateStr = start.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
          const startTimeStr = start.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
          
          if (end) {
            const endDateStr = end.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            const endTimeStr = end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
            
            if (isMultiDay) {
              const startDayMonth = start.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
              dateDisplay = `${startDayMonth} - ${endDateStr}`;
            } else {
              dateDisplay = startDateStr;
            }
            timeDisplay = `${startTimeStr} - ${endTimeStr}`;
          } else {
            dateDisplay = startDateStr;
            timeDisplay = startTimeStr;
          }
        } else {
          dateDisplay = "TBC";
          timeDisplay = "TBC";
        }

        if (!timeDisplay) {
          timeDisplay = "TBC";
        }

        const flyerCell = cells["c-n4MUP5xEZ6"]; // Yatra cover
        const flyerUrl = Array.isArray(flyerCell) && flyerCell.length > 0 
          ? flyerCell[0].url 
          : (typeof flyerCell === 'object' && flyerCell !== null ? flyerCell.url : null);

        return {
          id: row.id,
          name: cleanRichText(cells["c-nt9EyNdKMS"] || cells["c-Nxi1p8B_Co"]) || "Unnamed Event",
          dateDisplay,
          timeDisplay,
          location: cleanRichText(cells["c-kYqV9PswOT"]) || "TBC",
          isMultiDay,
          type: cleanRichText(cells["c-BjwTfSWxn9"] || "").toString(), // Use Topic column
          rawDate: startVal,
          rawEndDate: endVal,
          flyerUrl: flyerUrl,
          status: cleanRichText(cells["c-GGlBmT6_60"] || "").toString(),
          displayOnWebsite,
        };
      })
      .sort((a: any, b: any) => {
        if (!a.rawDate) return 1;
        if (!b.rawDate) return -1;
        return new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime();
      });

    // Resolve coordinates for all events
    const eventsWithCoords = await Promise.all(events.map(async (event: any) => {
      const coords = await geocodeAddress(event.location);
      return { ...event, coords };
    }));

    return NextResponse.json(eventsWithCoords);
  } catch (error: any) {
    console.error("Coda Events Fetch Error:", error);
    // Return mock data if table is not found or error occurs during development
    return NextResponse.json([
      {
        id: "1",
        name: "Vedanta Study Group",
        date: "Jan 15, 2025",
        time: "6:00 PM - 8:00 PM",
        location: "New York Center",
        registered: 45,
        type: "workshop",
      },
      {
        id: "2",
        name: "Family Satsang",
        date: "Jan 20, 2025",
        time: "10:00 AM - 12:00 PM",
        location: "Los Angeles Center",
        registered: 120,
        type: "satsang",
      }
    ]);
  }
}
