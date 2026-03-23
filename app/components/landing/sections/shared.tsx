"use client";

import { Car, Hammer, Leaf, Monitor, PaintBucket, SprayCan, Wrench, Zap } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";

export const categories = [
  { icon: Wrench, label: "Plumbing" },
  { icon: Zap, label: "Electrical" },
  { icon: Hammer, label: "Carpentry" },
  { icon: Leaf, label: "Landscaping" },
  { icon: PaintBucket, label: "Painting" },
  { icon: SprayCan, label: "Cleaning" },
  { icon: Monitor, label: "IT Services" },
  { icon: Car, label: "Auto Repair" },
];

export function CategoryTile({
  icon: Icon,
  label,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} direction="up">
      <button className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100/60 hover:-translate-y-1 transition-all duration-300 w-full">
        <div className="w-10 h-10 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center transition-colors duration-300">
          <Icon size={18} className="text-amber-600" />
        </div>
        <span className="text-[11px] font-semibold text-gray-600 group-hover:text-amber-700 transition-colors text-center leading-tight">
          {label}
        </span>
      </button>
    </Reveal>
  );
}

export function StepCard({
  num,
  title,
  desc,
  icon: Icon,
  delay,
}: {
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  delay: number;
}) {
  return (
    <Reveal delay={delay} direction="left">
      <div className="flex gap-4 items-start group">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center shadow-md shadow-amber-200 group-hover:scale-110 transition-transform duration-300">
          <Icon size={17} className="text-white" />
        </div>
        <div>
          <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">
            Step {num}
          </span>
          <h4 className="font-bold text-gray-900 text-[15px] mb-0.5">{title}</h4>
          <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

