export default function RsvpForm() {
  return (
    <div className="bg-[#ffffff] border border-[#e5e7eb] content-stretch flex flex-col gap-[16px] md:gap-[24px] h-auto items-start pb-4 md:pb-[40px] pt-4 md:pt-[40px] px-3 md:px-[40px] rounded-[20px] md:rounded-[24px] shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[720px]">
      <div className="content-stretch flex flex-col gap-[4px] md:gap-[8px] h-auto items-start relative shrink-0 w-full">
        <h2 className="font-['Philosopher',sans-serif] font-bold leading-tight md:leading-[36px] text-[#ba324f] text-[24px] md:text-[30px]">
          Invited Guests RSVP
        </h2>
        <p className="font-['Lexend',sans-serif] font-bold leading-snug md:leading-[24px] text-[#0a0a0a] text-[16px] md:text-[18px] tracking-[-0.3125px]">
          Registrations are now closed
        </p>
      </div>

      <div className="bg-[#f3f3f5] p-4 rounded-[14px] w-full border border-[#e5e7eb]">
        <p className="font-['Inter',sans-serif] text-[14px] leading-[22px] text-[#4a5565]">
          Thank you for your interest. If you still wish to RSVP, please email{" "}
          <a href="mailto:rsvp@chinmayauk.org" className="text-[#ba324f] underline underline-offset-2 font-medium">
            rsvp@chinmayauk.org
          </a>
          .
        </p>
      </div>
    </div>
  );
}
