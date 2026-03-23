"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCheck,
  CheckCircle,
  Clock,
  Crown,
  FileText,
} from "lucide-react";
import { PLAN_CONFIG } from "../../lib/dashboard/config";
import { Plan } from "../../lib/dashboard/types";

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
}) {
  const { ref, visible } = useScrollReveal();
  const hidden = {
    up: "opacity-0 translate-y-8",
    left: "opacity-0 -translate-x-8",
    right: "opacity-0 translate-x-8",
    fade: "opacity-0",
  }[direction];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : hidden
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function AvatarBubble({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const s = {
    sm: "w-8 h-8 text-[11px]",
    md: "w-10 h-10 text-xs",
    lg: "w-14 h-14 text-base",
  }[size];

  return (
    <div
      className={`${s} rounded-full bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center text-white font-bold shrink-0`}
    >
      {initials}
    </div>
  );
}

export function InfoRow({
  Icon,
  label,
  value,
}: {
  Icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={12} className="text-amber-600" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm text-gray-700 font-medium leading-snug">{value}</p>
      </div>
    </div>
  );
}

export function UpgradeBanner({
  targetPlan,
  message,
  compact = false,
  onUpgrade,
}: {
  currentPlan: Plan;
  targetPlan: Plan;
  message: string;
  compact?: boolean;
  onUpgrade?: () => void;
}) {
  const cfg = PLAN_CONFIG[targetPlan];
  const Icon = cfg.Icon;

  if (compact) {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-xl ${cfg.bg} border ${cfg.border}`}>
        <Icon size={14} className={cfg.textColor} />
        <p className={`text-xs font-semibold ${cfg.textColor} flex-1`}>{message}</p>
        <button
          onClick={onUpgrade}
          className={`shrink-0 h-7 px-3 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r ${cfg.gradient} hover:opacity-90 transition-all`}
        >
          Upgrade
        </button>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border ${cfg.border} overflow-hidden`}>
      <div className={`bg-gradient-to-r ${cfg.gradient} p-4 text-white relative overflow-hidden`}>
        <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
            <Icon size={18} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-0.5">
              Upgrade to {cfg.label}
            </p>
            <p className="text-base font-extrabold">{message}</p>
          </div>
        </div>
      </div>
      <div className={`${cfg.bg} px-4 py-3`}>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
          {cfg.features.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <CheckCircle size={11} className={cfg.textColor} />
              <span className={`text-[11px] font-semibold ${cfg.textColor}`}>{f}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onUpgrade}
          className={`w-full h-10 rounded-xl text-white text-sm font-bold bg-gradient-to-r ${cfg.gradient} hover:opacity-90 active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2`}
        >
          Upgrade to {cfg.label} - {cfg.price} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function SubscriptionCard({ plan }: { plan: Plan }) {
  const cfg = PLAN_CONFIG[plan];
  const Icon = cfg.Icon;

  return (
    <div className={`relative rounded-2xl overflow-hidden border ${cfg.border} shadow-sm`}>
      <div className={`bg-gradient-to-r ${cfg.gradient} p-4 text-white relative overflow-hidden`}>
        <div className="absolute right-0 top-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Icon size={15} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                Current Plan
              </span>
            </div>
            <p className="text-xl font-extrabold">
              {cfg.label} - {cfg.price}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
            <CheckCheck size={18} className="text-white" />
          </div>
        </div>
      </div>

      <div className={`${cfg.bg} px-4 py-3`}>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {cfg.features.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <CheckCircle size={10} className={cfg.textColor} />
              <span className={`text-[10px] font-semibold ${cfg.textColor}`}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 bg-white flex items-center justify-between border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock size={11} className="text-gray-400" />
          <span>
            Renews: <span className="font-bold text-gray-700">April 30, 2025</span>
          </span>
        </div>
        {plan !== "premium" ? (
          <div className="flex items-center gap-1.5 h-7 px-3 rounded-lg text-[11px] font-bold text-white bg-gradient-to-r from-amber-500 to-amber-400">
            <Crown size={10} /> Upgrade
          </div>
        ) : (
          <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
            <CheckCircle size={10} className="text-amber-500" /> Best Plan
          </div>
        )}
      </div>
    </div>
  );
}

export function CredentialsCard() {
  const credentials = [
    { label: "TESDA NC II - Plumbing", issuer: "TESDA Davao", year: "2019", verified: true },
    { label: "Business Permit", issuer: "City of Davao", year: "2024", verified: true },
    { label: "Valid Government ID (PhilSys)", issuer: "PSA Philippines", year: "2022", verified: true },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Credentials</p>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50">
          <CheckCircle size={11} className="text-green-500" />
          <span className="text-[10px] font-bold text-green-600">Admin Verified</span>
        </div>
      </div>

      {credentials.map((c, i) => (
        <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
            <FileText size={13} className="text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-gray-800 truncate">{c.label}</p>
            <p className="text-[11px] text-gray-400">
              {c.issuer} - {c.year}
            </p>
          </div>
          {c.verified && <CheckCircle size={14} className="text-green-500 shrink-0" />}
        </div>
      ))}
    </div>
  );
}