"use client";

import { MapPin } from "lucide-react";

export function HomeFooter() {
  return (
    <footer className="bg-gray-950 text-gray-500 py-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-400 flex items-center justify-center">
                <MapPin size={13} className="text-white" />
              </div>
              <span className="text-sm font-bold text-white">
                Near<span className="text-amber-400">Me</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs">
              Connecting you to trusted local professionals in your area.
            </p>
          </div>

          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Platform
              </p>
              {["How it works", "Services", "Advertise"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-xs hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Legal
              </p>
              {["Privacy", "Terms", "Contact"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="text-xs hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-gray-600">
          © 2026 NearMe. All rights reserved. Serving Davao &amp; nearby areas.
        </p>
      </div>
    </footer>
  );
}
