"use client";

import RegistrationForm from "@/components/RegistrationForm";
import EventTimeline from "@/components/EventTimeline";
import MissionJourney from "@/components/MissionJourney";
import IframeResizer from "@/components/IframeResizer";

export default function CombinedViewPage() {
  return (
    <IframeResizer className="min-h-screen bg-[#ffffff] py-4 px-4 overflow-x-hidden">
      <div className="flex flex-col gap-16 md:gap-24">
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

        {/* Mission Journey Section */}
        <MissionJourney />
      </div>
    </IframeResizer>
  );
}
