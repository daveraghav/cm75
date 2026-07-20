"use client";

import RsvpForm from "@/components/RsvpForm";
import IframeResizer from "@/components/IframeResizer";

export default function RsvpPage() {
  return (
    <IframeResizer>
      <main className="min-h-screen bg-white py-2 px-1 md:py-4 md:px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <RsvpForm />
        </div>
      </main>
    </IframeResizer>
  );
}
