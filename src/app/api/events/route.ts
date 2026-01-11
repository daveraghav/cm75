import { NextResponse } from "next/server";
import { fetchCoda } from "@/lib/coda";

const CODA_DOC_ID = process.env.CODA_DOC_ID;
const TABLE_ID = "grid-sync-1054-Table-dynamic-7d732c10a0257d78bcc179ab2941dbee0613320f6422067d6b26b6e62d2d2826";

export async function GET() {
  try {
    const data = await fetchCoda(`/docs/${CODA_DOC_ID}/tables/${TABLE_ID}/rows?useColumnNames=false`);
    
    // Filter and map yatras for the event timeline
    const events = data.items
      .filter((row: any) => {
        const status = (row.values["c-GGlBmT6_60"] || "").toString();
        const isTestBooking = row.values["c-00ofsnuDNv"] === true;
        const name = (row.values["c-Nxi1p8B_Co"] || "").toString();
        
        const isLiveOrConfirmed = status.includes("Confirmed") || status.includes("Live");
        return isLiveOrConfirmed && !isTestBooking && name.trim() !== "";
      })
      .map((row: any) => {
        const cells = row.values;
        const startVal = cells["c-VPvKp33AS8"];
        const endVal = cells["c-5H6RVLh1bm"];
        
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
        }

        return {
          id: row.id,
          name: cells["c-Nxi1p8B_Co"] || "Unnamed Event",
          dateDisplay,
          timeDisplay,
          location: cells["c-nt9EyNdKMS"] || "TBC",
          isMultiDay,
          type: (cells["c-iHUc3hmoAt"] || "workshop").toString().toLowerCase().replace(/,/g, ", "),
          rawDate: startVal,
        };
      })
      .sort((a: any, b: any) => {
        if (!a.rawDate) return 1;
        if (!b.rawDate) return -1;
        return new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime();
      });

    return NextResponse.json(events);
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
