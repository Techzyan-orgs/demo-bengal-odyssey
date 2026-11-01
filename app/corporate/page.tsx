'use client';

import React, { useState } from 'react';
import { Building2, Users, Calendar, Send, CheckCircle2, ShieldCheck, Sparkles, MessageCircle, ArrowRight, Award } from 'lucide-react';
import { SafeImage } from '@/components/SafeImage';
import { DESTINATIONS_DATA } from '@/lib/travel-data';

export default function CorporatePage() {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('darjeeling-hills');
  const [headcount, setHeadcount] = useState('30-50');
  const [tentativeDates, setTentativeDates] = useState('2026-12-10');
  const [eventScope, setEventScope] = useState('Annual Leadership Retreat');
  const [customBrief, setCustomBrief] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !corporateEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ticket = `B2B-${Math.floor(10000 + Math.random() * 90000)}`;
      setTicketNumber(ticket);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div className="relative min-h-[calc(100dvh-5.5rem)] bg-stone-950 text-stone-100 flex flex-col justify-between pt-6 sm:pt-10 pb-16">
      {/* Full-Screen Immersive Canvas Background */}
      <div className="absolute inset-0 z-0">
        <SafeImage
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=85"
          alt="Luxury Corporate Tea Estate Retreat in Kurseong"
          fill
          priority
          fallbackTitle="Luxury Himalayan Corporate Retreat"
          fallbackGradient="from-stone-950 via-emerald-950/80 to-slate-950"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/80 to-stone-950/70" />
        <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Proposition & Corporate Pillars */}
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            B2B Expeditions & MICE
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Elevate Your Team Beyond Conference Rooms
          </h1>

          <p className="text-base text-stone-300 leading-relaxed font-light">
            We curate bespoke executive retreats, annual company offsites, and high-impact leadership summits across Bengal’s finest heritage tea estates, luxury river cruisers, and secluded mountain lodges.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
            <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1">
              <div className="font-bold text-amber-400 text-sm">Private Charters</div>
              <p className="text-stone-300">Toy Train steam locomotive charters & exclusive Sundarban river cruisers.</p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1">
              <div className="font-bold text-emerald-400 text-sm">Seamless Logistics</div>
              <p className="text-stone-300">Dedicated flight coordination, AC luxury coaches, and high-speed satellite Wi-Fi.</p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1">
              <div className="font-bold text-cyan-400 text-sm">Leadership Offsites</div>
              <p className="text-stone-300">Outdoor team survival challenges led by certified Himalayan mountaineers.</p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1">
              <div className="font-bold text-rose-400 text-sm">GST Invoicing & Billing</div>
              <p className="text-stone-300">Compliant corporate invoicing with clear audit receipts and enterprise vendor SLAs.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Glassmorphic Lead Generation Card */}
        <div className="w-full max-w-lg bg-white/95 dark:bg-stone-900/90 backdrop-blur-xl border border-stone-200 dark:border-stone-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl transition-colors">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white">Retreat Proposal Initiated</h3>
              <p className="text-sm text-stone-600 dark:text-stone-300">
                Thank you, <span className="font-semibold text-stone-900 dark:text-white">{contactPerson}</span> from <span className="font-semibold text-stone-900 dark:text-white">{companyName}</span>. Your corporate inquiry ticket is{' '}
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-black/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-500/20">
                  {ticketNumber}
                </span>
                . Our Head of Corporate Expeditions will contact you within 2 hours with customized MICE venue decks.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/919830123456?text=${encodeURIComponent(`Hi Bengal Odyssey Corporate Desk, I submitted retreat request ${ticketNumber} for ${companyName}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Fast-Track Discussion on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-0.5">
                  Corporate Desk
                </span>
                <h2 className="text-xl font-bold text-stone-900 dark:text-white">
                  Bespoke Corporate Retreats & MICE
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Share your offsite vision for an executive proposal within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="corp-companyName" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    id="corp-companyName"
                    type="text"
                    required
                    placeholder="e.g. Tata Consultancy Services"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="corp-contactPerson" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Contact Person *
                  </label>
                  <input
                    id="corp-contactPerson"
                    type="text"
                    required
                    placeholder="e.g. Debjani Sengupta (HR Lead)"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="corp-email" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    id="corp-email"
                    type="email"
                    required
                    placeholder="debjani@company.com"
                    value={corporateEmail}
                    onChange={(e) => setCorporateEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="corp-phone" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Direct Phone *
                  </label>
                  <input
                    id="corp-phone"
                    type="tel"
                    required
                    placeholder="+91 98300 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="corp-destination" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Target Region *
                  </label>
                  <select
                    id="corp-destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                  >
                    <option value="darjeeling-hills">Kurseong & Darjeeling Tea Estates</option>
                    <option value="sundarbans">Sundarbans Luxury Riverfront Eco-Resort</option>
                    <option value="dooars-terai">Dooars Wilderness & Forest Retreat</option>
                    <option value="coastal-puri">Mandarmani Beachfront Luxury Resort</option>
                    <option value="sikkim-offbeat">Sikkim Pelling Himalayan Retreat</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="corp-headcount" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Expected Headcount *
                  </label>
                  <select
                    id="corp-headcount"
                    value={headcount}
                    onChange={(e) => setHeadcount(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                  >
                    <option value="15-30">15 – 30 Executives (Board/Leadership)</option>
                    <option value="30-50">30 – 50 People (Core Team)</option>
                    <option value="50-100">50 – 100 People (Mid-Size Offsite)</option>
                    <option value="100-250">100 – 250+ People (Full Company Gala)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="corp-dates" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Tentative Dates *
                  </label>
                  <input
                    id="corp-dates"
                    type="date"
                    value={tentativeDates}
                    onChange={(e) => setTentativeDates(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="corp-scope" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Event Scope *
                  </label>
                  <select
                    id="corp-scope"
                    value={eventScope}
                    onChange={(e) => setEventScope(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                  >
                    <option value="Leadership Summit">Executive Leadership Summit</option>
                    <option value="Team Building">Team Building & Outdoor Survival</option>
                    <option value="Annual Retreat">Annual Company Offsite</option>
                    <option value="Client Gala">High-Profile Client Hospitality</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="corp-brief" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Specific Objectives or Custom AV Needs
                </label>
                <textarea
                  id="corp-brief"
                  rows={2}
                  placeholder="e.g. Need conference hall for 60 pax, sound system, gala dinner with folk baul music, team hiking day."
                  value={customBrief}
                  onChange={(e) => setCustomBrief(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Dispatching to Corporate Desk...' : "Let's Discuss"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
