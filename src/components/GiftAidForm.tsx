"use client";

import { useState } from "react";

const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  homeAddress: "",
  city: "",
  postCode: "",
  country: "United Kingdom",
  phone: "",
  email: "",
  giftAidDeclaration: false,
};

export default function GiftAidForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    if (!formData.giftAidDeclaration) {
      alert("Please confirm the Gift Aid declaration to continue.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/gift-aid/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData(INITIAL_FORM_DATA);
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
      {status === "success" ? (
        <>
          <div className="content-stretch flex flex-col gap-[8px] h-auto items-start relative shrink-0 w-full">
            <h2 className="font-['Philosopher',sans-serif] font-bold leading-tight md:leading-[36px] text-[#ba324f] text-[24px] md:text-[30px]">
              Gift Aid Declaration
            </h2>
            <p className="font-['Lexend',sans-serif] font-bold leading-snug md:leading-[24px] text-[#0a0a0a] text-[16px] md:text-[18px] tracking-[-0.3125px]">
              Your response has been recorded
            </p>
          </div>
          <div className="bg-[#f3f3f5] p-4 rounded-[14px] w-full border border-[#e5e7eb]">
            <p className="font-['Inter',sans-serif] text-[14px] leading-[22px] text-[#4a5565]">
              Thank you. Your Gift Aid declaration has been submitted. If you need to change your details, please email{" "}
              <a href="mailto:treasury@chinmayauk.org" className="text-[#ba324f] underline underline-offset-2 font-medium">
                treasury@chinmayauk.org
              </a>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="bg-[#ba324f] hover:bg-[#a02b44] transition-colors h-[48px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full text-white font-['Philosopher',sans-serif] font-bold text-[16px] tracking-[-0.1504px]"
          >
            Make another submission
          </button>
        </>
      ) : (
        <>
      <div className="content-stretch flex flex-col gap-[8px] md:gap-[12px] h-auto items-start relative shrink-0 w-full">
        <h2 className="font-['Philosopher',sans-serif] font-bold leading-tight md:leading-[36px] text-[#ba324f] text-[24px] md:text-[30px]">
          Gift Aid Declaration
        </h2>
        <p className="font-['Inter',sans-serif] text-[13px] leading-[20px] text-[#4a5565]">
          <span className="font-bold text-[#0a0a0a]">Chinmaya Mission (UK) is a Registered Charity</span>
          <br />
          <span className="font-semibold text-[#0a0a0a]">Charity number:</span> 1077622
          <br />
          <span className="font-semibold text-[#0a0a0a]">Address:</span> 2 Egerton Gardens, Hendon, NW4 4BA
        </p>
        <p className="font-['Inter',sans-serif] text-[13px] leading-[20px] text-[#4a5565]">
          Gift Aid allows Chinmaya Mission (UK) to reclaim 25p for every £1 you give. Please fill in your details below so we can claim Gift Aid on your current and future donations.
        </p>
        <p className="font-['Inter',sans-serif] text-[13px] leading-[20px] text-[#4a5565]">
          If you want to cancel this declaration, change your name, home address or contact details, or no longer pay sufficient Income Tax or Capital Gains Tax, please email{" "}
          <a href="mailto:treasury@chinmayauk.org" className="text-[#ba324f] underline underline-offset-2">
            treasury@chinmayauk.org
          </a>
          .
        </p>
      </div>

      <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-[16px] md:gap-[20px] items-start relative shrink-0 w-full">
        <div className="flex flex-col md:flex-row gap-[16px] w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1 w-full">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              First Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            />
          </div>

          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1 w-full">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Last Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            />
          </div>
        </div>

        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
            Home Address (Flat/House Number and Street)
          </label>
          <input
            type="text"
            required
            placeholder="Enter your home address"
            value={formData.homeAddress}
            onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
            className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-[16px] w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1 w-full">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              City
            </label>
            <input
              type="text"
              required
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            />
          </div>

          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:w-[160px]">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Post Code
            </label>
            <input
              type="text"
              required
              placeholder="e.g. NW4 4BA"
              value={formData.postCode}
              onChange={(e) => setFormData({ ...formData, postCode: e.target.value })}
              className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            />
          </div>

          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 flex-1 w-full">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Country
            </label>
            <input
              type="text"
              required
              placeholder="United Kingdom"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] px-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-[16px] w-full">
          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full md:w-1/2">
            <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
              Phone
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
            <div className="relative w-full">
              <span className="absolute left-[12px] top-1/2 -translate-y-1/2 pointer-events-none text-[#717182]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#f3f3f5] border border-[#e5e7eb] h-[36px] pl-[36px] pr-[12px] rounded-[14px] w-full font-['Inter',sans-serif] font-normal text-[14px] text-[#0a0a0a] placeholder:text-[#717182] focus:outline-none focus:ring-2 focus:ring-[#ba324f]"
              />
            </div>
          </div>
        </div>

        <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
          <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px] uppercase">
            Gift Aid Declaration
          </label>
          <div className="bg-[#f3f3f5] p-4 rounded-[14px] w-full border border-[#e5e7eb]">
            <p className="font-['Inter',sans-serif] text-[13px] leading-[20px] text-[#4a5565]">
              I am a UK taxpayer and would like Chinmaya Mission (UK) to treat all donations I have made in the last four years, as well as any future donations, as Gift Aid until I notify them otherwise. I understand that if I pay less Income tax and/or Capital Gains Tax than the amount of Gift Aid claimed on all my donations in that year, it is my responsibility to pay any difference.
            </p>
          </div>
          <div className="flex gap-[8px] items-start relative shrink-0 w-full">
            <input
              type="checkbox"
              id="giftAidDeclaration"
              required
              checked={formData.giftAidDeclaration}
              onChange={(e) => setFormData({ ...formData, giftAidDeclaration: e.target.checked })}
              className="bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] rounded-[4px] size-[16px] mt-[2px] cursor-pointer accent-[#ba324f]"
            />
            <label htmlFor="giftAidDeclaration" className="font-['Inter',sans-serif] font-medium leading-[20px] text-[#4a5565] text-[14px] tracking-[-0.1504px] cursor-pointer">
              I confirm this Gift Aid declaration
            </label>
          </div>
        </div>

        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
          <label className="font-['Inter',sans-serif] font-bold leading-[14px] text-[#0a0a0a] text-[14px] tracking-[-0.1504px]">
            Privacy Policy
          </label>
          <div className="bg-[#f3f3f5] p-4 rounded-[14px] w-full">
            <p className="font-['Inter',sans-serif] text-[12px] leading-[18px] text-[#64748B]">
              We value your privacy. The personal information you provide will be handled in line with GDPR and used only to collect Gift Aid. Please email{" "}
              <a href="mailto:treasury@chinmayauk.org" className="text-[#ba324f] underline underline-offset-2">
                treasury@chinmayauk.org
              </a>{" "}
              if you would like to make any changes or delete the data we store.
            </p>
          </div>
          <p className="font-['Inter',sans-serif] text-[12px] leading-[18px] text-[#64748B]">
            By submitting this form, you confirm you have read and understood this notice.
          </p>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#ba324f] hover:bg-[#a02b44] transition-colors h-[48px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full text-white font-['Philosopher',sans-serif] font-bold text-[16px] tracking-[-0.1504px] mt-4 disabled:opacity-80"
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>

        {status === "error" && (
          <p className="text-red-600 font-medium text-sm w-full text-center">Submission failed. Please try again.</p>
        )}
      </form>
        </>
      )}
    </div>
  );
}
