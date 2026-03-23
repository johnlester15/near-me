"use client";

import {
  Award,
  BadgeCheck,
  MessageCircle,
  Search,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/landing/reveal";
import { StepCard } from "@/components/landing/sections/shared";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 px-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-500 mb-2">
              Simple Process
            </p>
            <h2 className="font-display text-3xl font-black text-gray-900 tracking-tight mb-3">
              How Near Me Works
            </h2>
            <p className="text-sm text-gray-500 mb-10 max-w-sm">
              Finding the right professional in your area has never been this simple.
            </p>
          </Reveal>

          <div className="space-y-8">
            <StepCard
              num="1"
              icon={Search}
              title="Search service & location"
              desc='Type what you need and where - e.g., "Electrician in Davao City".'
              delay={0}
            />
            <StepCard
              num="2"
              icon={Users}
              title="Browse verified profiles"
              desc="View ratings, credentials, and jobs done count from real customers."
              delay={100}
            />
            <StepCard
              num="3"
              icon={MessageCircle}
              title="Send an inquiry"
              desc="Contact the professional directly through their dedicated inbox."
              delay={200}
            />
            <StepCard
              num="4"
              icon={Star}
              title="Confirm & rate"
              desc="After completion, confirm the job and leave a review for the community."
              delay={300}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            {
              val: "200+",
              label: "Verified Advertisers",
              icon: BadgeCheck,
              delay: 0,
            },
            {
              val: "98%",
              label: "Customer Satisfaction",
              icon: TrendingUp,
              delay: 80,
            },
            {
              val: "15+",
              label: "Service Categories",
              icon: SlidersHorizontal,
              delay: 160,
            },
            { val: "5.0", label: "Average Rating", icon: Award, delay: 240 },
          ].map(({ val, label, icon: Icon, delay }) => (
            <Reveal key={label} delay={delay} direction="right">
              <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-6 hover:shadow-md hover:shadow-amber-100 transition-all duration-300 group">
                <Icon
                  size={18}
                  className="text-amber-500 mb-3 group-hover:scale-110 transition-transform duration-300"
                />
                <p className="font-display text-3xl font-black text-gray-900 mb-0.5">{val}</p>
                <p className="text-xs font-semibold text-gray-500">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
