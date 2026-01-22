"use client";

import YatraMap from "@/components/YatraMap";
import IframeResizer from "@/components/IframeResizer";

export default function MapViewPage() {
  return (
    <IframeResizer className="h-screen bg-[#ffffff] overflow-hidden">
      <YatraMap />
    </IframeResizer>
  );
}
