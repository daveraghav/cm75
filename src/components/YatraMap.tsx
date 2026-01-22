"use client";

import dynamic from "next/dynamic";
import { APIProvider } from "@vis.gl/react-google-maps";

const YatraMapInner = dynamic(() => import("./YatraMapInner"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-50">Loading map...</div>,
});

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function YatraMap() {
  return (
    <APIProvider apiKey={API_KEY}>
      <YatraMapInner />
    </APIProvider>
  );
}
