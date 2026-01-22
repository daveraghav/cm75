"use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Event {
  id: string;
  name: string;
  dateDisplay: string;
  timeDisplay: string;
  location: string;
  type: string;
  isMultiDay: boolean;
  flyerUrl?: string;
  rawDate: string;
  rawEndDate: string;
  status: string;
  coords?: { lat: number; lng: number };
}

const TOPIC_COLORS: Record<string, string> = {
  "Bhagavad Gita": "#ba324f",
  "Hanuman Chalisa": "#e89117",
  "default": "#4a5565"
};

const STATUS_COLORS: Record<string, string> = {
  "Upcoming": "#3b82f6",
  "Complete": "#94a3b8",
};

function getStatusKey(event: Event) {
  const now = new Date();
  const endDate = event.rawEndDate ? new Date(event.rawEndDate) : (event.rawDate ? new Date(event.rawDate) : null);
  
  if (endDate && endDate < now) {
    return "Complete";
  }
  return "Upcoming";
}

// Component to handle map view adjustments
function MapAutoCenter({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { 
        padding: [120, 120],
        maxZoom: 7
      });
    } else {
      map.setView([54.5, -2], 5);
    }
  }, [positions, map]);
  return null;
}

export default function YatraMapInner() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<(Event & { index: number }) | null>(null);
  const [colorBy, setColorBy] = useState<"topic" | "status">("topic");
  const [showPath, setShowPath] = useState(false);

  const handleShare = (event: Event) => {
    const message = `🕉️ *CM75: Event Details* 🕉️\n\n*${event.name}*\n\n📅 Date: ${event.dateDisplay}\n⏰ Time: ${event.timeDisplay}\n📍 Location: ${event.location}\n\nLearn more and register here:\n🔗 https://www.chinmayauk.org/cm75/`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank');
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events from API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const eventMarkers = useMemo(() => {
    return events
      .filter((event) => event.location !== "TBC" && event.coords && typeof event.coords.lat === 'number' && typeof event.coords.lng === 'number')
      .map((event) => ({
        ...event,
        coords: event.coords!
      }));
  }, [events]);

  const uniqueTopics = useMemo(() => {
    const topics = new Set<string>();
    eventMarkers.forEach(e => {
      if (e.type) {
        e.type.split(",").forEach(t => topics.add(t.trim()));
      }
    });
    return Array.from(topics);
  }, [eventMarkers]);

  const uniqueStatuses = ["Upcoming", "Complete"];

  const polylinePositions = useMemo(() => {
    return eventMarkers.map((m) => [m.coords.lat, m.coords.lng] as [number, number]);
  }, [eventMarkers]);

  if (loading) return <div className="bg-[#ffffff] text-center p-10 h-full">Loading events...</div>;

  const getMarkerColor = (event: Event) => {
    if (colorBy === "topic") {
      const topic = event.type.split(",")[0].trim();
      return TOPIC_COLORS[topic] || TOPIC_COLORS["default"];
    } else {
      const key = getStatusKey(event);
      return STATUS_COLORS[key as keyof typeof STATUS_COLORS] || STATUS_COLORS["Upcoming"];
    }
  };

  const createNumberedIcon = (number: number, color: string) => {
    return L.divIcon({
      html: `<div class="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold border-2 border-white shadow-lg text-sm transition-transform hover:scale-110" style="background-color: ${color}">${number}</div>`,
      className: "custom-div-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-gray-50">
      {/* Controls */}
      <div className="absolute top-4 left-14 z-[1000] flex flex-col gap-2">
        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-100 flex gap-1">
          <button 
            onClick={() => setColorBy("topic")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${colorBy === "topic" ? "bg-[#ba324f] text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Color by Topic
          </button>
          <button 
            onClick={() => setColorBy("status")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${colorBy === "status" ? "bg-[#ba324f] text-white" : "text-gray-600 hover:bg-gray-100"}`}
          >
            Color by Status
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-100 flex items-center gap-2">
          <input 
            type="checkbox" 
            id="showPath" 
            checked={showPath} 
            onChange={(e) => setShowPath(e.target.checked)}
            className="w-4 h-4 accent-[#ba324f] cursor-pointer"
          />
          <label htmlFor="showPath" className="text-xs font-bold text-gray-600 cursor-pointer select-none">
            Show Journey Path
          </label>
        </div>

        {/* Legend */}
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-100 min-w-[150px]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Legend</p>
          <div className="flex flex-col gap-2">
            {colorBy === "topic" ? (
              <>
                {uniqueTopics.map(topic => (
                  <div key={topic} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: TOPIC_COLORS[topic] || TOPIC_COLORS["default"] }} />
                    <span className="text-[11px] font-medium text-gray-700">{topic}</span>
                  </div>
                ))}
                {!uniqueTopics.length && <span className="text-[11px] text-gray-400 italic">No topics found</span>}
              </>
            ) : (
              <>
                {uniqueStatuses.map(status => (
                  <div key={status} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STATUS_COLORS[status as keyof typeof STATUS_COLORS] }} />
                    <span className="text-[11px] font-medium text-gray-700">{status}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <MapContainer
        center={[54.5, -2]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {eventMarkers.map((event, index) => (
          <Marker
            key={event.id}
            position={[event.coords.lat, event.coords.lng]}
            icon={createNumberedIcon(index + 1, getMarkerColor(event))}
            eventHandlers={{
              click: () => setSelectedEvent({ ...event, index: index + 1 }),
            }}
          />
        ))}

        {showPath && polylinePositions.length > 1 && (
          <Polyline
            positions={polylinePositions}
            pathOptions={{ color: "#1a1a1a", weight: 2.5, opacity: 0.5, dashArray: "10, 10" }}
          />
        )}

        <MapAutoCenter positions={polylinePositions} />
      </MapContainer>

      {/* Modal Overlay */}
      {selectedEvent && (
        <div 
          className="absolute inset-0 z-[2000] bg-black/40 flex items-center justify-center p-3 animate-in fade-in duration-300"
          onClick={() => setSelectedEvent(null)}
        >
          <div 
            className="bg-white rounded-[20px] w-full max-w-[380px] max-h-[90%] overflow-y-auto p-3.5 md:p-4 shadow-2xl relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-0.5">
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full text-white flex items-center justify-center font-bold text-[10px]"
                  style={{ backgroundColor: getMarkerColor(selectedEvent) }}
                >
                  {selectedEvent.index}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Yatra {selectedEvent.index}</span>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => {
                    const prevIdx = selectedEvent.index - 2;
                    if (prevIdx >= 0) {
                      setSelectedEvent({ ...eventMarkers[prevIdx], index: prevIdx + 1 });
                    }
                  }}
                  disabled={selectedEvent.index <= 1}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Previous Yatra"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button 
                  onClick={() => {
                    const nextIdx = selectedEvent.index;
                    if (nextIdx < eventMarkers.length) {
                      setSelectedEvent({ ...eventMarkers[nextIdx], index: nextIdx + 1 });
                    }
                  }}
                  disabled={selectedEvent.index >= eventMarkers.length}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Next Yatra"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <button 
                  onClick={() => handleShare(selectedEvent)}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  title="Share"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </button>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-3">
              <p className="font-lexend font-normal text-[#4a5565] text-[12px] mb-1 flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a5565" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {selectedEvent.dateDisplay}
              </p>
              <h3 className="font-philosopher font-bold text-[#e89117] text-[18px] md:text-[20px] leading-tight mb-2">
                {selectedEvent.name}
              </h3>
              
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2 items-center text-[#4a5565]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span className="font-lexend text-[13px]">{selectedEvent.timeDisplay}</span>
                </div>
                <div className="flex gap-2 items-center text-[#4a5565]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span className="font-lexend text-[13px]">{selectedEvent.location}</span>
                </div>
              </div>
            </div>

            {selectedEvent.flyerUrl ? (
              <div className="mt-3">
                <img 
                  src={selectedEvent.flyerUrl} 
                  alt={selectedEvent.name} 
                  className="w-full h-auto rounded-[12px] shadow-sm border border-orange-50"
                />
              </div>
            ) : (
              <div className="mt-3 p-4 text-center flex flex-col items-center justify-center bg-[#fdf1f4] rounded-[12px] border border-orange-50">
                <div className="bg-[#ba324f]/5 p-3 rounded-full mb-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ba324f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <p className="font-lexend text-[#64748B] text-[13px]">
                  Further information coming soon!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
