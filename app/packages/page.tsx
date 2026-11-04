'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Filter, SlidersHorizontal, X, RotateCcw, Check, ArrowUpDown, ChevronDown } from 'lucide-react';
import { DestinationAccordion } from '@/components/DestinationAccordion';
import { PackageCard } from '@/components/PackageCard';
import { PACKAGES_DATA, DESTINATIONS_DATA } from '@/lib/travel-data';
import { filterPackages, formatINR } from '@/lib/travel-logic';

function PackagesExplorerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initial params
  const initialDestination = searchParams.get('destination') || 'all';
  const initialType = searchParams.get('type') || '';
  const initialUpcoming = searchParams.get('upcoming') === 'true';

  // Filters state
  const [activeDestination, setActiveDestination] = useState<string>(initialDestination);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialType ? [initialType] : []);
  const [durationCategory, setDurationCategory] = useState<'all' | '1-2' | '3-5' | '6+'>('all');
  const [priceMax, setPriceMax] = useState<number>(30000);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [onlyUpcoming, setOnlyUpcoming] = useState(initialUpcoming);
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [onlyTopRated, setOnlyTopRated] = useState(false);
  const [onlyLuxury, setOnlyLuxury] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'rating' | 'duration'>('recommended');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync with searchParams if URL query changes during render
  const currentParamsKey = searchParams.toString();
  const [prevParamsKey, setPrevParamsKey] = useState(currentParamsKey);
  if (prevParamsKey !== currentParamsKey) {
    setPrevParamsKey(currentParamsKey);
    const dest = searchParams.get('destination');
    if (dest) setActiveDestination(dest);
    const type = searchParams.get('type');
    if (type) setSelectedTypes([type]);
    if (searchParams.get('upcoming') === 'true') setOnlyUpcoming(true);
  }

  // Trip Types definition
  const tripTypeOptions = [
    { id: 'vacation-getaway', label: 'Vacation Getaway' },
    { id: 'backpacking-trek', label: 'Backpacking Trek' },
    { id: 'offbeat', label: 'Offbeat Exploration' },
    { id: 'weekend-getaway', label: 'Weekend Getaway' },
  ];

  // Interest tags
  const interestTags = [
    'Hills',
    'Wildlife',
    'Trekking',
    'Beach',
    'Heritage',
    'Scuba Diving',
    'Luxury Resorts',
    'Campfire',
  ];

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId]
    );
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setActiveDestination('all');
    setSearchQuery('');
    setSelectedTypes([]);
    setDurationCategory('all');
    setPriceMax(30000);
    setSelectedTags([]);
    setOnlyDeals(false);
    setOnlyUpcoming(false);
    setOnlyFeatured(false);
    setOnlyTopRated(false);
    setOnlyLuxury(false);
    router.push('/packages');
  };

  // Dynamic counts for each destination corridor matching currently active filters
  const { corridorCounts, totalAvailable } = useMemo(() => {
    const counts: Record<string, number> = {};

    DESTINATIONS_DATA.forEach((dest) => {
      const match = filterPackages(PACKAGES_DATA, {
        destination: dest.id,
        searchQuery,
        tripTypes: selectedTypes.length > 0 ? selectedTypes : undefined,
        durationCategory,
        maxPrice: priceMax < 30000 ? priceMax : undefined,
        selectedTags: selectedTags.length > 0 ? selectedTags : undefined,
        onlyDeals,
        onlyUpcoming,
        onlyFeatured,
        onlyTopRated,
        onlyLuxury,
      });
      counts[dest.id] = match.length;
    });

    const allMatch = filterPackages(PACKAGES_DATA, {
      destination: 'all',
      searchQuery,
      tripTypes: selectedTypes.length > 0 ? selectedTypes : undefined,
      durationCategory,
      maxPrice: priceMax < 30000 ? priceMax : undefined,
      selectedTags: selectedTags.length > 0 ? selectedTags : undefined,
      onlyDeals,
      onlyUpcoming,
      onlyFeatured,
      onlyTopRated,
      onlyLuxury,
    });

    return { corridorCounts: counts, totalAvailable: allMatch.length };
  }, [
    searchQuery,
    selectedTypes,
    durationCategory,
    priceMax,
    selectedTags,
    onlyDeals,
    onlyUpcoming,
    onlyFeatured,
    onlyTopRated,
    onlyLuxury,
  ]);

  // Filtered packages
  const filteredList = useMemo(() => {
    let result = filterPackages(PACKAGES_DATA, {
      destination: activeDestination,
      searchQuery,
      tripTypes: selectedTypes.length > 0 ? selectedTypes : undefined,
      durationCategory,
      maxPrice: priceMax < 30000 ? priceMax : undefined,
      selectedTags: selectedTags.length > 0 ? selectedTags : undefined,
      onlyDeals,
      onlyUpcoming,
      onlyFeatured,
      onlyTopRated,
      onlyLuxury,
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => (a.discountPrice || a.basePrice) - (b.discountPrice || b.basePrice));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => (b.discountPrice || b.basePrice) - (a.discountPrice || a.basePrice));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'duration') {
      result.sort((a, b) => a.days - b.days);
    }

    return result;
  }, [
    activeDestination,
    searchQuery,
    selectedTypes,
    durationCategory,
    priceMax,
    selectedTags,
    onlyDeals,
    onlyUpcoming,
    onlyFeatured,
    onlyTopRated,
    onlyLuxury,
    sortBy,
  ]);

  const activeDestinationObject = DESTINATIONS_DATA.find((d) => d.slug === activeDestination);

  return (
    <div className="pt-8 sm:pt-12 pb-20 bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 min-h-screen transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold mb-1">
              Bengal Odyssey Tour Directory
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
              Expedition Packages & Trek Batches
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              Curated journeys across West Bengal hills, tidal mangrove forests, and coastal dunes.
            </p>
          </div>

          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-900 dark:text-white hover:bg-stone-100 dark:hover:bg-stone-700 self-start shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Filters & Search ({filteredList.length})</span>
          </button>
        </div>

        {/* 1. Accordion Destination Strip */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Select Geographic Corridor
            </span>
            {activeDestination !== 'all' && (
              <button
                onClick={() => setActiveDestination('all')}
                className="text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 hover:underline font-medium"
              >
                Clear Destination Filter
              </button>
            )}
          </div>
          <DestinationAccordion
            activeDestination={activeDestination}
            onSelectDestination={(slug) => setActiveDestination(slug)}
            destinationCounts={corridorCounts}
            totalAllPackages={totalAvailable}
          />
        </div>

        {/* 2. Main Explorer: Sidebar Filter + Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 space-y-6 sticky top-24 shadow-sm transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2 font-bold text-sm text-stone-900 dark:text-white">
                <Filter className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Refine Search</span>
              </div>
              <button
                onClick={handleClearFilters}
                className="text-xs text-stone-500 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 flex items-center gap-1 transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Live Search */}
            <div>
              <label htmlFor="filter-search" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1.5">
                Search Tours
              </label>
              <div className="relative">
                <input
                  id="filter-search"
                  type="text"
                  placeholder="e.g. Tiger, Sandakphu, Tea..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white rounded-xl px-3 py-2.5 pl-8 border border-stone-300 dark:border-stone-700 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                />
                <Search className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400 absolute left-2.5 top-3" />
              </div>
            </div>

            {/* Quick Toggle Checks */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                Quick Highlights
              </span>
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer hover:text-stone-900 dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={onlyFeatured}
                  onChange={(e) => setOnlyFeatured(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0 bg-stone-50 dark:bg-stone-950 border-stone-300 dark:border-stone-700"
                />
                <span className="flex items-center gap-1.5">
                  Featured Expeditions
                </span>
              </label>
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer hover:text-stone-900 dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={onlyTopRated}
                  onChange={(e) => setOnlyTopRated(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0 bg-stone-50 dark:bg-stone-950 border-stone-300 dark:border-stone-700"
                />
                <span className="flex items-center gap-1.5">
                  Top Rated (4.9+ ★)
                </span>
              </label>
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer hover:text-stone-900 dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={onlyLuxury}
                  onChange={(e) => setOnlyLuxury(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0 bg-stone-50 dark:bg-stone-950 border-stone-300 dark:border-stone-700"
                />
                <span className="flex items-center gap-1.5">
                  Luxury & Heritage Stays
                </span>
              </label>
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer hover:text-stone-900 dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={onlyUpcoming}
                  onChange={(e) => setOnlyUpcoming(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0 bg-stone-50 dark:bg-stone-950 border-stone-300 dark:border-stone-700"
                />
                <span>Confirmed Upcoming Batches</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer hover:text-stone-900 dark:hover:text-white">
                <input
                  type="checkbox"
                  checked={onlyDeals}
                  onChange={(e) => setOnlyDeals(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-0 bg-stone-50 dark:bg-stone-950 border-stone-300 dark:border-stone-700"
                />
                <span>Special Early-Bird Deals</span>
              </label>
            </div>

            {/* Trip Types Checkboxes */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
              <span className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                Trip Style
              </span>
              <div className="space-y-2">
                {tripTypeOptions.map((type) => (
                  <label
                    key={type.id}
                    className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer hover:text-stone-900 dark:hover:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type.id)}
                      onChange={() => handleTypeToggle(type.id)}
                      className="rounded text-amber-500 focus:ring-0 bg-stone-50 dark:bg-stone-950 border-stone-300 dark:border-stone-700 mt-0.5"
                    />
                    <div className="flex flex-col">
                      <span>{type.label}</span>
                      {type.id === 'weekend-getaway' && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                          Departs Fri/Sat · Ends Sun/Mon
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
              <span className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                Duration
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'Any' },
                  { id: '1-2', label: '1 - 2 Days' },
                  { id: '3-5', label: '3 - 5 Days' },
                  { id: '6+', label: '6+ Days' },
                ].map((dur) => (
                  <button
                    key={dur.id}
                    type="button"
                    onClick={() => setDurationCategory(dur.id as any)}
                    className={`py-1.5 px-2 rounded-lg text-center transition-all ${
                      durationCategory === dur.id
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-950 text-stone-700 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    {dur.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Max Budget
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {priceMax >= 30000 ? 'All Budgets (₹30,000+)' : formatINR(priceMax)}
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="30000"
                step="500"
                value={priceMax}
                onChange={(e) => setPriceMax(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-stone-200 dark:bg-stone-800 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 dark:text-stone-400 mt-1">
                <span>₹3,000</span>
                <span>₹30,000+</span>
              </div>
            </div>

            {/* Interest Tags */}
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
              <span className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                Trip Interests
              </span>
              <div className="flex flex-wrap gap-1.5">
                {interestTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-950 text-stone-700 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border border-stone-200 dark:border-stone-800'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Packages Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Result Count, Active Filter Chips, Sort Dropdown */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm transition-colors">
              <div>
                <span className="text-sm font-bold text-stone-900 dark:text-white">
                  Showing {filteredList.length} of {PACKAGES_DATA.length} Expeditions
                </span>
                {activeDestinationObject && (
                  <span className="text-xs text-amber-600 dark:text-amber-400 ml-2 font-medium">
                    in {activeDestinationObject.title}
                  </span>
                )}
              </div>

              {/* Sort By selector */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs text-stone-500 dark:text-stone-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white text-xs font-medium rounded-lg px-2.5 py-1.5 border border-stone-300 dark:border-stone-700 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                >
                  <option value="recommended">Featured & Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated Captains</option>
                  <option value="duration">Trip Duration</option>
                </select>
              </div>
            </div>

            {/* Active filter chips */}
            {(activeDestination !== 'all' ||
              searchQuery ||
              selectedTypes.length > 0 ||
              selectedTags.length > 0 ||
              durationCategory !== 'all' ||
              priceMax < 30000 ||
              onlyDeals ||
              onlyUpcoming ||
              onlyFeatured ||
              onlyTopRated ||
              onlyLuxury) && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-stone-500 dark:text-stone-400">Active Filters:</span>

                {activeDestination !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    Destination: {activeDestinationObject?.title}
                    <button onClick={() => setActiveDestination('all')} className="hover:text-stone-950 dark:hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {priceMax < 30000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                    Budget: Up to {formatINR(priceMax)}
                    <button onClick={() => setPriceMax(30000)} className="hover:text-stone-950 dark:hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                    &quot;{searchQuery}&quot;
                    <button onClick={() => setSearchQuery('')} className="hover:text-stone-950 dark:hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {onlyFeatured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-medium">
                    Featured
                    <button onClick={() => setOnlyFeatured(false)} className="hover:text-stone-950 dark:hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {onlyTopRated && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-yellow-500/15 text-yellow-800 dark:text-yellow-300 border border-yellow-500/30 font-medium">
                    Top Rated (4.9+ ★)
                    <button onClick={() => setOnlyTopRated(false)} className="hover:text-stone-950 dark:hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {onlyLuxury && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-500/30 font-medium">
                    Luxury & Heritage
                    <button onClick={() => setOnlyLuxury(false)} className="hover:text-stone-950 dark:hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {onlyUpcoming && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-800 dark:text-blue-300 border border-blue-500/30 font-medium">
                    Upcoming Batches
                    <button onClick={() => setOnlyUpcoming(false)} className="hover:text-stone-950 dark:hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {onlyDeals && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/30 font-medium">
                    Early-Bird Deals
                    <button onClick={() => setOnlyDeals(false)} className="hover:text-stone-950 dark:hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60"
                  >
                    {type}
                    <button onClick={() => handleTypeToggle(type)} className="hover:text-stone-950 dark:hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700"
                  >
                    #{tag}
                    <button onClick={() => handleTagToggle(tag)} className="hover:text-stone-950 dark:hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                <button
                  onClick={handleClearFilters}
                  className="text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Packages Grid */}
            {filteredList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredList.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} showVacancy={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 space-y-4 shadow-sm">
                <Search className="w-12 h-12 text-stone-400 dark:text-stone-600 mx-auto" />
                <h3 className="text-lg font-bold text-stone-900 dark:text-white">No Matching Expeditions Found</h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                  Try clearing your search query or adjusting your filters to explore more of our Bengal tour packages.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Modal Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto p-6 space-y-6 text-stone-900 dark:text-stone-100 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-base text-stone-900 dark:text-white">Refine Expeditions</h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 rounded-full text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div>
              <label htmlFor="filter-mobile-search" className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                Search
              </label>
              <input
                id="filter-mobile-search"
                type="text"
                placeholder="Search package name, trek..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-950 text-xs text-stone-900 dark:text-white rounded-xl px-3 py-2 border border-stone-300 dark:border-stone-700 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400"
              />
            </div>

            {/* Quick Highlights */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-1">
                Quick Highlights
              </span>
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyFeatured}
                  onChange={(e) => setOnlyFeatured(e.target.checked)}
                  className="rounded text-amber-500"
                />
                <span>Featured Expeditions</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyTopRated}
                  onChange={(e) => setOnlyTopRated(e.target.checked)}
                  className="rounded text-amber-500"
                />
                <span>Top Rated (4.9+ ★)</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyLuxury}
                  onChange={(e) => setOnlyLuxury(e.target.checked)}
                  className="rounded text-amber-500"
                />
                <span>Luxury & Heritage Stays</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyUpcoming}
                  onChange={(e) => setOnlyUpcoming(e.target.checked)}
                  className="rounded text-amber-500"
                />
                <span>Confirmed Upcoming Batches</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyDeals}
                  onChange={(e) => setOnlyDeals(e.target.checked)}
                  className="rounded text-amber-500"
                />
                <span>Special Early-Bird Deals</span>
              </label>
            </div>

            {/* Trip Types */}
            <div>
              <span className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                Trip Style
              </span>
              <div className="space-y-2">
                {tripTypeOptions.map((type) => (
                  <label key={type.id} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type.id)}
                      onChange={() => handleTypeToggle(type.id)}
                      className="rounded text-amber-500 mt-0.5"
                    />
                    <div className="flex flex-col">
                      <span>{type.label}</span>
                      {type.id === 'weekend-getaway' && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                          Departs Fri/Sat · Ends Sun/Mon
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <span className="block text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                Duration
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'all', label: 'Any' },
                  { id: '1-2', label: '1 - 2 Days' },
                  { id: '3-5', label: '3 - 5 Days' },
                  { id: '6+', label: '6+ Days' },
                ].map((dur) => (
                  <button
                    key={dur.id}
                    onClick={() => setDurationCategory(dur.id as any)}
                    className={`py-2 px-3 rounded-lg text-center ${
                      durationCategory === dur.id ? 'bg-amber-500 text-stone-950 font-bold shadow-sm' : 'bg-stone-100 dark:bg-stone-950 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    {dur.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider (Mobile) */}
            <div>
              <div className="flex justify-between items-center mb-1.5 text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Max Budget
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {priceMax >= 30000 ? 'All Budgets (₹30,000+)' : formatINR(priceMax)}
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="30000"
                step="500"
                value={priceMax}
                onChange={(e) => setPriceMax(parseInt(e.target.value))}
                className="w-full accent-amber-500 bg-stone-200 dark:bg-stone-800 h-1.5 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 dark:text-stone-400 mt-1">
                <span>₹3,000</span>
                <span>₹30,000+</span>
              </div>
            </div>

            {/* Apply & Close */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex gap-3">
              <button
                onClick={handleClearFilters}
                className="flex-1 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                Apply Filters ({filteredList.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-white flex items-center justify-center">Loading Bengal Expeditions...</div>}>
      <PackagesExplorerContent />
    </Suspense>
  );
}
