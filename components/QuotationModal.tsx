'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Calendar, Users, MapPin, Sparkles } from 'lucide-react';
import { DESTINATIONS_DATA } from '@/lib/travel-data';
import { generateWhatsAppUrl } from '@/lib/travel-logic';

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDestination?: string;
  preselectedPackageTitle?: string;
}

export function QuotationModal({
  isOpen,
  onClose,
  preselectedDestination,
  preselectedPackageTitle,
}: QuotationModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [journeyDate, setJourneyDate] = useState('2026-11-15');
  const [destination, setDestination] = useState(preselectedDestination || 'darjeeling-hills');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [tier, setTier] = useState<'standard' | 'deluxe' | 'heritage'>('deluxe');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadReference, setLeadReference] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const refCode = `BO-${Math.floor(100000 + Math.random() * 900000)}`;
      setLeadReference(refCode);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const selectedDestObj = DESTINATIONS_DATA.find((d) => d.id === destination);
  const destName = selectedDestObj ? selectedDestObj.title : 'Bengal Odyssey Tour';
  const whatsappUrl = generateWhatsAppUrl(
    '919830123456',
    preselectedPackageTitle || destName,
    journeyDate,
    adults + children
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-labelledby="quotation-title"
        aria-modal="true"
      >
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-emerald-950 via-teal-900 to-stone-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Bengal Odyssey Concierge
            </div>
            <h2 id="quotation-title" className="text-xl font-bold tracking-tight text-white">
              Plan Your Dream Expedition
            </h2>
            <p className="text-xs text-stone-300 mt-0.5">
              Custom itinerary & transparent pricing within 30 minutes
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
                Quotation Request Received!
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-stone-900 dark:text-white">{fullName}</span>. Our lead destination curator has reserved inquiry ticket{' '}
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                  {leadReference}
                </span>
                . We will reach you at <span className="font-medium">{phone}</span> shortly.
              </p>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-left text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <p className="font-semibold">Selected Trip Summary:</p>
                <p>• Destination: {destName}</p>
                <p>• Journey Date: {journeyDate}</p>
                <p>• Travelers: {adults} Adult(s), {children} Child(ren)</p>
                <p>• Stay Standard: {tier.toUpperCase()}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Connect on WhatsApp Now
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-medium transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {preselectedPackageTitle && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Inquiring about: <strong className="font-semibold">{preselectedPackageTitle}</strong>
                  </span>
                </div>
              )}

              {/* Destination & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quotation-destination" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Destination Region *
                  </label>
                  <select
                    id="quotation-destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  >
                    {DESTINATIONS_DATA.map((dest) => (
                      <option key={dest.id} value={dest.id}>
                        {dest.title} ({dest.bengaliTitle})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="quotation-journeyDate" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Tentative Journey Date *
                  </label>
                  <div className="relative">
                    <input
                      id="quotation-journeyDate"
                      type="date"
                      value={journeyDate}
                      onChange={(e) => setJourneyDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <Calendar className="w-4 h-4 text-stone-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Travelers & Accommodation Tier */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="quotation-adults" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Adults (12+ yrs)
                  </label>
                  <input
                    id="quotation-adults"
                    type="number"
                    min="1"
                    max="50"
                    value={adults}
                    onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="quotation-children" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Children (5-11 yrs)
                  </label>
                  <input
                    id="quotation-children"
                    type="number"
                    min="0"
                    max="30"
                    value={children}
                    onChange={(e) => setChildren(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="quotation-tier" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Stay Preference
                  </label>
                  <select
                    id="quotation-tier"
                    value={tier}
                    onChange={(e) => setTier(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="standard">Standard Boutique (3-Star)</option>
                    <option value="deluxe">Deluxe Comfort (4-Star)</option>
                    <option value="heritage">Heritage & Colonial Luxury</option>
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quotation-fullName" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="quotation-fullName"
                    type="text"
                    required
                    placeholder="e.g. Soumitra Chatterjee"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="quotation-phone" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="quotation-phone"
                    type="tel"
                    required
                    placeholder="+91 98300 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quotation-email" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  id="quotation-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="quotation-specialRequirements" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Special Preferences or Custom Itinerary Notes
                </label>
                <textarea
                  id="quotation-specialRequirements"
                  rows={2}
                  placeholder="e.g. Senior citizens in group, need private toy train charter, strict vegetarian food, photography permit."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Submit and WhatsApp button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Calculating Quote...' : 'Get Instant Quotation'}
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
