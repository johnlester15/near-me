"use client";

import Link from "next/link";
import { Home, Inbox, CheckSquare, User, CreditCard } from "lucide-react";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
};

export default function DashboardNav({
  unreadInquiries = 0,
}: {
  unreadInquiries?: number;
}) {
  const pathname = usePathname();

  const tabs: NavItem[] = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/inbox", icon: Inbox, label: "Inbox", badge: unreadInquiries },
    { href: "/dashboard/jobs", icon: CheckSquare, label: "Jobs" },
    { href: "/dashboard/profile", icon: User, label: "Profile" },
    { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop nav */}
      <div className="hidden lg:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative flex items-center gap-2 h-9 px-4 rounded-lg text-xs font-bold transition-all duration-200 ${
                active
                  ? "bg-white text-amber-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>

              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                  {tab.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-[60] border-t border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="grid grid-cols-5 items-center px-1 pt-2 pb-[calc(0.65rem+env(safe-area-inset-bottom))]">
          {tabs.map((tab) => {
            const active = isActive(tab.href);
            const Icon = tab.icon;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative flex flex-col items-center justify-center gap-1 py-1"
              >
                <div
                  className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                    active ? "bg-amber-50 text-amber-600" : "text-gray-400"
                  }`}
                >
                  <Icon size={18} strokeWidth={2.2} />

                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center leading-none">
                      {tab.badge}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[10px] font-bold ${
                    active ? "text-amber-600" : "text-gray-400"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}