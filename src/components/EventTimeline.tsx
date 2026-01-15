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
  flyerUrl?: string;
}

const capsuleStyle = "from-[#2b7fff] to-[#615fff]";

export default function EventTimeline() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

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

  const displayedEvents = events.slice(0, visibleCount);
  const hasMore = visibleCount < events.length;

  const toggleExpand = (id: string) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-[24px] md:gap-[32px] w-full max-w-[480px] h-auto bg-white relative px-2">
      <div className="flex flex-col gap-[16px] md:gap-[24px]">
        {displayedEvents.map((event) => (
          <div 
            key={event.id} 
            onClick={() => toggleExpand(event.id)}
            className={`bg-[rgba(255,244,235,0.41)] border-[#fff9e8] border-[1.6px] border-solid rounded-[20px] p-4 md:p-[20px] relative w-full shrink-0 cursor-pointer transition-all duration-300 hover:border-[#e89117] hover:shadow-md group overflow-hidden ${expandedEventId === event.id ? 'border-[#e89117] shadow-lg' : ''}`}
          >
            <div className="mb-[12px] md:mb-[16px]">
              <p className="font-lexend font-normal text-[#4a5565] text-[13px] mb-[6px]">
                {event.dateDisplay}
              </p>
              <div className="flex justify-between items-start">
                <h3 className="font-philosopher font-bold text-[#e89117] text-[18px] md:text-[22px] leading-tight group-hover:text-[#ba324f] transition-colors">
                  {event.name}
                </h3>
                <div className="flex flex-wrap gap-1.5 justify-end ml-3">
                  {(event.type || "").split(",").filter(t => t.trim() !== "").map((topic, idx) => (
                    <div 
                      key={idx}
                      className={`bg-gradient-to-r ${capsuleStyle} min-h-[22px] px-[10px] py-[3px] rounded-full flex items-center justify-center shrink-0`}
                    >
                      <p className="capitalize font-sans font-medium text-[10px] text-white whitespace-nowrap">
                        {topic.trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-[8px]">
              <div className="flex gap-[8px] items-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4a5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <p className="font-lexend font-normal text-[#4a5565] text-[13px]">
                  {event.timeDisplay}
                </p>
              </div>

              <div className="flex gap-[8px] items-center">
                <img src={imgIconLocation} alt="Location" className="size-[16px] opacity-70" />
                <p className="font-lexend font-normal text-[#4a5565] text-[13px] leading-snug">
                  {event.location}
                </p>
              </div>
            </div>

            {/* In-Card Content (Flyer or Placeholder) */}
            <div className={`mt-6 transition-all duration-500 ease-in-out overflow-hidden ${expandedEventId === event.id ? 'max-h-[1000px] opacity-100 border-t border-orange-100 pt-6' : 'max-h-0 opacity-0 pt-0'}`}>
              {event.flyerUrl ? (
                <div className="relative group/img">
                  <img 
                    src={event.flyerUrl} 
                    alt={event.name} 
                    className="w-full h-auto rounded-[12px] shadow-sm"
                  />
                  <a 
                    href={event.flyerUrl} 
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all opacity-0 group-hover/img:opacity-100"
                    title="Download Flyer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ba324f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </a>
                </div>
              ) : (
                <div className="p-6 text-center flex flex-col items-center justify-center bg-white rounded-[12px] border border-orange-50">
                  <div className="bg-[#ba324f]/5 p-3 rounded-full mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ba324f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                  <p className="font-lexend text-[#64748B] text-[14px]">
                    Further information coming soon!
                  </p>
                </div>
              )}
              
              <button 
                onClick={(e) => { e.stopPropagation(); setExpandedEventId(null); }}
                className="mt-4 w-full py-2 text-[12px] font-medium text-[#ba324f] hover:bg-red-50 rounded-lg transition-colors border border-[#ba324f]/10"
              >
                Close Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <button 
          onClick={() => setVisibleCount(prev => prev + 5)}
          className="bg-white border border-[#ba324f] border-solid flex gap-[8px] items-center justify-center py-[14px] rounded-[16px] w-full group transition-all hover:bg-[#ba324f] shrink-0 mt-auto"
        >
          <p className="font-['Philosopher',sans-serif] font-bold text-[#ba324f] text-[16px] group-hover:text-white transition-colors">
            View more events
          </p>
          <img src={imgIconArrow} alt="" className="size-[20px] group-hover:invert transition-all" />
        </button>
      )}
    </div>
  );
}
