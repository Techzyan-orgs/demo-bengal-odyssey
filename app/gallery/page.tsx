'use client';

import React, { useState } from 'react';
import { Camera, MapPin, X, User, Sparkles, ZoomIn } from 'lucide-react';
import { GALLERY_PHOTOS } from '@/lib/travel-data';
import { SafeImage } from '@/components/SafeImage';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<typeof GALLERY_PHOTOS[0] | null>(null);

  const categories = [
    'All',
    'Wildlife & Jungles',
    'Mountain Treks',
    'Coastal Serenity',
    'Cultural & Heritage',
  ];

  const filteredPhotos =
    selectedCategory === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-24 pb-20 bg-stone-950 text-stone-100 min-h-screen">
      {/* Header */}
      <section className="border-b border-stone-800 py-14 bg-stone-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20 mb-3">
            <Camera className="w-3.5 h-3.5" />
            Field Photography Archives
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            The Bengal Odyssey Visual Chronicle
          </h1>
          <p className="text-sm text-stone-300 mt-2 font-light">
            Real field captures from our expedition leaders, trek photographers, and guest naturalists across the wilderness of West Bengal.
          </p>

          {/* Categorization Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="relative break-inside-avoid rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`relative w-full ${photo.aspect}`}>
                <SafeImage
                  src={photo.url}
                  alt={photo.title}
                  fill
                  fallbackTitle={photo.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white" />

                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    {photo.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {photo.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-stone-300 mt-2 pt-2 border-t border-white/20">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {photo.location}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-amber-300">
                      <ZoomIn className="w-3 h-3" />
                      View
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] max-h-[75vh] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <SafeImage
                src={activePhoto.url}
                alt={activePhoto.title}
                fill
                fallbackTitle={activePhoto.title}
                className="object-contain bg-black"
              />
            </div>

            {/* Lightbox Caption Strip */}
            <div className="w-full mt-4 p-4 rounded-xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 block">
                  {activePhoto.category}
                </span>
                <h3 className="text-base font-bold text-white">
                  {activePhoto.title}
                </h3>
                <span className="text-stone-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {activePhoto.location}
                </span>
              </div>

              <div className="sm:text-right">
                <span className="text-stone-400 block">Expedition Photographer:</span>
                <span className="font-semibold text-amber-300">
                  {activePhoto.photographer} · Bengal Odyssey Field Dispatch
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
