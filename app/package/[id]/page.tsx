'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Compass,
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Star,
  Flame,
  ChevronRight,
  Sparkles,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { PACKAGES_DATA, PackageItem } from '@/lib/travel-data';
import { calculatePackageUrgency, formatINR, generateWhatsAppUrl } from '@/lib/travel-logic';
import { SafeImage } from '@/components/SafeImage';
import { BookingModal } from '@/components/BookingModal';

export default function PackageDetailPage() {
  const params = useParams();
  const idOrSlug = params.id as string;

  const pkg = PACKAGES_DATA.find((p) => p.slug === idOrSlug || p.id === idOrSlug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedBatchDate, setSelectedBatchDate] = useState<string>(pkg ? pkg.departureDate : '2026-11-05');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeDayTab, setActiveDayTab] = useState<number>(1);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-2">Package Not Found</h2>
        <p className="text-stone-400 text-sm mb-4">
          The requested Bengal Odyssey tour could not be located.
        </p>
        <Link
          href="/packages"
          className="px-5 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs uppercase"
        >
          Return to Packages
        </Link>
      </div>
    );
  }

  const urgency = calculatePackageUrgency(pkg.departureDate, pkg.spotsLeft);
  const effectivePrice = pkg.discountPrice || pkg.basePrice;
  const whatsappUrl = generateWhatsAppUrl(
    '919830123456',
    pkg.title,
    selectedBatchDate,
    2
  );

  // Simulated batches
  const batches = [
    {
      date: pkg.departureDate,
      label: urgency.label,
      spots: pkg.spotsLeft,
      urgent: urgency.isUrgent,
    },
    {
      date: '2026-11-12',
      label: 'Departs 12 Nov',
      spots: 5,
      urgent: false,
    },
    {
      date: '2026-11-19',
      label: 'Departs 19 Nov',
      spots: 7,
      urgent: false,
    },
    {
      date: '2026-11-26',
      label: 'Departs 26 Nov',
      spots: 8,
      urgent: false,
    },
  ];

  return (
    <div className="pb-20 bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 min-h-screen transition-colors duration-200">
      {/* 1. Hero Multi-Image Showcase */}
      <div className="relative bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-4">
            <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400">
              Home
            </Link>
            <span>/</span>
            <Link href="/packages" className="hover:text-amber-600 dark:hover:text-amber-400">
              Packages
            </Link>
            <span>/</span>
            <Link
              href={`/packages?destination=${pkg.destination}`}
              className="hover:text-amber-600 dark:hover:text-amber-400 text-stone-700 dark:text-stone-300"
            >
              {pkg.destinationLabel}
            </Link>
            <span>/</span>
            <span className="text-amber-600 dark:text-amber-400 truncate max-w-[200px]">{pkg.title}</span>
          </div>

          {/* Main Visual Slider & Gallery Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Primary Large Image */}
            <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-xl">
              <SafeImage
                src={pkg.galleryImages[activeImageIndex] || pkg.heroImage}
                alt={pkg.title}
                fill
                priority
                fallbackTitle={pkg.title}
                fallbackGradient={pkg.fallbackGradient}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Top Floating Tags */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-emerald-800/90 text-white backdrop-blur-md text-xs font-semibold">
                  {pkg.typeLabel}
                </span>

                {urgency.isUrgent && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 text-white backdrop-blur-md text-xs font-bold shadow-md animate-pulse">
                    <Flame className="w-3.5 h-3.5" />
                    {urgency.label}
                  </span>
                )}
              </div>

              {/* Title & Price Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                  {pkg.destinationLabel} · {pkg.bengaliTitle}
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mt-1">
                  {pkg.title}
                </h1>
                <p className="text-xs sm:text-sm text-stone-200 mt-1 line-clamp-2 max-w-2xl font-light">
                  {pkg.tagline}
                </p>
              </div>
            </div>

            {/* Thumbnail Slices on Side */}
            <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
              {pkg.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-1 min-w-[120px] aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                    idx === activeImageIndex
                      ? 'border-amber-400 ring-2 ring-amber-400/40'
                      : 'border-stone-300 dark:border-stone-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${pkg.title} scene ${idx + 1}`}
                    fill
                    fallbackTitle={pkg.title}
                    fallbackGradient={pkg.fallbackGradient}
                    className="object-cover"
                  />
                </button>
              ))}

              {/* Quick stats mini card */}
              <div className="hidden lg:flex flex-col justify-center p-4 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/70 text-xs space-y-1 transition-colors">
                <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                  <span>Duration</span>
                  <strong className="text-stone-900 dark:text-white font-bold">{pkg.duration}</strong>
                </div>
                <div className="flex items-center justify-between text-stone-600 dark:text-stone-300">
                  <span>Rating</span>
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {pkg.rating} ({pkg.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-600 dark:text-stone-300 pt-1 border-t border-stone-200 dark:border-stone-700">
                  <span>Starting From</span>
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold text-sm">
                    {formatINR(effectivePrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Overview Ribbon */}
      <section className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {/* Spec 1: Trek Difficulty or Activity Level */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block font-semibold">
                  {pkg.trekSpecs ? 'Trek Grade' : 'Activity Pace'}
                </span>
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  {pkg.trekSpecs ? pkg.trekSpecs.difficulty : 'Moderate Explorer'}
                </span>
              </div>
            </div>

            {/* Spec 2: Altitude or Distance */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block font-semibold">
                  {pkg.trekSpecs ? 'Peak Altitude' : 'Locations'}
                </span>
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  {pkg.trekSpecs ? pkg.trekSpecs.altitude : `${pkg.locationsCovered.length} Key Hubs`}
                </span>
              </div>
            </div>

            {/* Spec 3: Ideal Season */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block font-semibold">
                  Optimal Season
                </span>
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  Oct – May (Clear Vistas)
                </span>
              </div>
            </div>

            {/* Spec 4: Assigned Captain mini preview */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500 shrink-0">
                <SafeImage
                  src={pkg.assignedCaptain.avatar}
                  alt={pkg.assignedCaptain.name}
                  fill
                  fallbackTitle={pkg.assignedCaptain.name}
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 uppercase tracking-wider block font-semibold">
                  Assigned Captain
                </span>
                <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  {pkg.assignedCaptain.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Split: Details & Day-wise Itinerary vs. Booking Sticky Widget */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Itinerary, Included Activities, Inclusions/Exclusions, Captain Profile */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview / Story */}
            <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm transition-colors">
              <div className="text-xs uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400">
                About This Expedition
              </div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
                The Bengal Odyssey Experience
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {pkg.summary}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {pkg.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 px-3 py-1 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Day-wise Itinerary Accordion / Breakdown */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400">
                    Day-Wise Plan
                  </span>
                  <h2 className="text-2xl font-bold text-stone-900 dark:text-white mt-1">
                    Detailed Journey Itinerary
                  </h2>
                </div>
                <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                  {pkg.days} Days · {pkg.nights} Nights
                </span>
              </div>

              <div className="space-y-4">
                {pkg.itinerary.map((day) => {
                  const isOpen = activeDayTab === day.day;
                  return (
                    <div
                      key={day.day}
                      className="border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden bg-white dark:bg-stone-900/80 shadow-sm transition-all"
                    >
                      <button
                        onClick={() => setActiveDayTab(isOpen ? 0 : day.day)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                            0{day.day}
                          </span>
                          <span className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                            {day.title}
                          </span>
                        </div>
                        <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                          {isOpen ? 'Close' : 'View Details'}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 space-y-4 border-t border-stone-200 dark:border-stone-800 text-xs animate-fade-in">
                          <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-sm">
                            {day.description}
                          </p>

                          {/* Highlights pills */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {day.highlights.map((hl, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs flex items-center gap-1.5"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                {hl}
                              </span>
                            ))}
                          </div>

                          {/* Meals & Stay */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                              <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 block mb-0.5">
                                Meals Provided
                              </span>
                              <span className="text-stone-800 dark:text-stone-200">{day.meals}</span>
                            </div>
                            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                                Overnight Stay
                              </span>
                              <span className="text-stone-800 dark:text-stone-200">{day.stay}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Included Activities Checklist */}
            <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm transition-colors">
              <div className="text-xs uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400">
                Signature Experiences
              </div>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                Included Activities & Permits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {pkg.includedActivities.map((act, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-3 shadow-sm transition-colors">
                <h3 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  What is Included
                </h3>
                <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                    <span>All entry taxes, tolls and forest department clearances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                    <span>24/7 dedicated trek dispatch coordination</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-3 shadow-sm transition-colors">
                <h3 className="font-bold text-sm text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  What is Excluded
                </h3>
                <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-600 dark:text-rose-400 font-bold">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <span className="text-rose-600 dark:text-rose-400 font-bold">•</span>
                    <span>Personal expenses, laundry, tips for drivers & porters</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Designated Captain Profile Card */}
            <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-colors">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400/80 shrink-0 shadow-lg">
                  <SafeImage
                    src={pkg.assignedCaptain.avatar}
                    alt={pkg.assignedCaptain.name}
                    fill
                    fallbackTitle={pkg.assignedCaptain.name}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Lead Expedition Captain
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                    {pkg.assignedCaptain.name} ({pkg.assignedCaptain.bengaliName})
                  </h3>
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                    {pkg.assignedCaptain.role} · {pkg.assignedCaptain.experience}
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {pkg.assignedCaptain.bio}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Spoken Dialects:</span>
                    {pkg.assignedCaptain.dialects.map((lang) => (
                      <span
                        key={lang}
                        className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking Card & Calendar Batches */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xl dark:shadow-2xl space-y-6 transition-colors">
              {/* Pricing Header */}
              <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
                <div className="text-xs text-stone-500 dark:text-stone-400">All-Inclusive Fixed Batch Fare</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                    {formatINR(effectivePrice)}
                  </span>
                  {pkg.discountPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatINR(pkg.basePrice)}
                    </span>
                  )}
                  <span className="text-xs text-stone-500 dark:text-stone-400">/ traveler</span>
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Guaranteed Departure & 15% Token Lock
                </div>
              </div>

              {/* Interactive Batch Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                  Select Departure Batch
                </label>
                <div className="space-y-2">
                  {batches.map((batch) => {
                    const isSelected = selectedBatchDate === batch.date;
                    return (
                      <div
                        key={batch.date}
                        onClick={() => setSelectedBatchDate(batch.date)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/10 text-stone-900 dark:text-white font-semibold'
                            : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-600 dark:text-amber-400' : 'text-stone-500 dark:text-stone-400'}`} />
                          <span>{batch.date}</span>
                          {batch.urgent && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-600 text-white font-bold">
                              {batch.label}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-500 dark:text-stone-400">
                          {batch.spots} spots left
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue to Book</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>

              {/* Trust markers */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 space-y-1.5">
                <p>• Verified by Govt of West Bengal Tourism Dept.</p>
                <p>• 100% full refund on weather-blocked high passes.</p>
                <p>• Flexible date transfer within 6 months.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Checkout Modal */}
      <BookingModal
        pkg={pkg}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialDate={selectedBatchDate}
      />
    </div>
  );
}
