"use client";

import { ArrowRight, Building2 } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";

export function AdvertiseSection({
  onOpenSignIn,
  onOpenSignUp,
}: {
  onOpenSignIn: () => void;
  onOpenSignUp: () => void;
}) {
  return (
    <section id="advertise" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-400 overflow-hidden p-10 sm:p-12 text-center text-white">
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-bold uppercase tracking-widest text-white mb-6">
                <Building2 size={12} /> For Professionals &amp; Businesses
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight mb-4">
                Advertise Your Services
                <br />
                on Near Me
              </h2>
              <p className="text-base text-white/80 mb-9 max-w-lg mx-auto leading-relaxed">
                Whether you&apos;re an individual freelancer or a registered company - reach customers in your area who need your expertise today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={onOpenSignUp}
                  className="h-12 px-8 rounded-full bg-white text-amber-600 font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                  type="button"
                >
                  Apply to Advertise <ArrowRight size={15} />
                </button>
                <button
                  onClick={onOpenSignIn}
                  className="h-12 px-8 rounded-full bg-white/20 border border-white/40 text-white font-semibold text-sm hover:bg-white/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                  type="button"
                >
                  Sign In to Account
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
