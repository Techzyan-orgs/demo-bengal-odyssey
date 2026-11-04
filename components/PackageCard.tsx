'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, MapPin, Users, Compass, ChevronRight, Star, Flame, Tag } from 'lucide-react';
import { PackageItem } from '@/lib/travel-data';
import { calculatePackageUrgency, formatINR, getWeekendScheduleLabel } from '@/lib/travel-logic';
import { SafeImage } from './SafeImage';

interface PackageCardProps {
  pkg: PackageItem;
  showVacancy?: boolean;
}

export function PackageCard({ pkg, showVacancy = true }: PackageCardProps) {
  const urgency = calculatePackageUrgency(pkg.departureDate, pkg.spotsLeft);
  const effectivePrice = pkg.discountPrice || pkg.basePrice;
  const weekendSchedule = pkg.type === 'weekend-getaway' ? getWeekendScheduleLabel(pkg.departureDate, pkg.days) : null;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
        <SafeImage
          src={pkg.heroImage}
          alt={pkg.title}
          fill
          fallbackTitle={pkg.title}
          fallbackGradient={pkg.fallbackGradient}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {/* Urgency Pill */}
          {urgency.isUrgent ? (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm ${
                urgency.colorScheme === 'critical'
                  ? 'bg-red-600/90 text-white animate-pulse'
                  : 'bg-amber-500/90 text-stone-950 font-bold'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              {urgency.label}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md text-stone-200">
              <Clock className="w-3 h-3 text-amber-400" />
              {urgency.label}
            </span>
          )}

          {/* Right Badge: Vacancy */}
          {showVacancy && pkg.spotsLeft <= 5 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-600/90 text-white backdrop-blur-md shadow-sm">
              <Users className="w-3 h-3" />
              Only {pkg.spotsLeft} spots left
            </span>
          )}
        </div>

        {/* Bottom Floating Metadata overlay on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
          <div className="flex items-center gap-2 text-xs text-stone-200">
            <span className="px-2 py-0.5 rounded bg-emerald-700/80 backdrop-blur-md font-medium text-emerald-100 flex items-center gap-1">
              <span>{pkg.typeLabel}</span>
              {weekendSchedule && (
                <span className="text-amber-300 font-bold text-[10px]">({weekendSchedule})</span>
              )}
            </span>
            <span className="text-stone-300">·</span>
            <span className="font-medium text-amber-300">{pkg.duration}</span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-0.5 text-amber-300">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {pkg.rating} ({pkg.reviewCount})
            </span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Bengali Sub-title & Title */}
          <div className="text-[11px] font-medium text-amber-700 dark:text-amber-400 tracking-wide uppercase">
            {pkg.destinationLabel} · {pkg.bengaliTitle}
          </div>
          <h3 className="mt-1 text-lg font-bold text-stone-900 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
            <Link href={`/package/${pkg.slug}`} className="focus:outline-none">
              {pkg.title}
            </Link>
          </h3>

          {/* Locations Covered */}
          <div className="mt-2 flex items-start gap-1.5 text-xs text-stone-600 dark:text-stone-400">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{pkg.locationsCovered.join(' → ')}</span>
          </div>

          {/* Trek specs (if applicable) */}
          {pkg.trekSpecs && (
            <div className="mt-2.5 p-2 rounded-lg bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 flex items-center justify-between">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5" />
                {pkg.trekSpecs.difficulty} Trek
              </span>
              <span>{pkg.trekSpecs.altitude}</span>
              <span>{pkg.trekSpecs.distance}</span>
            </div>
          )}

          {/* Summary */}
          <p className="mt-2.5 text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
            {pkg.summary}
          </p>

          {/* Activity Tag Chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pkg.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/80 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
          <div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400">All-Inclusive Per Person</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-stone-900 dark:text-white">
                {formatINR(effectivePrice)}
              </span>
              {pkg.discountPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {formatINR(pkg.basePrice)}
                </span>
              )}
            </div>
            {pkg.earlyBirdOffer && (
              <div className="mt-1">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  <Tag className="w-2.5 h-2.5 text-amber-600 dark:text-amber-400" />
                  <span>Early Bird Offer</span>
                </span>
              </div>
            )}
          </div>

          <Link
            href={`/package/${pkg.slug}`}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-all group-hover:shadow-md shrink-0"
          >
            <span>Explore</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
