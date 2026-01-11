"use client";

import { useEffect, useState } from "react";

const imgIconLocation = "https://www.figma.com/api/mcp/asset/595ea86d-acd3-4b57-b972-47220757eb94";
const imgIconArrow = "https://www.figma.com/api/mcp/asset/47ce14bf-d701-48ad-8292-9552b9aab311";

interface Event {
  id: string;
  name: string;
  dateDisplay: string;
  timeDisplay: string;
  location: string;
  type: string;
  isMultiDay: boolean;
}

const typeStyles: Record<string, string> = {
  workshop: "from-[#2b7fff] to-[#615fff]",
  satsang: "from-[#f6339a] to-[#ff2056]",
  retreat: "from-[#ad46ff] to-[#8e51ff]",
  service: "from-[#ff6900] to-[#fb2c36]",
};

export default function EventTimeline() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const getCategoryStyle = (typeStr: string) => {
    const firstType = typeStr.split(",")[0].trim().toLowerCase();
    return typeStyles[firstType] || typeStyles.workshop;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="bg-[#ffffff] text-center p-10 h-full">Loading events...</div>;

  return (
    <div className="flex flex-col gap-[32px] w-full max-w-[512px]">
      <div className="flex flex-col gap-[20px] md:gap-[32px] h-auto overflow-visible">
        {events.map((event) => (
          <div key={event.id} className="bg-[rgba(255,244,235,0.41)] border-[#fff9e8] border-[1.6px] border-solid rounded-[16px] p-5 md:p-[24px] relative w-full shrink-0">
            <div className="mb-[16px]">
              <p className="font-lexend font-normal text-[#4a5565] text-[14px] mb-[8px]">
                {event.dateDisplay}
              </p>
              <div className="flex justify-between items-start">
                <h3 className="font-philosopher font-bold text-[#e89117] text-[24px] leading-tight">
                  {event.name}
                </h3>
                <div className={`bg-gradient-to-r ${getCategoryStyle(event.type)} min-h-[24px] px-[12px] py-[4px] rounded-full flex items-center justify-center shrink-0 ml-4`}>
                  <p className="capitalize font-sans font-medium text-[11px] text-white whitespace-nowrap">
                    {event.type}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-[10px]">
              <div className="flex gap-[10px] items-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <p className="font-lexend font-normal text-[#4a5565] text-[14px]">
                  {event.timeDisplay}
                </p>
              </div>

              <div className="flex gap-[10px] items-center">
                <img src={imgIconLocation} alt="Location" className="size-[18px] opacity-70" />
                <p className="font-lexend font-normal text-[#4a5565] text-[14px] leading-relaxed">
                  {event.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="bg-white border border-[#ba324f] border-solid flex gap-[8px] items-center justify-center py-[17px] rounded-[16px] w-full group transition-all hover:bg-[#ba324f]">
        <p className="font-['Philosopher',sans-serif] font-bold text-[#ba324f] text-[16px] group-hover:text-white transition-colors">
          View more events
        </p>
        <img src={imgIconArrow} alt="" className="size-[20px] group-hover:invert transition-all" />
      </button>
    </div>
  );
}
