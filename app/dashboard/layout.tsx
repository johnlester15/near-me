import { SubscriptionProvider } from "@/contexts/subscription-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <SubscriptionProvider>{children}</SubscriptionProvider>;
}