"use server";

import { fetchCoda } from "@/lib/coda";

const CODA_DOC_ID = process.env.CODA_DOC_ID;
const TABLE_ID = "grid-sync-1054-Table-dynamic-7d732c10a0257d78bcc179ab2941dbee0613320f6422067d6b26b6e62d2d2826";

export async function getYatrasDirect() {
  try {
    // This function calls the Coda API directly from the server
    const data = await fetchCoda(`/docs/${CODA_DOC_ID}/tables/${TABLE_ID}/rows?useColumnNames=false&valueFormat=rich`);
    
    const cleanRichText = (val: any): string => {
      if (Array.isArray(val)) {
        return val.map(v => cleanRichText(v)).join(", ");
      }
      if (typeof val !== 'string') return val?.toString() || "";
      return val.replace(/```/g, '').trim();
    };

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const yatras = data.items
      .filter((row: any) => {
        const status = cleanRichText(row.values["c-GGlBmT6_60"] || "").toString();
        const isTestBooking = row.values["c-00ofsnuDNv"] === true;
        const name = cleanRichText(row.values["c-Nxi1p8B_Co"] || "").toString();
        
        // Match Live, Confirmed, or Followup statuses as requested for the database source
        const isValidStatus = status.includes("Confirmed") || 
                             status.includes("Live") || 
                             status.includes("Followup") || 
                             status.includes("Follow-up") ||
                             status.includes("Follow up");
        
        return isValidStatus && !isTestBooking && name.trim() !== "";
      })
      .map((row: any) => {
        const cells = row.values;
        const startVal = cleanRichText(cells["c-VPvKp33AS8"]);
        const endVal = cleanRichText(cells["c-5H6RVLh1bm"]);
        
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

        const flyerCell = cells["c-n4MUP5xEZ6"];
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
          type: cleanRichText(cells["c-BjwTfSWxn9"] || "").toString(),
          rawDate: startVal,
          rawEndDate: endVal,
          flyerUrl: flyerUrl,
          status: cleanRichText(cells["c-GGlBmT6_60"] || "").toString(),
        };
      })
      .sort((a: any, b: any) => {
        if (!a.rawDate) return 1;
        if (!b.rawDate) return -1;
        return new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime();
      });

    return yatras;
  } catch (error) {
    console.error("Coda Action Fetch Error:", error);
    throw error;
  }
}
