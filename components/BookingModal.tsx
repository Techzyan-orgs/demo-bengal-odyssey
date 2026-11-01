'use client';

import React, { useState } from 'react';
import { X, Check, ShieldCheck, Calendar, Users, CreditCard, ChevronRight, Phone, Mail, User } from 'lucide-react';
import { PackageItem } from '@/lib/travel-data';
import { calculateQuotation, formatINR, generateWhatsAppUrl } from '@/lib/travel-logic';

interface BookingModalProps {
  pkg: PackageItem;
  isOpen: boolean;
  onClose: () => void;
  initialDate?: string;
}

export function BookingModal({ pkg, isOpen, onClose, initialDate }: BookingModalProps) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [tier, setTier] = useState<'standard' | 'deluxe' | 'heritage'>('deluxe');
  const [selectedDate, setSelectedDate] = useState(initialDate || pkg.departureDate);
  const [includeTransfer, setIncludeTransfer] = useState(true);
  const [includeInsurance, setIncludeInsurance] = useState(true);
  const [includeNaturalist, setIncludeNaturalist] = useState(false);

  // Traveler info
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'customize' | 'details' | 'confirmed'>('customize');
  const [bookingId, setBookingId] = useState('');

  if (!isOpen) return null;

  const basePriceToUse = pkg.discountPrice || pkg.basePrice;
  const quote = calculateQuotation({
    basePrice: basePriceToUse,
    adults,
    children,
    tier,
    includeKolkataTransfer: includeTransfer,
    includeTravelInsurance: includeInsurance,
    includeDedicatedNaturalist: includeNaturalist,
  });

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    const refCode = `BO-RES-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(refCode);
    setStep('confirmed');
  };

  const whatsappUrl = generateWhatsAppUrl(
    '919830123456',
    pkg.title,
    selectedDate,
    adults + children
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-labelledby="booking-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div>
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
              Reserve Batch · {pkg.duration}
            </div>
            <h2 id="booking-modal-title" className="text-lg font-bold truncate max-w-lg">
              {pkg.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'confirmed' ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
                Booking Batch Reserved!
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                Congratulations, <span className="font-semibold text-stone-900 dark:text-white">{fullName}</span>! Your provisional booking receipt is{' '}
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                  {bookingId}
                </span>
                . Our expedition captain has locked your seats for departure on <span className="font-medium text-stone-900 dark:text-white">{selectedDate}</span>.
              </p>

              {/* Summary Card */}
              <div className="max-w-md mx-auto bg-stone-50 dark:bg-stone-800/60 p-4 rounded-xl border border-stone-200 dark:border-stone-700 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2 font-semibold text-stone-800 dark:text-stone-200">
                  <span>Tour Package</span>
                  <span className="text-right truncate max-w-[200px]">{pkg.title}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>Travelers</span>
                  <span>{adults} Adults, {children} Children</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>Departure Date</span>
                  <span>{selectedDate}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-300">
                  <span>Accommodation Standard</span>
                  <span className="capitalize">{tier}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-stone-900 dark:text-white pt-2 border-t border-stone-200 dark:border-stone-700">
                  <span>Estimated Total (Incl. 5% GST)</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{formatINR(quote.grandTotal)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors shadow-md"
                >
                  Confirm Instant with Captain on WhatsApp
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : step === 'customize' ? (
            <div className="space-y-6">
              {/* Batch Date & Group size */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="booking-batchDate" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Departure Date
                  </label>
                  <input
                    id="booking-batchDate"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="booking-adults" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Adult Travelers
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-9 h-9 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 font-bold"
                    >
                      -
                    </button>
                    <input
                      id="booking-adults"
                      type="number"
                      min="1"
                      value={adults}
                      onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-14 text-center px-2 py-2 text-sm font-semibold rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="w-9 h-9 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="booking-children" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Children (5-11 yrs)
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-9 h-9 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 font-bold"
                    >
                      -
                    </button>
                    <input
                      id="booking-children"
                      type="number"
                      min="0"
                      value={children}
                      onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-14 text-center px-2 py-2 text-sm font-semibold rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="w-9 h-9 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Accommodation Tier Select */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                  Select Accommodation Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div
                    onClick={() => setTier('standard')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      tier === 'standard'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 dark:border-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-semibold text-sm">Standard</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      Cozy mountain lodges & verified 3★ eco-stays
                    </div>
                    <div className="text-xs font-medium mt-2">Base Fare</div>
                  </div>

                  <div
                    onClick={() => setTier('deluxe')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      tier === 'deluxe'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 dark:border-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-semibold text-sm">Deluxe Comfort</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      4★ boutique tea resorts with balcony panoramas
                    </div>
                    <div className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-2">+25% supplement</div>
                  </div>

                  <div
                    onClick={() => setTier('heritage')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      tier === 'heritage'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                        : 'border-stone-200 dark:border-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-semibold text-sm">Heritage Luxury</div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      Century-old British colonial estates (The Elgin / Mayfair)
                    </div>
                    <div className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-2">+55% supplement</div>
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                  Recommended Add-Ons
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/40 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeTransfer}
                        onChange={(e) => setIncludeTransfer(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <div>
                        <div className="text-sm font-medium text-stone-900 dark:text-white">
                          Private Airport / Train Station Transfer
                        </div>
                        <div className="text-xs text-stone-500">
                          Dedicated AC vehicle pickup & drop from Bagdogra / NJP / Kolkata
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                      ₹2,800 total
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/40 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeInsurance}
                        onChange={(e) => setIncludeInsurance(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <div>
                        <div className="text-sm font-medium text-stone-900 dark:text-white">
                          Comprehensive Himalayan Expedition Insurance
                        </div>
                        <div className="text-xs text-stone-500">
                          Evacuation coverage, medical safety & lost baggage protection
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                      ₹450 / traveler
                    </span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/40 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={includeNaturalist}
                        onChange={(e) => setIncludeNaturalist(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded"
                      />
                      <div>
                        <div className="text-sm font-medium text-stone-900 dark:text-white">
                          Dedicated Private Naturalist & Birdwatching Guide
                        </div>
                        <div className="text-xs text-stone-500">
                          Exclusive 1-on-1 spotting companion with spotting scopes
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                      ₹3,500 total
                    </span>
                  </label>
                </div>
              </div>

              {/* Price summary block */}
              <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                <div className="flex justify-between items-center text-xs text-stone-600 dark:text-stone-400 mb-1">
                  <span>Base & Tier ({adults} Adults, {children} Kids)</span>
                  <span>{formatINR(quote.adultTotal + quote.childTotal)}</span>
                </div>
                {quote.addOnsTotal > 0 && (
                  <div className="flex justify-between items-center text-xs text-stone-600 dark:text-stone-400 mb-1">
                    <span>Optional Add-ons</span>
                    <span>{formatINR(quote.addOnsTotal)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs text-stone-600 dark:text-stone-400 mb-2">
                  <span>Tour GST (5%)</span>
                  <span>{formatINR(quote.gstAmount)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-stone-200 dark:border-stone-700">
                  <div>
                    <div className="text-xs text-stone-500">Grand Total</div>
                    <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      {formatINR(quote.grandTotal)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-stone-500">Per person approx</div>
                    <div className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                      {formatINR(quote.perPersonAverage)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-md flex items-center gap-2"
                >
                  <span>Continue to Traveler Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs text-stone-600 dark:text-stone-300 flex items-center justify-between">
                <span>
                  Reserving for <strong className="text-stone-900 dark:text-white">{adults} Adults, {children} Kids</strong> on <strong className="text-stone-900 dark:text-white">{selectedDate}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setStep('customize')}
                  className="text-xs text-emerald-600 dark:text-emerald-400 underline font-medium"
                >
                  Edit details
                </button>
              </div>

              <div>
                <label htmlFor="lead-name" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                  Lead Traveler Full Name *
                </label>
                <div className="relative">
                  <input
                    id="lead-name"
                    type="text"
                    required
                    placeholder="e.g. Joydeep Ghosh"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 pl-9 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      placeholder="+91 98301 23456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 pl-9 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label htmlFor="lead-email" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      id="lead-email"
                      type="email"
                      required
                      placeholder="joydeep@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 pl-9 text-sm rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200">
                <p className="font-semibold mb-0.5">Zero-Cancellation Penalty Risk:</p>
                <p>
                  Free cancellation up to 7 days before departure. Pay only a 15% token deposit now to lock your batch seats; the balance is payable 48 hours prior to journey.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep('customize')}
                  className="px-4 py-2 text-stone-600 dark:text-stone-300 text-sm hover:underline"
                >
                  ← Back to choices
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-md flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm & Lock Batch Seats ({formatINR(quote.grandTotal)})</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
