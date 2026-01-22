"use client";

import dynamic from "next/dynamic";

const YatraMapInner = dynamic(() => import("./YatraMapInner"), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-50">Loading map...</div>,
});

export default function YatraMap() {
  return <YatraMapInner />;
}
