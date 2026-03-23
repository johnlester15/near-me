"use client";

import { Reveal } from "@/components/landing/reveal";
import { categories, CategoryTile } from "@/components/landing/sections/shared";

export function CategoriesSection() {
  return (
    <section id="services" className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber-500 mb-2">
              Browse by Category
            </p>
            <h2 className="font-display text-3xl font-black text-gray-900 tracking-tight">
              What are you looking for?
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {categories.map(({ icon, label }, i) => (
            <CategoryTile key={label} icon={icon} label={label} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
