"use client";

import { useEffect, useRef, ReactNode } from "react";

interface IframeResizerProps {
  children: ReactNode;
  className?: string;
}

/**
 * A wrapper component that reports its height to the parent window.
 * Useful when the page is embedded in an iframe (e.g. WordPress).
 */
export default function IframeResizer({ children, className = "" }: IframeResizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reportHeight = () => {
      if (containerRef.current) {
        // We use scrollHeight to get the full height of the content
        const height = containerRef.current.scrollHeight;
        window.parent.postMessage({ type: "setHeight", height }, "*");
      }
    };

    // Report height on mount
    reportHeight();

    // Report height on window resize
    window.addEventListener("resize", reportHeight);

    // Create an observer to watch for content changes (e.g. data fetching, images loading)
    const observer = new ResizeObserver(reportHeight);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", reportHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`${className} overflow-x-hidden`}>
      {children}
    </div>
  );
}
