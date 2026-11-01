'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, ChevronDown, Menu, X, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { DESTINATIONS_DATA } from '@/lib/travel-data';
import { QuotationModal } from './QuotationModal';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDestOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
    setIsDestOpen(false);
  }

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Packages', href: '/packages' },
    { label: 'Backpacking Treks', href: '/packages?type=backpacking-trek' },
    { label: 'Corporate Travels', href: '/corporate' },
    { label: 'Best Season', href: '/best-season' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact Us', href: '/#contact-section' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-900/95 backdrop-blur-md shadow-md py-3 border-b border-stone-800'
            : 'bg-gradient-to-b from-stone-950/80 via-stone-950/50 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-2.5 text-white group whitespace-nowrap shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-amber-600 flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform">
                <Compass className="w-5 h-5 text-amber-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  Bengal Odyssey
                </span>
                <span className="text-[10px] font-medium text-amber-300/90 tracking-widest uppercase">
                  বঙ্গ অভিযান · Kolkata
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-5 text-[13px] font-medium text-stone-200">
              <Link
                href="/"
                className={`transition-colors hover:text-amber-300 ${
                  pathname === '/' ? 'text-amber-300 font-semibold' : ''
                }`}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={`transition-colors hover:text-amber-300 ${
                  pathname === '/about' ? 'text-amber-300 font-semibold' : ''
                }`}
              >
                About Us
              </Link>

              {/* Destination Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDestOpen(!isDestOpen)}
                  className="flex items-center gap-1 transition-colors hover:text-amber-300 focus:outline-none py-1"
                  aria-expanded={isDestOpen}
                >
                  <span>Destinations</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDestOpen ? 'rotate-180 text-amber-300' : ''}`} />
                </button>

                {isDestOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-stone-900/95 backdrop-blur-xl border border-stone-700/80 shadow-2xl p-2 z-50 animate-fade-in text-xs">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-800">
                      Explore West Bengal & Beyond
                    </div>
                    {DESTINATIONS_DATA.map((dest) => (
                      <Link
                        key={dest.id}
                        href={`/packages?destination=${dest.slug}`}
                        className="flex flex-col px-3 py-2 rounded-xl hover:bg-stone-800/80 transition-colors group"
                        onClick={() => setIsDestOpen(false)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-stone-100 group-hover:text-amber-300">
                            {dest.title}
                          </span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {dest.totalPackages} tours
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">
                          {dest.bengaliTitle} · {dest.highlight}
                        </span>
                      </Link>
                    ))}
                    <div className="mt-1 pt-1 border-t border-stone-800">
                      <Link
                        href="/packages"
                        className="block px-3 py-1.5 text-center text-amber-400 hover:text-amber-300 font-semibold text-xs"
                        onClick={() => setIsDestOpen(false)}
                      >
                        View All Packages Directory →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/packages"
                className={`transition-colors hover:text-amber-300 ${
                  pathname === '/packages' ? 'text-amber-300 font-semibold' : ''
                }`}
              >
                Packages
              </Link>

              <Link
                href="/packages?type=backpacking-trek"
                className="transition-colors hover:text-amber-300 text-stone-200"
              >
                Backpacking Treks
              </Link>

              <Link
                href="/corporate"
                className={`transition-colors hover:text-amber-300 ${
                  pathname === '/corporate' ? 'text-amber-300 font-semibold' : ''
                }`}
              >
                Corporate Travels
              </Link>

              <Link
                href="/best-season"
                className={`transition-colors hover:text-amber-300 ${
                  pathname === '/best-season' ? 'text-amber-300 font-semibold' : ''
                }`}
              >
                Best Season
              </Link>

              <Link
                href="/gallery"
                className={`transition-colors hover:text-amber-300 ${
                  pathname === '/gallery' ? 'text-amber-300 font-semibold' : ''
                }`}
              >
                Gallery
              </Link>

              <Link
                href="/#contact-section"
                className="transition-colors hover:text-amber-300"
              >
                Contact Us
              </Link>
            </nav>

            {/* Direct CTA Action */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://wa.me/919830123456"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 text-emerald-400 text-xs font-semibold border border-stone-700/60 transition-colors"
                title="Chat with Expedition Lead on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="hidden lg:inline">+91 98301 23456</span>
              </a>

              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-amber-500/20 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Plan Trip</span>
              </button>

              {/* Mobile menu toggle button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile slide-over navigation */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-stone-950/98 border-b border-stone-800 px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto animate-fade-in text-sm">
            <div className="space-y-1">
              <Link
                href="/"
                className="block py-2 text-stone-200 hover:text-amber-300 font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block py-2 text-stone-200 hover:text-amber-300 font-medium"
              >
                About Us
              </Link>
              <Link
                href="/packages"
                className="block py-2 text-stone-200 hover:text-amber-300 font-medium"
              >
                All Packages
              </Link>
              <Link
                href="/packages?type=backpacking-trek"
                className="block py-2 text-stone-200 hover:text-amber-300 font-medium"
              >
                Backpacking Treks
              </Link>
              <Link
                href="/corporate"
                className="block py-2 text-stone-200 hover:text-amber-300 font-medium"
              >
                Corporate Travels (B2B)
              </Link>
              <Link
                href="/best-season"
                className="block py-2 text-stone-200 hover:text-amber-300 font-medium"
              >
                Best Season Guide
              </Link>
              <Link
                href="/gallery"
                className="block py-2 text-stone-200 hover:text-amber-300 font-medium"
              >
                Photo Gallery
              </Link>
              <Link
                href="/#contact-section"
                className="block py-2 text-stone-200 hover:text-amber-300 font-medium"
              >
                Contact Us
              </Link>
            </div>

            {/* Destinations subset in mobile */}
            <div className="pt-3 border-t border-stone-800">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                Destinations Directory
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {DESTINATIONS_DATA.map((dest) => (
                  <Link
                    key={dest.id}
                    href={`/packages?destination=${dest.slug}`}
                    className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 hover:text-amber-300 hover:border-amber-500/40"
                  >
                    {dest.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsQuoteModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-center text-xs uppercase tracking-wider"
              >
                Plan Custom Trip & Quotation
              </button>

              <a
                href="https://wa.me/919830123456"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-center text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 98301 23456)</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Quotation Modal */}
      <QuotationModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
