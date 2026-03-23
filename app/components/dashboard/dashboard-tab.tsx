"use client";

import {
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
} from "lucide-react";
import { PLAN_CONFIG } from "../../lib/dashboard/config";
import { INITIAL_JOBS, STATUS_CONFIG } from "../../lib/dashboard/mock-data";
import { Plan } from "../../lib/dashboard/types";
import { AvatarBubble, SubscriptionCard, UpgradeBanner } from "./shared";

export default function DashboardTab({ plan }: { plan: Plan }) {
  const cfg = PLAN_CONFIG[plan];
  const limits = cfg.limits;

  const done = INITIAL_JOBS.filter((j) => j.status === "completed").length;
  const active = INITIAL_JOBS.filter((j) => j.status === "in_progress").length;
  const awaiting = INITIAL_JOBS.filter((j) => j.status === "awaiting_confirm").length;

  const stats = [
    {
      Icon: CheckCircle,
      value: done,
      label: "Completed",
      iconColor: "text-green-500",
      iconBg: "bg-green-50",
    },
    {
      Icon: TrendingUp,
      value: active,
      label: "In Progress",
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
    },
    {
      Icon: AlertCircle,
      value: awaiting,
      label: "Awaiting",
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
    },
    {
      Icon: Star,
      value: "4.9",
      label: "Avg Rating",
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-5">
      {plan === "free" && (
        <UpgradeBanner
          currentPlan={plan}
          targetPlan="basic"
          message="Your profile visibility is limited. Upgrade to get full access."
        />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ Icon, value, label, iconColor, iconBg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
              <Icon size={17} className={iconColor} />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <SubscriptionCard plan={plan} />

      {limits.analytics ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
            Analytics
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Profile Views", value: "248" },
              { label: "Inquiries", value: "12" },
              { label: "Conversion", value: "4.8%" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-xl font-extrabold text-gray-900">{item.value}</p>
                <p className="text-[10px] text-gray-400 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <UpgradeBanner
          currentPlan={plan}
          targetPlan="pro"
          message="Unlock analytics to track your profile performance."
          compact
        />
      )}

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Recent Jobs</p>
        <div className="space-y-3">
          {INITIAL_JOBS.slice(0, 3).map((job) => {
            const status = STATUS_CONFIG[job.status];
            return (
              <div key={job.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <AvatarBubble initials={job.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{job.customer}</p>
                  <p className="text-xs text-gray-400">{job.service} - {job.date}</p>
                </div>
                <div
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${status.color} ${status.bg} ${status.border}`}
                >
                  {status.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
          Plan Visibility
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Inquiries", value: limits.inquiries, enabled: plan !== "free" },
            { label: "Position", value: limits.position, enabled: plan === "pro" || plan === "premium" },
            { label: "Video", value: limits.video ? "Enabled" : "Locked", enabled: limits.video },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-xl p-3 border text-center ${
                item.enabled ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                  item.enabled ? "text-green-600" : "text-red-500"
                }`}
              >
                {item.label}
              </p>
              <p className={`text-xs font-extrabold ${item.enabled ? "text-green-700" : "text-red-700"}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400 px-1">
        <Clock size={12} /> Last sync: just now
      </div>
    </div>
  );
}