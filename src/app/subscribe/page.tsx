"use client";

import SubscribeForm from "@/components/SubscribeForm";
import IframeResizer from "@/components/IframeResizer";

export default function SubscribePage() {
  return (
    <IframeResizer>
      <main className="min-h-screen bg-white py-2 px-2">
        <div className="max-w-4xl mx-auto flex justify-center">
          <SubscribeForm />
        </div>
      </main>
    </IframeResizer>
  );
}
