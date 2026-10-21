import { Suspense } from "react";
import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import "./admin.css";
export const metadata: Metadata = {
  title: "Victoria Admin Panel | Victorino",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main id="main-content" className="admin-app admin-login">
          <p role="status">Loading studio dashboard…</p>
        </main>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}
