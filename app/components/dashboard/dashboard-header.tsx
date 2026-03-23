"use client";

import { Bell, LogOut, MapPin, Wrench } from "lucide-react";
import { PLAN_CONFIG } from "../../lib/dashboard/config";
import { Plan } from "../../lib/dashboard/types";
import DashboardNav from "./dashboard-nav";

export default function DashboardHeader({
  plan,
  unreadInquiries = 0,
}: {
  plan: Plan;
  unreadInquiries?: number;
}) {
  const cfg = PLAN_CONFIG[plan];
  const PlanIcon = cfg.Icon;

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center shadow-sm">
              <MapPin size={15} className="text-white" strokeWidth={2.5} />
            </div>

            <span className="font-extrabold text-gray-900 tracking-tight">
              Near<span className="text-amber-500">Me</span>
            </span>

            <div
              className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full ${cfg.badgeBg} border ${cfg.border} ml-1`}
            >
              <PlanIcon size={10} className={cfg.textColor} />
              <span className={`text-[10px] font-bold ${cfg.textColor} uppercase tracking-wider`}>
                {cfg.label}
              </span>
            </div>
          </div>

          {/* Desktop nav only */}
          <div className="hidden lg:flex flex-1 justify-center">
            <DashboardNav unreadInquiries={unreadInquiries} />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <Bell size={16} className="text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 border-2 border-white" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                <Wrench size={16} className="text-amber-600" />
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700">
                Juan
              </span>
            </div>

            <button className="hidden sm:flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors font-semibold">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Mount nav separately on mobile so bottom nav is rendered */}
      <div className="lg:hidden">
        <DashboardNav unreadInquiries={unreadInquiries} />
      </div>
    </>
  );
}