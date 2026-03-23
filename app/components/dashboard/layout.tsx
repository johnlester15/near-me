import DashboardHeader from "../../components/dashboard/dashboard-header";
import DashboardNav from "../../components/dashboard/dashboard-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      <DashboardHeader plan="free" unreadInquiries={2} />

      <main className="max-w-6xl mx-auto px-4 pt-20 pb-24 lg:pb-8">
        {children}
      </main>

      {/* Mobile nav only */}
      <div className="lg:hidden">
        <DashboardNav unreadInquiries={2} />
      </div>
    </div>
  );
}