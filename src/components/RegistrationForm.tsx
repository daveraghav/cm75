"use client";

import { useState, useEffect, useRef } from "react";

export default function RegistrationForm() {
  const [yatras, setYatras] = useState<{ id: string; name: string; date?: string }[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    events: [] as string[],
    fullName: "",
    email: "",
    phone: "",
    city: "",
    subscribe: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleEvent = (eventId: string) => {
    setFormData(prev => {
      const currentEvents = prev.events;
      if (currentEvents.includes(eventId)) {
        return { ...prev, events: currentEvents.filter(id => id !== eventId) };
      } else {
        return { ...prev, events: [...currentEvents, eventId] };
      }
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [yatrasRes, locationsRes] = await Promise.all([
          fetch("/api/yatras"),
          fetch("/api/locations")
        ]);

        if (yatrasRes.ok) {
          const yatrasData = await yatrasRes.json();
          setYatras(yatrasData);
        }
        if (locationsRes.ok) {
          const locationsData = await locationsRes.json();
          setLocations(locationsData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.events.length === 0) {
      alert("Please select at least one event.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#ffffff] border border-[#e5e7eb] content-stretch flex flex-col gap-[16px] md:gap-[24px] h-auto items-start pb-4 md:pb-[32px] pt-4 md:pt-[32px] px-3 md:px-[40px] rounded-[20px] md:rounded-[24px] shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[574.5px]">
      <div className="content-stretch flex flex-col gap-[4px] md:gap-[8px] h-auto md:h-auto items-start relative shrink-0 w-full mb-2">
        <h2 className="font-['Philosopher',sans-serif] font-bold leading-tight md:leading-[36px] text-[#ba324f] text-[24px] md:text-[30px]">
          Register Now
        </h2>
        <p className="font-['Lexend',sans-serif] font-normal leading-snug md:leading-[24px] text-[#4a5565] text-[14px] md:text-[16px] tracking-[-0.3125px]">
          Join us in celebrating this momentous milestone
        </p>
      </div>
      <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-[16px] md:gap-[20px] items-start relative shrink-0 w-full">
        {/* Event Selection */}
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" ref={dropdownRef}>
          <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
            Which event would you like to register for?
          </label>
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between bg-[#f3f3f5] border border-[#e5e7eb] min-h-[36px] py-1 px-[13px] rounded-[14px] w-full font-['Inter',sans-serif] font-medium text-[14px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#ba324f] text-left transition-all"
            >
              <div className="flex flex-wrap gap-1 items-center">
                {formData.events.length === 0 ? (
                  <span className="text-[#717182]">Select events</span>
                ) : (
                  formData.events.map(eventId => {
                    const yatra = yatras.find(y => y.id === eventId);
                    return (
                      <span key={eventId} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ba324f] text-white text-[12px] animate-in fade-in zoom-in duration-200">
                        {yatra?.name}
                        <span 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleEvent(eventId);
                          }}
                          className="hover:bg-white/20 rounded-full p-0.5 cursor-pointer flex items-center justify-center transition-colors"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12"/>
                          </svg>
                        </span>
                      </span>
                    );
                  })
                )}
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ml-2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-[#e5e7eb] rounded-[14px] shadow-lg max-h-[200px] overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-200">
                {yatras.map((yatra) => {
                  const isSelected = formData.events.includes(yatra.id);
                  let dateStr = "TBC";
                  if (yatra.date) {
                    const parsedDate = new Date(yatra.date);
                    dateStr = Number.isNaN(parsedDate.getTime())
                      ? "TBC"
                      : parsedDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                  }
                  return (
                    <div
                      key={yatra.id}
                      onClick={() => toggleEvent(yatra.id)}
                      className={`px-[13px] py-2 cursor-pointer hover:bg-[#f3f3f5] flex items-center justify-between font-['Inter',sans-serif] text-[14px] transition-colors ${isSelected ? 'text-[#ba324f] font-semibold bg-[#ba324f]/5' : 'text-[#0a0a0a]'}`}
                    >
                      <span className="flex-1">{yatra.name} {dateStr ? `(${dateStr})` : ""}</span>
                      {isSelected && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 ml-2 animate-in zoom-in duration-200">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Full Name */}
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
          />
        </div>

        {/* Email */}
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
          />
        </div>

        {/* Phone Number */}
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
            Phone Number (Optional)
          </label>
          <p className="text-[12px] text-[#64748B] font-['Lexend',sans-serif] -mt-1">
            Please enter your phone number if you wish to be added to our WhatsApp community for Chinmaya Mission related events
          </p>
          <input
            type="tel"
            placeholder="+44 1234 567890"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
          />
        </div>

        {/* City / Country */}
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
            Your Location
          </label>
          <div className="relative w-full">
            <select
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="appearance-none bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[13px] rounded-[14px] w-full font-['Inter',sans-serif] font-medium text-[14px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            >
              <option value="" disabled>Select your location</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <div className="absolute right-[13px] top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#717182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>

        {/* GDPR Statement */}
        <div className="bg-[#f3f3f5] p-4 rounded-[14px] w-full">
          <p className="font-['Inter',sans-serif] text-[12px] leading-[18px] text-[#64748B]">
            Your details will be used only to keep you informed about this event and related activities. We respect your privacy and will never share your information with external organisations.
          </p>
        </div>

        {/* Subscribe */}
        <div className="flex gap-[8px] items-center relative shrink-0 w-full">
          <input
            type="checkbox"
            id="subscribe"
            checked={formData.subscribe}
            onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
            className="bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[4px] size-[16px] cursor-pointer accent-[#ba324f]"
          />
          <label htmlFor="subscribe" className="font-['Inter',sans-serif] font-medium leading-[20px] text-[#4a5565] text-[14px] tracking-[-0.1504px] cursor-pointer">
            Subscribe for updates and newsletter including details of further events
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#ba324f] hover:bg-[#a02b44] transition-colors h-[48px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full text-white font-['Philosopher',sans-serif] font-bold text-[16px] tracking-[-0.1504px]"
        >
          {status === "loading" ? "Registering..." : status === "success" ? "Registered Successfully!" : "Register Now"}
        </button>

        {status === "success" && (
          <p className="text-green-600 font-medium text-sm w-full text-center">Successfully registered!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-medium text-sm w-full text-center">Registration failed. Please try again.</p>
        )}
      </form>
    </div>
  );
}
