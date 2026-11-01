import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Award, HeartHandshake, MapPin, Sparkles, Clock, Flame } from 'lucide-react';
import { HeroSlider } from '@/components/HeroSlider';
import { PackageCard } from '@/components/PackageCard';
import { ContactSection } from '@/components/ContactSection';
import { PACKAGES_DATA, DESTINATIONS_DATA } from '@/lib/travel-data';

export default function HomePage() {
  // Filter upcoming departures sorted by departure date
  const upcomingPackages = [...PACKAGES_DATA]
    .filter((pkg) => pkg.isUpcoming)
    .sort((a, b) => new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());

  // Featured flagship tours
  const featuredPackages = PACKAGES_DATA.filter((pkg) => pkg.featured);

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 transition-colors duration-200">
      {/* 1. Hero Dynamic Slider Section */}
      <HeroSlider />

      {/* 2. Key Metrics & Value Bar */}
      <section className="bg-stone-100 dark:bg-stone-900 border-y border-stone-200 dark:border-stone-800 py-10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                12+
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-stone-800 dark:text-stone-200">
                Years Operating
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Pioneering West Bengal expeditions since 2014</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                350+
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-stone-800 dark:text-stone-200">
                Treks Completed
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Zero major altitude incidents on Singalila ridge</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                40+
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-stone-800 dark:text-stone-200">
                Curated Destinations
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">From mangrove creeks to 11,930-ft summits</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl lg:text-4xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                25+
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-stone-800 dark:text-stone-200">
                Certified Local Captains
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">HMI instructors, forest guides & marine divers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Upcoming Departures Section */}
      <section className="py-20 bg-stone-50 dark:bg-stone-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-wider border border-red-500/20 mb-2">
                <Flame className="w-3.5 h-3.5" />
                Live Fixed Departures
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
                Upcoming Departure Batches
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-xl">
                Confirmed group departures leaving in the next few days. Guaranteed departures with certified captains and immediate seat locking.
              </p>
            </div>

            <Link
              href="/packages?upcoming=true"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors uppercase tracking-wider whitespace-nowrap self-start md:self-end"
            >
              <span>View All Upcoming Batches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} showVacancy={true} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Destination Highlights Strip */}
      <section className="py-16 bg-stone-100/70 dark:bg-stone-900/60 border-y border-stone-200 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
              Sea to Summit
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              West Bengal’s Diverse Geographic Terrains
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DESTINATIONS_DATA.map((dest) => (
              <Link
                key={dest.id}
                href={`/packages?destination=${dest.slug}`}
                className="group p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 dark:hover:border-amber-500/50 shadow-sm transition-all flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mb-1">
                    {dest.totalPackages} Tours
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                    {dest.title}
                  </h3>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {dest.bengaliTitle}
                  </div>
                </div>
                <div className="mt-4 text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1 group-hover:text-stone-800 dark:group-hover:text-stone-200">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Flagship Packages Section */}
      <section className="py-20 bg-stone-50 dark:bg-stone-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Curated Flagship Experiences
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
                Featured Bengal Odyssey Tours
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-xl">
                Handcrafted itineraries combining colonial luxury, deep wildlife tracking, and premier high-altitude trekking trails.
              </p>
            </div>

            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors uppercase tracking-wider whitespace-nowrap self-start md:self-end"
            >
              <span>Explore All {PACKAGES_DATA.length} Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} showVacancy={false} />
            ))}
          </div>

          {/* Bottom Anchor CTA */}
          <div className="mt-14 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-amber-500/20 active:scale-95"
            >
              <span>Explore All Packages & Custom Filters</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Contact & Instant Quote Section */}
      <ContactSection />
    </div>
  );
}
