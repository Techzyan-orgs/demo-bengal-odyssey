'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, MapPin, Phone, Mail, MessageCircle, ShieldCheck, Heart } from 'lucide-react';
import { DESTINATIONS_DATA } from '@/lib/travel-data';

export function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Top Value Banner */}
      <div className="border-b border-stone-800/80 bg-stone-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-100 text-sm">HMI Certified Captains</h4>
                <p className="text-stone-400 mt-0.5">
                  Led by certified Himalayan mountaineers and veteran mangrove naturalists.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-100 text-sm">Transparent Inclusions</h4>
                <p className="text-stone-400 mt-0.5">
                  All forest permits, safari vehicles, and luxury accommodations included upfront.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-100 text-sm">Leave No Trace Tourism</h4>
                <p className="text-stone-400 mt-0.5">
                  100% plastic-neutral Singalila trekking and community-funded delta schools.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-stone-100 text-sm">24/7 Field Support</h4>
                <p className="text-stone-400 mt-0.5">
                  Direct radio & satellite monitoring across North Bengal mountain passes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 text-white group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-amber-600 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Bengal Odyssey
                </span>
                <div className="text-[10px] font-medium text-amber-400 tracking-widest uppercase">
                  বঙ্গ অভিযান · Kolkata
                </div>
              </div>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              From the tidal mangrove labyrinths of Sundarbans to the 11,930-ft summit of Sandakphu overlooking Kanchenjunga. Bengal Odyssey creates authentic, sustainable, and unforgettable journeys across West Bengal and Eastern Himalayas.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/919830123456"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 text-xs font-semibold hover:bg-emerald-900 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Expeditions
              </a>
              <a
                href="tel:+919830123456"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 text-stone-300 border border-stone-800 text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                +91 98301 23456
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs">
              {DESTINATIONS_DATA.map((dest) => (
                <li key={dest.id}>
                  <Link
                    href={`/packages?destination=${dest.slug}`}
                    className="hover:text-amber-300 transition-colors text-stone-400 hover:underline"
                  >
                    {dest.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Discover & Book
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors text-stone-400">
                  Our Story & Captains
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-amber-300 transition-colors text-stone-400">
                  All Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/packages?type=backpacking-trek" className="hover:text-amber-300 transition-colors text-stone-400">
                  Himalayan Backpacking Treks
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="hover:text-amber-300 transition-colors text-stone-400">
                  Corporate Retreats & Offsites
                </Link>
              </li>
              <li>
                <Link href="/best-season" className="hover:text-amber-300 transition-colors text-stone-400">
                  Best Season Travel Guide
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-300 transition-colors text-stone-400">
                  Visual Expedition Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Head Offices */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
              Offices & Contact
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-200">Kolkata HQ:</span>
                  <p>72B Park Street, Camac St Crossing, Kolkata, West Bengal 700016</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-200">North Bengal Field Base:</span>
                  <p>Hill Cart Road, Near Pradhan Nagar, Siliguri 734001</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <span>expeditions@bengalodyssey.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800/80 py-6 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Bengal Odyssey Tours & Treks Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Affiliated with West Bengal Tourism Development Corp (WBTDC)</span>
            <span>·</span>
            <span>Leave No Trace Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
