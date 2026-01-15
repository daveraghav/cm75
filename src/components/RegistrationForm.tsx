"use client";

import { useState, useEffect } from "react";

const imgIcon = "https://www.figma.com/api/mcp/asset/26d95501-0702-4291-810c-c7b308235e35";

export default function RegistrationForm() {
  const [yatras, setYatras] = useState<{ id: string; name: string; date?: string }[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    event: "",
    fullName: "",
    email: "",
    phone: "",
    city: "",
    subscribe: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
    <div className="bg-[#ffffff] border border-[#e5e7eb] content-stretch flex flex-col gap-[16px] md:gap-[32px] h-auto min-h-[600px] items-start pb-6 md:pb-[40px] pt-6 md:pt-[40px] px-4 md:px-[40px] rounded-[24px] shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[574.5px]">
      <div className="content-stretch flex flex-col gap-[4px] md:gap-[8px] h-auto md:h-[68px] items-start relative shrink-0 w-full">
        <h2 className="font-['Philosopher',sans-serif] font-bold leading-tight md:leading-[36px] text-[#ba324f] text-[24px] md:text-[30px]">
          Register Now
        </h2>
        <p className="font-['Lexend',sans-serif] font-normal leading-snug md:leading-[24px] text-[#4a5565] text-[14px] md:text-[16px] tracking-[-0.3125px]">
          Join us in celebrating this momentous milestone
        </p>
      </div>
      <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-[16px] md:gap-[24px] items-start relative shrink-0 w-full">
        {/* Event Selection */}
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
            Which event would you like to register for?
          </label>
          <div className="relative w-full">
            <select
              required
              value={formData.event}
              onChange={(e) => setFormData({ ...formData, event: e.target.value })}
              className="appearance-none bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[13px] rounded-[14px] w-full font-['Inter',sans-serif] font-medium text-[14px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            >
              <option value="" disabled>Select an event</option>
              {yatras.map((yatra) => {
                const dateStr = yatra.date 
                  ? new Date(yatra.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                  : "";
                return (
                  <option key={yatra.id} value={yatra.id}>
                    {yatra.name} {dateStr ? `(${dateStr})` : ""}
                  </option>
                );
              })}
            </select>
            <div className="absolute right-[13px] top-1/2 -translate-y-1/2 pointer-events-none">
              <img src={imgIcon} alt="" className="size-[16px]" />
            </div>
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
              <img src={imgIcon} alt="" className="size-[16px]" />
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
            Subscribe for updates and newsletters
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
