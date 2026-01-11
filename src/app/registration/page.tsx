"use client";

import RegistrationForm from "@/components/RegistrationForm";
import IframeResizer from "@/components/IframeResizer";

export default function RegistrationPage() {
  return (
    <IframeResizer>
      <main className="min-h-screen bg-white py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <RegistrationForm />
        </div>
      </main>
    </IframeResizer>
  );
}
