"use client";
import { usePathname } from "next/navigation";
import CustomCursor from "@/components/effects/CustomCursor";
import SmoothScroll from "@/components/effects/SmoothScroll";
import Chrome from "@/components/effects/Chrome";
import VisitorTracker from "@/components/effects/VisitorTracker";
import CookieConsent from "./CookieConsent";
/** Optional public effects never wrap or hide the route's readable content. */
export default function SiteExperience() {
  const pathname = usePathname();
  if (pathname.startsWith("/victoria-admin-panel")) return null;
  return (
    <>
      <CustomCursor />
      <Chrome />
      <SmoothScroll>{null}</SmoothScroll>
      <CookieConsent />
      <VisitorTracker />
    </>
  );
}
