'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Sun, CloudRain, Thermometer, Compass, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { BEST_SEASONS_DATA } from '@/lib/travel-data';
import { SafeImage } from '@/components/SafeImage';

export default function BestSeasonPage() {
  return (
    <div className="pb-20 bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 min-h-screen transition-colors duration-200">
      {/* Hero Header */}
      <section className="border-b border-stone-200 dark:border-stone-800 py-16 bg-stone-100/60 dark:bg-stone-900/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
              <Sun className="w-3.5 h-3.5" />
              Microclimate & Wildlife Windows
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
              Best Season & Travel Calendar for Bengal
            </h1>
            <p className="text-base text-stone-600 dark:text-stone-300 font-normal leading-relaxed">
              From when Royal Bengal Tigers bask on sunny delta mudflats to the exact autumn weeks when Kanchenjunga shines with razor-sharp clarity. Plan your journey aligned with nature’s rhythm.
            </p>
          </div>
        </div>
      </section>

      {/* Stacked Destination Sections (Top to Bottom) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {BEST_SEASONS_DATA.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <section
              key={item.id}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl transition-all hover:border-amber-500/40 dark:hover:border-stone-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Image Half */}
                <div
                  className={`lg:col-span-5 relative min-h-[300px] lg:min-h-[460px] ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <SafeImage
                    src={item.image}
                    alt={item.destination}
                    fill
                    fallbackTitle={item.destination}
                    fallbackGradient={item.gradient}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent lg:hidden" />

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/20">
                      {item.idealMonths}
                    </span>
                  </div>
                </div>

                {/* Content Half */}
                <div
                  className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400">
                        {item.bengaliTitle}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
                        {item.destination}
                      </h2>
                    </div>

                    {/* Weather & Temp Pill Ribbon */}
                    <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-start gap-3 text-xs transition-colors">
                      <Thermometer className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-stone-900 dark:text-stone-200 block">Climate & Temperatures:</span>
                        <span className="text-stone-600 dark:text-stone-400">{item.weather}</span>
                      </div>
                    </div>

                    {/* Why Optimal Narrative */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-300 mb-1.5">
                        Why this window is optimal:
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                        {item.whyOptimal}
                      </p>
                    </div>

                    {/* Key Activities Checklist */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-300 mb-2">
                        Peak Season Highlights & Activities:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {item.keyActivities.map((act, i) => (
                          <div key={i} className="flex items-center gap-2 text-stone-700 dark:text-stone-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Direct Contextual CTA */}
                  <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      {item.packagesCount} Curated Expedition Batches
                    </span>

                    <Link
                      href={`/packages?destination=${item.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                      <span>Explore {item.destination} Packages</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
