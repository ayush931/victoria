"use client";
import { useEffect, useRef, Suspense } from "react";
import { usePathname } from "next/navigation";
function Tracker() {
  const path = usePathname();
  const visitId = useRef<string | undefined>(undefined);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const consent = useRef(false);
  const consentEpoch = useRef(0);
  useEffect(() => {
    if (path.startsWith("/victoria-admin-panel")) return;
    let allowed = false,
      disposed = false,
      depth = 0;
    const send = (kind: string, extra: Record<string, unknown> = {}) => {
      if (!allowed || disposed) return;
      const epoch = consentEpoch.current;
      queue.current = queue.current.then(async () => {
        // Keep captured public events across route transitions, but discard them on consent revocation.
        if (!allowed || !consent.current || epoch !== consentEpoch.current)
          return;
        try {
          const response = await fetch("/api/analytics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              kind,
              path,
              consent: true,
              visitId: visitId.current,
              ...extra,
            }),
            keepalive: true,
          });
          if (response.ok) {
            const result = await response.json();
            if (consent.current && epoch === consentEpoch.current)
              visitId.current = result.visitId;
            else
              void fetch("/api/analytics", { method: "DELETE" }).catch(
                () => {},
              );
            if (result.disabled) allowed = false;
          }
        } catch {
          /* Analytics must never interrupt browsing. */
        }
      });
    };
    const sync = () => {
      let accepted = false;
      try {
        const saved = JSON.parse(
          localStorage.getItem("victorino-consent-v2") || "null",
        );
        accepted =
          saved?.choice === "accept" &&
          Number.isFinite(saved.updatedAt) &&
          saved.updatedAt <= Date.now() &&
          Date.now() - saved.updatedAt < 180 * 86400000;
      } catch {}
      const wasAllowed = consent.current;
      const changed = accepted !== allowed;
      allowed = accepted;
      consent.current = accepted;
      if (!accepted && wasAllowed) consentEpoch.current += 1;
      if (allowed && changed)
        send("page_view", {
          referrer: document.referrer
            ? new URL(document.referrer).origin
            : undefined,
        });
      if (!allowed && wasAllowed) {
        visitId.current = undefined;
        void fetch("/api/analytics", { method: "DELETE" }).catch(() => {});
      }
    };
    sync();
    const click = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest("a,button,summary")
          : null;
      if (!target) return;
      let label = target.tagName.toLowerCase();
      if (target instanceof HTMLAnchorElement) {
        try {
          const url = new URL(target.href);
          label =
            url.origin === location.origin
              ? `link:${url.pathname}`
              : "external_link";
        } catch {
          return;
        }
      } else if (target.closest("form")) label = "enquiry_form_action";
      else label = target.getAttribute("data-track") || label;
      send("click", { target: label.slice(0, 120) });
    };
    const enquiry = () => send("click", { target: "open_enquiry" });
    const scroll = () => {
      const height = document.documentElement.scrollHeight - innerHeight;
      if (height <= 0) return;
      const next = Math.min(100, Math.floor((scrollY / height) * 4) * 25);
      if (next > depth) {
        depth = next;
        send("scroll", { depth });
      }
    };
    const heartbeat = setInterval(() => {
      if (!document.hidden) send("heartbeat");
    }, 30000);
    const exit = () => send("page_exit");
    window.addEventListener("victorino:consent-change", sync);
    window.addEventListener("storage", sync);
    window.addEventListener("victorino:enquire", enquiry);
    document.addEventListener("click", click);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("pagehide", exit);
    return () => {
      disposed = true;
      clearInterval(heartbeat);
      window.removeEventListener("victorino:consent-change", sync);
      window.removeEventListener("storage", sync);
      window.removeEventListener("victorino:enquire", enquiry);
      document.removeEventListener("click", click);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("pagehide", exit);
    };
  }, [path]);
  return null;
}
export default function VisitorTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
