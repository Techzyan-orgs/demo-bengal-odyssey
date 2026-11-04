'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Sun, CloudRain, Thermometer, Compass, ArrowRight, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { BEST_SEASONS_DATA, PACKAGES_DATA } from '@/lib/travel-data';
import { SafeImage } from '@/components/SafeImage';

// 12 Months Data Matrix for Bengal Corridors
// Values: 'peak' | 'good' | 'off'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SEASON_MATRIX: Record<string, ('peak' | 'good' | 'off')[]> = {
  'darjeeling-hills': ['good', 'good', 'peak', 'peak', 'peak', 'off', 'off', 'off', 'good', 'peak', 'peak', 'peak'],
  'dooars-terai': ['peak', 'peak', 'peak', 'peak', 'good', 'off', 'off', 'off', 'off', 'good', 'peak', 'peak'],
  'sundarbans': ['peak', 'peak', 'peak', 'good', 'off', 'off', 'off', 'off', 'good', 'good', 'peak', 'peak'],
  'coastal-puri': ['peak', 'peak', 'peak', 'good', 'off', 'off', 'off', 'off', 'good', 'peak', 'peak', 'peak'],
  'sikkim-offbeat': ['good', 'good', 'peak', 'peak', 'peak', 'off', 'off', 'off', 'good', 'peak', 'peak', 'peak'],
  'north-bengal-treks': ['good', 'good', 'good', 'peak', 'peak', 'off', 'off', 'off', 'good', 'peak', 'peak', 'peak'],
};

export default function BestSeasonPage() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

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

          {/* Quick Corridor Navigation Jump Pills */}
          <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Jump to Destination Window:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {BEST_SEASONS_DATA.map((dest) => {
                const pkgCount = PACKAGES_DATA.filter((p) => p.destination === dest.slug).length;
                return (
                  <a
                    key={dest.id}
                    href={`#${dest.slug}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 hover:bg-amber-500/10 dark:hover:bg-amber-500/10 border border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-800 dark:text-stone-200 hover:border-amber-500/40 transition-all shadow-sm group"
                  >
                    <span className="font-semibold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                      {dest.destination}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                      {pkgCount} {pkgCount === 1 ? 'Pkg' : 'Pkgs'}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Year-Round Travel Calendar Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>Month-By-Month Travel Matrix</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mt-1">
                When to Visit Which Corridor
              </h2>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="text-stone-600 dark:text-stone-300 font-medium">Optimal / Peak</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="text-stone-600 dark:text-stone-300 font-medium">Pleasant / Moderate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-700 inline-block" />
                <span className="text-stone-500 dark:text-stone-400 font-medium">Monsoon / Off-Peak</span>
              </div>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800">
                  <th className="py-3 px-3 font-semibold text-stone-600 dark:text-stone-400 w-48">
                    Destination Corridor
                  </th>
                  {MONTHS.map((m, idx) => (
                    <th
                      key={m}
                      onClick={() => setSelectedMonth(selectedMonth === idx ? null : idx)}
                      className={`py-3 px-2 text-center font-bold cursor-pointer transition-colors ${
                        selectedMonth === idx
                          ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-t-lg'
                          : 'text-stone-700 dark:text-stone-300 hover:text-amber-500'
                      }`}
                    >
                      {m}
                    </th>
                  ))}
                  <th className="py-3 px-3 text-right font-semibold text-stone-600 dark:text-stone-400">
                    Live Tours
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                {BEST_SEASONS_DATA.map((dest) => {
                  const pkgCount = PACKAGES_DATA.filter((p) => p.destination === dest.slug).length;
                  const row = SEASON_MATRIX[dest.slug] || [];

                  return (
                    <tr
                      key={dest.id}
                      className="hover:bg-stone-50/70 dark:hover:bg-stone-800/40 transition-colors"
                    >
                      <td className="py-3 px-3 font-bold text-stone-900 dark:text-white whitespace-nowrap">
                        <a href={`#${dest.slug}`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                          {dest.destination}
                        </a>
                      </td>
                      {row.map((status, idx) => {
                        let dotColor = 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600';
                        let label = 'Off-peak';

                        if (status === 'peak') {
                          dotColor = 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30';
                          label = 'Optimal';
                        } else if (status === 'good') {
                          dotColor = 'bg-amber-400 text-stone-900 shadow-sm shadow-amber-400/20';
                          label = 'Pleasant';
                        }

                        return (
                          <td
                            key={idx}
                            className={`py-3 px-2 text-center ${
                              selectedMonth === idx ? 'bg-amber-500/5' : ''
                            }`}
                            title={`${dest.destination} in ${MONTHS[idx]}: ${label}`}
                          >
                            <span
                              className={`inline-block w-4 h-4 rounded-full ${dotColor} transition-transform hover:scale-125`}
                            />
                          </td>
                        );
                      })}
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <Link
                          href={`/packages?destination=${dest.slug}`}
                          className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
                        >
                          {pkgCount} {pkgCount === 1 ? 'Package' : 'Packages'} →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Stacked Destination Sections (All 6 Corridors) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {BEST_SEASONS_DATA.map((item, index) => {
          const isEven = index % 2 === 0;
          const pkgCount = PACKAGES_DATA.filter((p) => p.destination === item.slug).length;

          return (
            <section
              key={item.id}
              id={item.slug}
              className="scroll-mt-28 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl transition-all hover:border-amber-500/40 dark:hover:border-stone-700"
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
                  <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                      {pkgCount} Curated Expedition {pkgCount === 1 ? 'Package' : 'Packages'} Available
                    </span>

                    <Link
                      href={`/packages?destination=${item.slug}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                      <span>Explore {item.destination} Packages ({pkgCount})</span>
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
