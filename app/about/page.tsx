'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, Heart, Award, ArrowRight, CheckCircle2, MapPin, Users, Sparkles } from 'lucide-react';
import { CAPTAINS_DATA } from '@/lib/travel-data';
import { SafeImage } from '@/components/SafeImage';

export default function AboutPage() {
  return (
    <div className="pb-20 bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 min-h-screen transition-colors duration-200">
      {/* 1. Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              The Bengal Odyssey Story
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight">
              From Sea to Summit: Bengal’s Untold Wilderness
            </h1>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
              West Bengal is India’s only state that stretches uninterrupted from the roaring tidal mangroves of the Bay of Bengal to the 11,930-foot snowbound ridgelines of the Eastern Himalayas. Bengal Odyssey was founded to share this extraordinary spectrum with integrity, safety, and deep local reverence.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Bar */}
      <section className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                12+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                Years Operating
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Founded in Kolkata in 2014</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                350+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                Treks Completed
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">100% safety record on Singalila</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                40+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                Curated Destinations
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Dooars, Sundarbans, Darjeeling, Sikkim</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                25+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                Certified Captains
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">HMI & Wildlife Institute certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Mission & Core Values */}
      <section className="py-20 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
              Our Ethos
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              The Four Pillars of Bengal Odyssey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">Sustainable & Leave No Trace</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                We remove all single-use plastics from high-altitude camps, support eco-homestays in Zuluk and Srikhola, and preserve vulnerable mangrove ecosystems.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">Uncompromising Field Safety</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Daily pulse oximeter vitals on high trails, certified medical oxygen cylinders, GPS satellite devices, and 24/7 doctor tele-support.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">Local Community Guides</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Every journey is co-led by native Sherpa trail masters, Rajbanshi forest naturalists, and Sundarban island boatmen who know the land intimately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3 shadow-sm transition-colors">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">Transparent & All-Inclusive</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Zero surprise entry taxes, zero hidden safari permit fees. We publish fixed batch fares with clear inclusions and flexible rescheduling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Captains & Trek Leaders Grid */}
      <section className="py-20 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
              Meet the Masters of the Trail
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              Our Certified Field Captains
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
              The heart of Bengal Odyssey is our veteran team of mountain leads, wildlife probers, and marine expedition captains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAPTAINS_DATA.map((captain) => (
              <div
                key={captain.id}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/40 shadow-sm transition-all group"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full bg-stone-950 overflow-hidden">
                    <SafeImage
                      src={captain.avatar}
                      alt={captain.name}
                      fill
                      fallbackTitle={captain.name}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                        {captain.experience}
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {captain.name} ({captain.bengaliName})
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {captain.role}
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {captain.bio}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-100 dark:border-stone-800 mt-3 flex flex-wrap gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Dialects:</span>
                  {captain.dialects.map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Footer CTA: Ready to Walk the Trail? */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
            Start Your Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Ready to Walk the Trail?
          </h2>
          <p className="text-stone-200 text-sm sm:text-base max-w-xl mx-auto font-light">
            Whether you seek the misty heights of Sandakphu or the silent waters of the Sundarban delta, our captains are ready to guide you.
          </p>
          <div className="pt-2">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-amber-500/20 active:scale-95"
            >
              <span>Let&apos;s Go · Explore Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
