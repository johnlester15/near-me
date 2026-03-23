"use client";

import { Plan } from "../../lib/dashboard/types";
import DashboardHeader from "./dashboard-header";

export function DashboardShell({
  plan,
  unreadInquiries = 0,
  children,
}: {
  plan: Plan;
  unreadInquiries?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F7F4] font-[family-name:var(--font-geist-sans)] overflow-x-hidden">
      <DashboardHeader plan={plan} unreadInquiries={unreadInquiries} />
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-28">{children}</main>
    </div>
  );
}