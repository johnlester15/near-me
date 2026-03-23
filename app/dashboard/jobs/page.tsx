"use client";

import JobsTab from "@/components/dashboard/jobs-tab";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { INITIAL_INQUIRIES } from "@/lib/dashboard/mock-data";
import { useSubscription } from "@/contexts/subscription-context";

export default function JobsPage() {
  const { plan } = useSubscription();
  const unreadInquiries = INITIAL_INQUIRIES.filter((i) => !i.read).length;

  return (
    <DashboardShell plan={plan} unreadInquiries={unreadInquiries}>
      <JobsTab />
    </DashboardShell>
  );
}