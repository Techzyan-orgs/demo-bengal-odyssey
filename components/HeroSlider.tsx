'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Calendar, MapPin, Search, ChevronRight, ArrowRight, ShieldCheck, Flame, Users, Sparkles, ChevronDown } from 'lucide-react';
import { DESTINATIONS_DATA } from '@/lib/travel-data';
import { SafeImage } from './SafeImage';

const HERO_SLIDES = [
  {
    title: 'From the Depths of Sundarbans to the Heights of Kanchenjunga',
    subheading: 'Traverse the wild tidal delta creeks, colonial tea hills, and panoramic 11,930-ft Himalayan summits with Kolkata’s premier certified captains.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=85',
    tag: 'Darjeeling Himalayan Railway & Kanchenjunga',
    gradient: 'from-amber-950/80 via-emerald-950/70 to-slate-950',
    destinationSlug: 'darjeeling-hills',
    ctaText: 'Explore Tea Hills & Rail',
  },
  {
    title: 'Tread Where the Royal Bengal Tiger Rules the Mangroves',
    subheading: 'Private wooden river cruiser safaris, caged canopy walks at Dobanki, and estuarine wildlife in the world’s largest mangrove biosphere.',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1920&q=85',
    tag: 'Sundarbans Biosphere Reserve',
    gradient: 'from-emerald-950/85 via-stone-900/70 to-slate-950',
    destinationSlug: 'sundarbans',
    ctaText: 'Discover Sundarban Safaris',
  },
  {
    title: 'Conquer Sandakphu: Stand Before the Grand Sleeping Buddha',
    subheading: 'Hike the Indo-Nepal mountain ridgeline where Kangchenjunga, Makalu, Lhotse, and Everest illuminate under golden alpine dawn.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=85',
    tag: 'Singalila Ridge · Sandakphu 11,930 ft',
    gradient: 'from-amber-950/85 via-stone-950/70 to-slate-950',
    destinationSlug: 'north-bengal-treks',
    ctaText: 'View Himalayan Treks',
  },
  {
    title: 'Untamed Dooars: Elephant Corridors & Rhino Grasslands',
    subheading: 'Morning elephant-back tracking in Jaldapara, Gorumara Jeep core safaris, and tranquil riverside evenings beside the Murti river.',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1920&q=85',
    tag: 'Dooars Terai Floodplains',
    gradient: 'from-teal-950/85 via-emerald-950/70 to-slate-950',
    destinationSlug: 'dooars-terai',
    ctaText: 'Experience Dooars Wildlife',
  },
  {
    title: 'Golden Sands of Mandarmani & Sacred Surf of Puri',
    subheading: 'Drive directly on Mandarmani’s vast firm coastline, explore Chilika dolphin waters, and snorkel off blue-flag Puri beaches.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
    tag: 'Bay of Bengal Coastal Escapes',
    gradient: 'from-blue-950/85 via-cyan-950/70 to-slate-950',
    destinationSlug: 'coastal-puri',
    ctaText: 'Book Coastal Weekend',
  },
];

export function HeroSlider() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');

  // Auto crossfade every 6.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedDestination !== 'all') params.set('destination', selectedDestination);
    if (selectedType !== 'all') params.set('type', selectedType);
    if (selectedSeason !== 'all') params.set('season', selectedSeason);
    router.push(`/packages?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[850px] lg:min-h-[calc(100dvh-5.5rem)] flex flex-col justify-between pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16 overflow-hidden bg-stone-950 text-white">
      {/* Background Crossfade Slides */}
      {HERO_SLIDES.map((item, index) => (
        <div
          key={item.tag}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          } transform transition-transform duration-[7000ms]`}
        >
          <SafeImage
            src={item.image}
            alt={item.title}
            fill
            priority={index === 0}
            fallbackTitle={item.tag}
            fallbackGradient={item.gradient}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
        </div>
      ))}

      {/* Main Hero Copy Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center py-6 sm:py-8">
        <div className="max-w-3xl space-y-6 animate-fade-in">
          {/* Badge & Location tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-xs text-amber-300 font-semibold shadow-sm mb-1">
            <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>{slide.tag}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] drop-shadow-md">
            {slide.title}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl font-normal drop-shadow">
            {slide.subheading}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-amber-500/30 active:scale-95"
            >
              <span>Let&apos;s Escape</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={`/packages?destination=${slide.destinationSlug}`}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/20 transition-all"
            >
              <span>{slide.ctaText}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Area: Slide indicators & Quick Trip Search Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 sm:mt-12">
        {/* Slide Indicators */}
        <div className="flex items-center gap-2 mb-4">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Quick Search Card */}
        <div className="bg-white/95 dark:bg-stone-900/90 backdrop-blur-xl border border-stone-200 dark:border-stone-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl transition-colors">
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Destination */}
            <div>
              <label htmlFor="hero-destination" className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-400 mb-1">
                Where to?
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-500 dark:text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="hero-destination"
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="w-full appearance-none bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs font-medium rounded-xl pl-9 pr-8 py-2.5 border border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors cursor-pointer"
                >
                  <option value="all">All Destinations (West Bengal & Hills)</option>
                  {DESTINATIONS_DATA.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Trip Type */}
            <div>
              <label htmlFor="hero-tripType" className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-400 mb-1">
                Trip Style
              </label>
              <div className="relative">
                <Compass className="w-4 h-4 text-stone-500 dark:text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="hero-tripType"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full appearance-none bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs font-medium rounded-xl pl-9 pr-8 py-2.5 border border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors cursor-pointer"
                >
                  <option value="all">Any Travel Style</option>
                  <option value="vacation-getaway">Vacation Getaway</option>
                  <option value="backpacking-trek">Backpacking Trek</option>
                  <option value="offbeat">Offbeat Exploration</option>
                  <option value="weekend-getaway">Weekend Getaway</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Travel Month / Season */}
            <div>
              <label htmlFor="hero-season" className="block text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-400 mb-1">
                Travel Window
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-stone-500 dark:text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="hero-season"
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full appearance-none bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs font-medium rounded-xl pl-9 pr-8 py-2.5 border border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors cursor-pointer"
                >
                  <option value="all">Any Upcoming Month</option>
                  <option value="nov">November (Peak Clear Mountain Vistas)</option>
                  <option value="dec">December (Winter Holidays & Basking Tigers)</option>
                  <option value="jan">January (Cool Delta & Coastal Chill)</option>
                  <option value="spring">March - May (Rhododendron Blooms)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer h-[38px]"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Expeditions</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
