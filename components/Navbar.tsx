'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, ChevronDown, Menu, X, Phone, Map, Mountain, Briefcase, Sun, Moon } from 'lucide-react';
import { DESTINATIONS_DATA, PACKAGES_DATA } from '@/lib/travel-data';
import { QuotationModal } from './QuotationModal';
import { useTheme } from './ThemeProvider';
import { WhatsAppIcon } from './WhatsAppIcon';

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDestOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDestOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close menus on route change during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
    setIsDestOpen(false);
  }

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMobileMenuOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      const target = document.getElementById('contact-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', '#contact-section');
      }
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
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
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md shadow-md border-b border-stone-200 dark:border-stone-800/80 py-2'
            : 'bg-stone-50/90 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/60 shadow-sm py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Line: Brand Wordmark (Left) + WhatsApp & Plan Trip CTAs (Right) */}
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-2.5 text-stone-900 dark:text-white group whitespace-nowrap shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-amber-600 flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform">
                <Compass className="w-5 h-5 text-amber-200" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-stone-900 dark:text-white flex items-center gap-1.5">
                  Bengal Odyssey
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium text-amber-700 dark:text-amber-300/90 tracking-widest uppercase">
                  বঙ্গ অভিযান · Kolkata
                </span>
              </div>
            </Link>

            {/* Direct CTA Action (Theme Toggle + WhatsApp + Plan Trip + Mobile Menu Toggle) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* THEME TOGGLE BUTTON - ON THE LEFT OF THE WHATSAPP NUMBER */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800/80 dark:hover:bg-stone-700/80 border border-stone-200 dark:border-stone-700/60 transition-all shadow-sm active:scale-95 cursor-pointer"
                aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600 transition-transform hover:-rotate-12" />
                )}
              </button>

              <a
                href="https://wa.me/919830123456"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-emerald-700 dark:bg-stone-800/80 dark:hover:bg-stone-700/80 dark:text-emerald-400 text-xs font-semibold border border-stone-200 dark:border-stone-700/60 transition-colors shadow-sm"
                title="Chat with Expedition Lead on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-mono text-xs">+91 98301 23456</span>
              </a>

              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-amber-500/20 active:scale-95 whitespace-nowrap"
              >
                <Map className="w-3.5 h-3.5 shrink-0" />
                <span>Plan Trip</span>
              </button>

              {/* Mobile menu toggle button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>

          {/* Lower Line: Dedicated Navigation Links (Desktop lg+) */}
          <nav className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-3 pt-2 mt-2 border-t border-stone-200 dark:border-stone-800/70 text-[13px] font-medium text-stone-600 dark:text-stone-300 relative z-30">
            <Link
              href="/"
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/40 ${
                pathname === '/' ? 'text-amber-600 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-stone-800/60' : ''
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/40 ${
                pathname === '/about' ? 'text-amber-600 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-stone-800/60' : ''
              }`}
            >
              About
            </Link>

            {/* Destination Dropdown (Click-Only) */}
            <div
              className="relative"
              ref={dropdownRef}
            >
              <button
                type="button"
                onClick={() => setIsDestOpen((prev) => !prev)}
                className={`whitespace-nowrap flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/40 focus:outline-none cursor-pointer ${
                  isDestOpen ? 'text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-stone-800/60 font-semibold' : ''
                }`}
                aria-expanded={isDestOpen}
              >
                <span>Destinations</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDestOpen ? 'rotate-180 text-amber-600 dark:text-amber-300' : ''}`} />
              </button>

              {isDestOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white/98 dark:bg-stone-900/98 backdrop-blur-xl border border-stone-200 dark:border-stone-700/80 shadow-2xl p-2 z-50 animate-fade-in text-xs">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider border-b border-stone-200 dark:border-stone-800">
                    Explore West Bengal & Beyond
                  </div>
                  {DESTINATIONS_DATA.map((dest) => (
                    <Link
                      key={dest.id}
                      href={`/packages?destination=${dest.slug}`}
                      className="flex flex-col px-3 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 transition-colors group"
                      onClick={() => setIsDestOpen(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-300">
                          {dest.title}
                        </span>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                          {PACKAGES_DATA.filter((p) => p.destination === dest.id).length} tours
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                        {dest.bengaliTitle} · {dest.highlight}
                      </span>
                    </Link>
                  ))}
                  <div className="mt-1 pt-1 border-t border-stone-200 dark:border-stone-800">
                    <Link
                      href="/packages"
                      className="block px-3 py-1.5 text-center text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-semibold text-xs"
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
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/40 ${
                pathname === '/packages' ? 'text-amber-600 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-stone-800/60' : ''
              }`}
            >
              Packages
            </Link>

            {/* HIGHLIGHTED: Backpacking Treks */}
            <Link
              href="/packages?type=backpacking-trek"
              className="group whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/15 dark:to-orange-500/15 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 border border-amber-500/30 dark:border-amber-500/50 hover:border-amber-500 hover:bg-amber-500/20 transition-all shadow-sm"
              title="Featured Backpacking & Himalayan Treks"
            >
              <Mountain className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>Backpacking Treks</span>
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </Link>

            {/* HIGHLIGHTED: Corporate Travels */}
            <Link
              href="/corporate"
              className={`group whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-sm ${
                pathname === '/corporate'
                  ? 'bg-sky-100 dark:bg-sky-500/25 text-sky-800 dark:text-sky-200 border border-sky-400 shadow-sm'
                  : 'bg-gradient-to-r from-sky-500/10 to-blue-500/10 dark:from-sky-500/15 dark:to-blue-500/15 text-sky-700 dark:text-sky-300 hover:text-sky-900 dark:hover:text-sky-200 border border-sky-500/30 dark:border-sky-500/50 hover:border-sky-500 hover:bg-sky-500/20'
              }`}
              title="Corporate Retreats & Offsites (B2B)"
            >
              <Briefcase className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>Corporate Travels</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-200/80 dark:bg-sky-500/30 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-400/40">
                B2B
              </span>
            </Link>

            <Link
              href="/best-season"
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/40 ${
                pathname === '/best-season' ? 'text-amber-600 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-stone-800/60' : ''
              }`}
            >
              Best Season
            </Link>

            <Link
              href="/gallery"
              className={`whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/40 ${
                pathname === '/gallery' ? 'text-amber-600 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-stone-800/60' : ''
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/#contact-section"
              onClick={handleContactClick}
              className="whitespace-nowrap px-2.5 py-1 rounded-lg transition-colors hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/40 text-stone-600 dark:text-stone-300 cursor-pointer"
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Mobile slide-over navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-stone-50/98 dark:bg-stone-950/98 border-b border-stone-200 dark:border-stone-800 px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto animate-fade-in text-sm text-stone-900 dark:text-stone-100">
            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Theme
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
                <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
              </button>
            </div>

            <div className="space-y-1">
              <Link
                href="/"
                className="block py-2 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-300 font-medium"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block py-2 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-300 font-medium"
              >
                About
              </Link>
              <Link
                href="/packages"
                className="block py-2 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-300 font-medium"
              >
                All Packages
              </Link>

              {/* Highlighted in Mobile Menu */}
              <Link
                href="/packages?type=backpacking-trek"
                className="flex items-center justify-between py-2.5 px-3 my-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Backpacking Treks</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 uppercase font-bold tracking-wider">
                  Featured
                </span>
              </Link>

              <Link
                href="/corporate"
                className="flex items-center justify-between py-2.5 px-3 my-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>Corporate Travels</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-800 dark:text-sky-300 uppercase font-bold tracking-wider">
                  B2B
                </span>
              </Link>

              <Link
                href="/best-season"
                className="block py-2 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-300 font-medium"
              >
                Best Season Guide
              </Link>
              <Link
                href="/gallery"
                className="block py-2 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-300 font-medium"
              >
                Photo Gallery
              </Link>
              <Link
                href="/#contact-section"
                onClick={handleContactClick}
                className="block py-2 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-300 font-medium cursor-pointer"
              >
                Contact Us
              </Link>
            </div>

            {/* Destinations subset in mobile */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
              <div className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold mb-2">
                Destinations Directory
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {DESTINATIONS_DATA.map((dest) => (
                  <Link
                    key={dest.id}
                    href={`/packages?destination=${dest.slug}`}
                    className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300 hover:border-amber-500/40"
                  >
                    {dest.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsQuoteModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-center text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Map className="w-4 h-4 shrink-0" />
                <span>Plan Custom Trip & Quotation</span>
              </button>

              <a
                href="https://wa.me/919830123456"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-center text-xs flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
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
