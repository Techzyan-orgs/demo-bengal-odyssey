import { PackageItem } from './travel-data';

export interface UrgencyInfo {
  label: string;
  isUrgent: boolean;
  colorScheme: 'critical' | 'warning' | 'normal';
  daysDiff: number;
}

/**
 * Calculates departure urgency based on target departure date string (YYYY-MM-DD)
 * against a reference date (defaults to current system date or simulated date).
 */
export function calculatePackageUrgency(
  departureDateStr: string,
  spotsLeft: number,
  referenceDateStr: string = '2026-10-31'
): UrgencyInfo {
  const target = new Date(departureDateStr);
  const ref = new Date(referenceDateStr);

  // Normalize to UTC midnight for exact date differences
  const targetMidnight = Date.UTC(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
  const refMidnight = Date.UTC(ref.getUTCFullYear(), ref.getUTCMonth(), ref.getUTCDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysDiff = Math.round((targetMidnight - refMidnight) / msPerDay);

  if (daysDiff <= 0) {
    return {
      label: 'Leaves Today',
      isUrgent: true,
      colorScheme: 'critical',
      daysDiff,
    };
  }

  if (daysDiff === 1) {
    return {
      label: 'Leaves Tomorrow',
      isUrgent: true,
      colorScheme: 'critical',
      daysDiff,
    };
  }

  if (daysDiff === 2) {
    return {
      label: 'Leaves in 2 Days',
      isUrgent: true,
      colorScheme: 'warning',
      daysDiff,
    };
  }

  if (daysDiff === 3) {
    return {
      label: 'Leaves in 3 Days',
      isUrgent: true,
      colorScheme: 'warning',
      daysDiff,
    };
  }

  // Future departure
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedDate = `${target.getUTCDate()} ${months[target.getUTCMonth()]}`;
  return {
    label: `Departs ${formattedDate}`,
    isUrgent: false,
    colorScheme: spotsLeft <= 3 ? 'warning' : 'normal',
    daysDiff,
  };
}

export interface FilterOptions {
  searchQuery?: string;
  destination?: string;
  tripTypes?: string[];
  durationCategory?: 'all' | '1-2' | '3-5' | '6+';
  minPrice?: number;
  maxPrice?: number;
  selectedTags?: string[];
  onlyDeals?: boolean;
  onlyUpcoming?: boolean;
}

export function filterPackages(packages: PackageItem[], filters: FilterOptions): PackageItem[] {
  return packages.filter((pkg) => {
    // Search query matches title, tagline, locations, or summary
    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchTitle = pkg.title.toLowerCase().includes(q);
      const matchBengali = pkg.bengaliTitle.toLowerCase().includes(q);
      const matchLocations = pkg.locationsCovered.some((loc) => loc.toLowerCase().includes(q));
      const matchTags = pkg.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchSummary = pkg.summary.toLowerCase().includes(q);
      if (!matchTitle && !matchBengali && !matchLocations && !matchTags && !matchSummary) {
        return false;
      }
    }

    // Destination filter
    if (filters.destination && filters.destination !== 'all') {
      if (pkg.destination !== filters.destination) {
        return false;
      }
    }

    // Trip type filter
    if (filters.tripTypes && filters.tripTypes.length > 0) {
      if (!filters.tripTypes.includes(pkg.type)) {
        return false;
      }
    }

    // Duration filter
    if (filters.durationCategory && filters.durationCategory !== 'all') {
      if (filters.durationCategory === '1-2' && pkg.days > 2) return false;
      if (filters.durationCategory === '3-5' && (pkg.days < 3 || pkg.days > 5)) return false;
      if (filters.durationCategory === '6+' && pkg.days < 6) return false;
    }

    // Price range
    const effectivePrice = pkg.discountPrice || pkg.basePrice;
    if (filters.minPrice !== undefined && effectivePrice < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && effectivePrice > filters.maxPrice) {
      return false;
    }

    // Tag filter
    if (filters.selectedTags && filters.selectedTags.length > 0) {
      const hasAnyTag = filters.selectedTags.some((tag) =>
        pkg.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()) ||
        pkg.interestCategories.map((c) => c.toLowerCase()).includes(tag.toLowerCase())
      );
      if (!hasAnyTag) return false;
    }

    // Deals filter
    if (filters.onlyDeals && (!pkg.discountPrice || pkg.discountPrice >= pkg.basePrice)) {
      return false;
    }

    // Upcoming filter
    if (filters.onlyUpcoming && !pkg.isUpcoming) {
      return false;
    }

    return true;
  });
}

export interface QuotationParams {
  basePrice: number;
  adults: number;
  children: number;
  tier: 'standard' | 'deluxe' | 'heritage';
  includeKolkataTransfer?: boolean;
  includeTravelInsurance?: boolean;
  includeDedicatedNaturalist?: boolean;
}

export interface QuotationResult {
  adultTotal: number;
  childTotal: number;
  accommodationMultiplier: number;
  tierSupplement: number;
  addOnsTotal: number;
  subtotal: number;
  gstAmount: number; // 5% GST on tour operators in India
  grandTotal: number;
  perPersonAverage: number;
}

export function calculateQuotation(params: QuotationParams): QuotationResult {
  const adults = Math.max(1, params.adults || 1);
  const children = Math.max(0, params.children || 0);

  // Multiplier for accommodation standard
  let multiplier = 1.0;
  if (params.tier === 'deluxe') multiplier = 1.25;
  if (params.tier === 'heritage') multiplier = 1.55;

  const effectiveAdultRate = Math.round(params.basePrice * multiplier);
  // Children pay 60% of base rate
  const effectiveChildRate = Math.round(params.basePrice * 0.6 * multiplier);

  const adultTotal = effectiveAdultRate * adults;
  const childTotal = effectiveChildRate * children;
  const tierSupplement = (adultTotal + childTotal) - (params.basePrice * (adults + children * 0.6));

  let addOnsTotal = 0;
  if (params.includeKolkataTransfer) {
    addOnsTotal += 2800; // Flat roundtrip transfer vehicle allocation
  }
  if (params.includeTravelInsurance) {
    addOnsTotal += 450 * (adults + children);
  }
  if (params.includeDedicatedNaturalist) {
    addOnsTotal += 3500;
  }

  const subtotal = adultTotal + childTotal + addOnsTotal;
  const gstAmount = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + gstAmount;
  const totalTravelers = adults + children;
  const perPersonAverage = Math.round(grandTotal / totalTravelers);

  return {
    adultTotal,
    childTotal,
    accommodationMultiplier: multiplier,
    tierSupplement: Math.round(tierSupplement),
    addOnsTotal,
    subtotal,
    gstAmount,
    grandTotal,
    perPersonAverage,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppUrl(
  phone: string = '919830123456',
  packageTitle: string = 'Custom Bengal Tour',
  departureDate?: string,
  travelersCount?: number
): string {
  let message = `Hello Bengal Odyssey Team! I am interested in booking the tour: "${packageTitle}".`;
  if (departureDate) {
    message += ` Tentative date: ${departureDate}.`;
  }
  if (travelersCount) {
    message += ` Total travelers: ${travelersCount}.`;
  }
  message += ` Kindly share the detailed itinerary and quotation.`;

  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
}
