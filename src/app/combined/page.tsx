"use client";

import RegistrationForm from "@/components/RegistrationForm";
import EventTimeline from "@/components/EventTimeline";
import IframeResizer from "@/components/IframeResizer";

export default function CombinedViewPage() {
  return (
    <IframeResizer className="min-h-screen bg-[#ffffff] py-4 px-4">
      <div className="max-w-[1277px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center">
        {/* Registration Form Column */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <RegistrationForm />
        </div>

        {/* Event Timeline Column */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <EventTimeline />
        </div>
      </div>
    </IframeResizer>
  );
}
