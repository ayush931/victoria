"use client";

import React, { useCallback, useEffect, useState } from "react";
import Preloader from "@/components/effects/Preloader";

export default function PreloaderGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // If the user has already seen the preloader in this session, skip immediately
    if (typeof window !== "undefined") {
      const alreadySeen = sessionStorage.getItem("victorino_preloader_seen");
      if (alreadySeen) {
        (window as unknown as { __preloaderDone?: boolean }).__preloaderDone = true;
        setReady(true);
      }
    }
  }, []);

  const handleDone = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("victorino_preloader_seen", "true");
      (window as unknown as { __preloaderDone?: boolean }).__preloaderDone = true;
    }
    setReady(true);
  }, []);

  return (
    <>
      {!ready && <Preloader onDone={handleDone} />}
      {children}
    </>
  );
}
