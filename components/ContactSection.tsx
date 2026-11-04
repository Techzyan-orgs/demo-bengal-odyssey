'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { DESTINATIONS_DATA } from '@/lib/travel-data';
import { generateWhatsAppUrl } from '@/lib/travel-logic';
import { WhatsAppIcon } from './WhatsAppIcon';

export function ContactSection() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [journeyDate, setJourneyDate] = useState('2026-11-20');
  const [destination, setDestination] = useState('darjeeling-hills');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const leadId = `BO-QUO-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedLeadId(leadId);
      setIsSubmitting(false);
    }, 500);
  };

  // Smooth scroll into view when arriving via hash or route navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#contact-section') {
      const timer = setTimeout(() => {
        const el = document.getElementById('contact-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const selectedDest = DESTINATIONS_DATA.find((d) => d.id === destination);
  const destName = selectedDest ? selectedDest.title : 'Bengal Odyssey Tour';
  const whatsappUrl = generateWhatsAppUrl(
    '919830123456',
    destName,
    journeyDate,
    adults + children
  );

  return (
    <section id="contact-section" className="scroll-mt-16 sm:scroll-mt-24 py-20 bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-white relative overflow-hidden transition-colors">
      {/* Background glow styling */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider border border-amber-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Direct Concierge Desk
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Plan Your Journey with Our Local Captains
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300 mt-2">
            Speak directly with experienced mountaineers and naturalists based in Kolkata and Siliguri.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Contact info & Highlighted WhatsApp card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Highlighted WhatsApp Connect Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950 via-teal-900 to-stone-900 border border-emerald-500/40 shadow-xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-emerald-950/40 shrink-0">
                    <WhatsAppIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      WhatsApp Quick Connect
                    </h3>
                    <p className="text-xs text-emerald-200">
                      Average response time: &lt; 10 minutes
                    </p>
                  </div>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed mb-4">
                  Need an urgent batch seat, weather forecast for Sandakphu, or private Toy Train booking? Chat directly with our senior expedition coordinator.
                </p>
                <a
                  href="https://wa.me/919830123456?text=Hello%20Bengal%20Odyssey!%20I%20would%20like%20to%20plan%20a%20tour."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span>Start WhatsApp Chat (+91 98301 23456)</span>
                </a>
              </div>

              {/* Office Addresses */}
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 shadow-md space-y-4 transition-colors">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Bengal Odyssey Headquarters & Bases
                </h4>

                <div className="flex items-start gap-3 text-xs">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 dark:text-stone-100 block font-semibold">Kolkata Central Office:</strong>
                    <span className="text-stone-600 dark:text-stone-300">
                      72B Park Street, Heritage Chamber, Near Camac St Crossing, Kolkata 700016
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 dark:text-stone-100 block font-semibold">Siliguri North Bengal Depot:</strong>
                    <span className="text-stone-600 dark:text-stone-300">
                      Hill Cart Road, Pradhan Nagar, Siliguri, West Bengal 734001
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs pt-2 border-t border-stone-200 dark:border-stone-700">
                  <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-stone-600 dark:text-stone-300">Direct Lines: +91 98301 23456 / (033) 2249-8800</span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-stone-600 dark:text-stone-300">Email: expeditions@bengalodyssey.in</span>
                </div>
              </div>
            </div>

            {/* Operating hours pill */}
            <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400 px-2">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Desk Open: Monday – Sunday: 8:00 AM – 10:00 PM IST (Emergency line 24/7)</span>
            </div>
          </div>

          {/* Right Column: Interactive Quotation Form */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-2xl p-6 sm:p-8 shadow-xl dark:shadow-2xl flex flex-col justify-between transition-colors">
            {submittedLeadId ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 dark:text-white">Quotation Request Logged!</h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-stone-900 dark:text-white">{fullName}</span>. Your request ID is{' '}
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-black/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-500/20">
                    {submittedLeadId}
                  </span>
                  . A personalized PDF itinerary and transparent rate card for{' '}
                  <strong className="text-stone-900 dark:text-white">{destName}</strong> will be shared with you on WhatsApp and Email shortly.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    Speed up via WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setSubmittedLeadId(null);
                      setFullName('');
                      setPhone('');
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-stone-200 dark:border-stone-700 pb-3">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    Request an Instant Custom Quotation
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    No hidden charges. 100% transparent pricing for couples, families, and private batches.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-fullName" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-fullName"
                      type="text"
                      required
                      placeholder="e.g. Anirban Sen"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98300 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="anirban@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-journeyDate" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Tentative Journey Date *
                    </label>
                    <input
                      id="contact-journeyDate"
                      type="date"
                      required
                      value={journeyDate}
                      onChange={(e) => setJourneyDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="contact-destination" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Destination *
                    </label>
                    <select
                      id="contact-destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                    >
                      {DESTINATIONS_DATA.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-adults" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Adults
                    </label>
                    <input
                      id="contact-adults"
                      type="number"
                      min="1"
                      value={adults}
                      onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-children" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                      Children (Below 12)
                    </label>
                    <input
                      id="contact-children"
                      type="number"
                      min="0"
                      value={children}
                      onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-requirements" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Special Requirements & Customization
                  </label>
                  <textarea
                    id="contact-requirements"
                    rows={2}
                    placeholder="e.g. Senior citizen friendly pacing, private tea bungalow, pure veg meals, wildlife photography hide pass..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Generating Quotation...' : 'Get Instant Quotation'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
