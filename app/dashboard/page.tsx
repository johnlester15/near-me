"use client";

import DashboardTab from "@/components/dashboard/dashboard-tab";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { INITIAL_INQUIRIES } from "@/lib/dashboard/mock-data";
import { useSubscription } from "@/contexts/subscription-context";

export default function DashboardPage() {
  const { plan } = useSubscription();
  const unreadInquiries = INITIAL_INQUIRIES.filter((i) => !i.read).length;

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <DashboardShell plan={plan} unreadInquiries={unreadInquiries}>
      <div className="mb-6">
        <p className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-1">
          Welcome Back
        </p>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
          {greeting}, Juan
        </h1>
      </div>

      <DashboardTab plan={plan} />
    </DashboardShell>
  );
}