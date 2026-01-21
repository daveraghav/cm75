"use client";

import { useState, useEffect } from "react";

export default function SubscribeForm() {
  const [locations, setLocations] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    areaOfInterest: [] as string[],
    subscribe: true, // Default to true for subscribe page
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    async function fetchData() {
      try {
        const [locationsRes, interestsRes] = await Promise.all([
          fetch("/api/locations"),
          fetch("/api/interests")
        ]);

        if (locationsRes.ok) {
          const locationsData = await locationsRes.json();
          setLocations(locationsData);
        }
        if (interestsRes.ok) {
          const interestsData = await interestsRes.json();
          setInterests(interestsData);
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
        body: JSON.stringify({
          ...formData,
          event: "", // No event for subscription
          source: "Newsletter Signup" // Custom source for this form
        }),
      });
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#ffffff] border border-[#e5e7eb] content-stretch flex flex-col gap-[16px] md:gap-[32px] h-auto min-h-[500px] items-start pb-4 md:pb-[40px] pt-4 md:pt-[40px] px-3 md:px-[40px] rounded-[20px] md:rounded-[24px] shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[574.5px]">
      <div className="content-stretch flex flex-col gap-[4px] md:gap-[8px] h-auto md:h-[68px] items-start relative shrink-0 w-full">
        <h2 className="font-['Philosopher',sans-serif] font-bold leading-tight md:leading-[36px] text-[#ba324f] text-[24px] md:text-[30px]">
          Subscribe
        </h2>
        <p className="font-['Lexend',sans-serif] font-normal leading-snug md:leading-[24px] text-[#4a5565] text-[14px] md:text-[16px] tracking-[-0.3125px]">
          Stay updated with our latest news and events
        </p>
      </div>
      <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-[16px] md:gap-[20px] items-start relative shrink-0 w-full">
        
        {/* Name Fields */}
        <div className="flex flex-col md:flex-row gap-[16px] w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:w-1/2">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              First Name
            </label>
            <input
              type="text"
              required
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            />
          </div>
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:w-1/2">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Last Name
            </label>
            <input
              type="text"
              required
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            />
          </div>
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

        {/* Area of Interest (Multi-select) */}
        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <div className="flex flex-col gap-[4px]">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Areas of Interest
            </label>
            <p className="text-[12px] text-[#64748B] font-['Lexend',sans-serif]">
              Select all that apply
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] w-full bg-[#f3f3f5] p-4 rounded-[14px] border border-[#e5e7eb]">
            {interests.map((interest) => (
              <label key={interest} className="flex items-center gap-[10px] cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.areaOfInterest.includes(interest)}
                  onChange={(e) => {
                    const newInterests = e.target.checked
                      ? [...formData.areaOfInterest, interest]
                      : formData.areaOfInterest.filter(i => i !== interest);
                    setFormData({ ...formData, areaOfInterest: newInterests });
                  }}
                  className="bg-white border border-[rgba(0,0,0,0.1)] rounded-[4px] size-[18px] cursor-pointer accent-[#ba324f]"
                />
                <span className="font-['Inter',sans-serif] font-normal text-[#4a5565] text-[14px] group-hover:text-[#0a0a0a] transition-colors">
                  {interest}
                </span>
              </label>
            ))}
          </div>
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#ba324f] hover:bg-[#a02b44] transition-colors h-[48px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full text-white font-['Philosopher',sans-serif] font-bold text-[16px] tracking-[-0.1504px] mt-4"
        >
          {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed Successfully!" : "Subscribe Now"}
        </button>

        {status === "success" && (
          <p className="text-green-600 font-medium text-sm w-full text-center">Successfully subscribed!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-medium text-sm w-full text-center">Subscription failed. Please try again.</p>
        )}
      </form>
    </div>
  );
}
