'use client';

import React from 'react';
import { DESTINATIONS_DATA, DestinationAccordionItem } from '@/lib/travel-data';
import { SafeImage } from './SafeImage';
import { Compass, ArrowRight } from 'lucide-react';

interface DestinationAccordionProps {
  activeDestination: string; // 'all' or destination slug
  onSelectDestination: (slug: string) => void;
}

export function DestinationAccordion({
  activeDestination,
  onSelectDestination,
}: DestinationAccordionProps) {
  return (
    <div className="w-full space-y-3">
      {/* Mobile Horizontal Pill Scroller */}
      <div className="md:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectDestination('all')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
            activeDestination === 'all'
              ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
          }`}
        >
          All Bengal ({DESTINATIONS_DATA.reduce((acc, curr) => acc + curr.totalPackages, 0)})
        </button>
        {DESTINATIONS_DATA.map((dest) => (
          <button
            key={dest.id}
            onClick={() => onSelectDestination(dest.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              activeDestination === dest.slug
                ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            {dest.title}
          </button>
        ))}
      </div>

      {/* Desktop Expansive Accordion Strip */}
      <div className="hidden md:flex h-64 lg:h-72 w-full gap-2 rounded-2xl overflow-hidden bg-stone-950 p-1.5 shadow-xl border border-stone-800">
        {/* "All" reset item */}
        <div
          onClick={() => onSelectDestination('all')}
          className={`relative cursor-pointer transition-all duration-500 ease-out rounded-xl overflow-hidden flex flex-col justify-end p-4 border ${
            activeDestination === 'all'
              ? 'flex-[2.5] border-amber-500/80 bg-stone-900 shadow-lg'
              : 'flex-1 hover:flex-[1.3] border-stone-800/80 bg-stone-900/60'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-transparent" />
          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 border border-amber-500/30">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white whitespace-nowrap">
              All Bengal
            </h4>
            <p className="text-[11px] text-stone-400 mt-1 line-clamp-2">
              Browse all tours from sea to summit
            </p>
          </div>
        </div>

        {/* Destination Items */}
        {DESTINATIONS_DATA.map((dest) => {
          const isActive = activeDestination === dest.slug;

          return (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest.slug)}
              className={`relative cursor-pointer transition-all duration-500 ease-out rounded-xl overflow-hidden group border ${
                isActive
                  ? 'flex-[3.5] border-amber-400 shadow-2xl'
                  : 'flex-1 hover:flex-[1.5] border-stone-800/80'
              }`}
            >
              {/* Background Photo */}
              <SafeImage
                src={dest.image}
                alt={dest.title}
                fill
                fallbackTitle={dest.title}
                fallbackGradient={dest.gradient}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient scrim */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isActive
                    ? 'bg-gradient-to-t from-stone-950 via-stone-950/50 to-black/20'
                    : 'bg-black/60 group-hover:bg-black/40'
                }`}
              />

              {/* Content overlay */}
              {isActive ? (
                // Expanded Active View
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white animate-fade-in">
                  <div className="text-[11px] font-bold text-amber-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
                    <span>Active Destination</span>
                    <span>·</span>
                    <span>{dest.bengaliTitle}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-extrabold text-white leading-tight">
                    {dest.title}
                  </h3>
                  <p className="text-xs text-stone-200 mt-1.5 line-clamp-2 max-w-sm">
                    {dest.shortDesc}
                  </p>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/20 text-xs">
                    <span className="font-semibold text-amber-300">
                      {dest.highlight}
                    </span>
                    <span className="inline-flex items-center gap-1 font-bold text-white bg-amber-600/80 px-2.5 py-1 rounded-lg">
                      <span>{dest.totalPackages} Packages</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ) : (
                // Collapsed Inactive View (Vertical text on desktop)
                <div className="absolute inset-0 p-3 flex flex-col justify-between text-white">
                  <span className="text-[10px] font-mono text-stone-400 text-right">
                    0{dest.totalPackages}
                  </span>
                  <div className="[writing-mode:vertical-rl] rotate-180 font-bold text-xs tracking-wider text-stone-300 group-hover:text-amber-300 transition-colors uppercase whitespace-nowrap">
                    {dest.title}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
