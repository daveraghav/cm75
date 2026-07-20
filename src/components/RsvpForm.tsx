"use client";

import { useState, useEffect } from "react";

export default function RsvpForm() {
  const [titles, setTitles] = useState<string[]>(["Mr", "Mrs", "Ms", "Dr", "Rev", "Hon", "Prof", "Other"]);
  const [events, setEvents] = useState<string[]>(["Ganga Aarti", "Hanuman Havan", "Yagna"]);
  
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    organisation: "",
    events: [] as string[],
    phone: "",
    email: "",
    partyCount: 1,
    specialRequirements: "",
    notes: "",
    subscribe: true,
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await fetch("/api/rsvp/options");
        if (res.ok) {
          const data = await res.json();
          if (data.titles && data.titles.length > 0) {
            setTitles(data.titles);
          }
          if (data.events && data.events.length > 0) {
            setEvents(data.events);
          }
        }
      } catch (error) {
        console.error("Failed to fetch RSVP options, using defaults", error);
      }
    }
    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.events.length === 0) {
      alert("Please select at least one event.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/rsvp/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#ffffff] border border-[#e5e7eb] content-stretch flex flex-col gap-[16px] md:gap-[32px] h-auto items-start pb-4 md:pb-[40px] pt-4 md:pt-[40px] px-3 md:px-[40px] rounded-[20px] md:rounded-[24px] shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[720px]">
      <div className="content-stretch flex flex-col gap-[4px] md:gap-[8px] h-auto md:h-auto items-start relative shrink-0 w-full">
        <h2 className="font-['Philosopher',sans-serif] font-bold leading-tight md:leading-[36px] text-[#ba324f] text-[24px] md:text-[30px]">
          Invited Guests RSVP
        </h2>
        <p className="font-['Lexend',sans-serif] font-normal leading-snug md:leading-[24px] text-[#4a5565] text-[14px] md:text-[16px] tracking-[-0.3125px]">
          Please RSVP to confirm your attendance
        </p>
      </div>

      <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-[16px] md:gap-[20px] items-start relative shrink-0 w-full">
        {/* Row 1: Title & Full Name */}
        <div className="flex flex-col md:flex-row gap-[16px] w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:w-[130px]">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Title
            </label>
            <div className="relative w-full">
              <select
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="appearance-none bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[13px] rounded-[14px] w-full font-['Inter',sans-serif] font-medium text-[14px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
              >
                <option value="" disabled>Select</option>
                {titles.map((title) => (
                  <option key={title} value={title}>
                    {title}
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

          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1 w-full">
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
        </div>

        {/* Row 2: Organisation Representing & Party Size */}
        <div className="flex flex-col md:flex-row gap-[16px] w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1 w-full">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Organisation Representing
            </label>
            <input
              type="text"
              placeholder="Enter organisation name (if applicable)"
              value={formData.organisation}
              onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
              className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            />
          </div>

          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:w-[180px]">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Party Size (inc. yourself)
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.partyCount}
              onChange={(e) => setFormData({ ...formData, partyCount: Math.max(1, parseInt(e.target.value) || 1) })}
              className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            />
          </div>
        </div>

        {/* Row 3: Phone Number & Email Address */}
        <div className="flex flex-col md:flex-row gap-[16px] w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:w-1/2">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+44 1234 567890"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            />
          </div>

          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:w-1/2">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Email Address
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
        </div>

        {/* Row 4: Events Attending */}
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <div className="flex flex-col gap-[4px]">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Events Attending
            </label>
            <p className="text-[12px] text-[#64748B] font-['Lexend',sans-serif]">
              Select all that apply
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[12px] w-full bg-[#f3f3f5] p-4 rounded-[14px] border border-[#e5e7eb]">
            {events.map((event) => (
              <label key={event} className="flex items-center gap-[10px] cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.events.includes(event)}
                  onChange={(e) => {
                    const newEvents = e.target.checked
                      ? [...formData.events, event]
                      : formData.events.filter(ev => ev !== event);
                    setFormData({ ...formData, events: newEvents });
                  }}
                  className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[4px] size-[18px] cursor-pointer accent-[#ba324f]"
                />
                <span className="font-['Inter',sans-serif] font-normal text-[#4a5565] text-[14px] group-hover:text-[#0a0a0a] transition-colors">
                  {event}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Special Requirements */}
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
            Special Requirements (Optional)
          </label>
          <textarea
            placeholder="Enter any special requirements (e.g. dietary, access)"
            value={formData.specialRequirements}
            onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
            className="bg-[#f3f3f5] border border-[#e5e7eb] py-2.5 px-[12px] rounded-[14px] w-full min-h-[80px] font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f] resize-y"
          />
        </div>

        {/* Anything else to know */}
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
            Is there anything else you'd like us to know? (Optional)
          </label>
          <textarea
            placeholder="Enter any other notes or comments"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="bg-[#f3f3f5] border border-[#e5e7eb] py-2.5 px-[12px] rounded-[14px] w-full min-h-[80px] font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f] resize-y"
          />
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

        {/* GDPR Statement */}
        <div className="bg-[#f3f3f5] p-4 rounded-[14px] w-full">
          <p className="font-['Inter',sans-serif] text-[12px] leading-[18px] text-[#64748B]">
            Your details will be used only to keep you informed about this event and related activities. We respect your privacy and will never share your information with external organisations.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#ba324f] hover:bg-[#a02b44] transition-colors h-[48px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full text-white font-['Philosopher',sans-serif] font-bold text-[16px] tracking-[-0.1504px] mt-4"
        >
          {status === "loading" ? "Submitting RSVP..." : status === "success" ? "RSVP Submitted Successfully!" : "Confirm Attendance"}
        </button>

        {status === "success" && (
          <p className="text-green-600 font-medium text-sm w-full text-center">RSVP successfully submitted!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-medium text-sm w-full text-center">Submission failed. Please try again.</p>
        )}
      </form>
    </div>
  );
}
