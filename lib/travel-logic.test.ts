import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePackageUrgency,
  filterPackages,
  calculateQuotation,
  formatINR,
  generateWhatsAppUrl,
} from './travel-logic';
import { PACKAGES_DATA } from './travel-data';

test('calculatePackageUrgency returns Leaves Today for same date', () => {
  const result = calculatePackageUrgency('2026-10-31', 4, '2026-10-31');
  assert.equal(result.label, 'Leaves Today');
  assert.equal(result.isUrgent, true);
  assert.equal(result.colorScheme, 'critical');
});

test('calculatePackageUrgency returns Leaves Tomorrow for 1 day ahead', () => {
  const result = calculatePackageUrgency('2026-11-01', 3, '2026-10-31');
  assert.equal(result.label, 'Leaves Tomorrow');
  assert.equal(result.isUrgent, true);
  assert.equal(result.colorScheme, 'critical');
});

test('calculatePackageUrgency returns Leaves in 2 Days for 2 days ahead', () => {
  const result = calculatePackageUrgency('2026-11-02', 2, '2026-10-31');
  assert.equal(result.label, 'Leaves in 2 Days');
  assert.equal(result.isUrgent, true);
  assert.equal(result.colorScheme, 'warning');
});

test('calculatePackageUrgency returns formatted date for far ahead departure', () => {
  const result = calculatePackageUrgency('2026-11-20', 6, '2026-10-31');
  assert.equal(result.label, 'Departs 20 Nov');
  assert.equal(result.isUrgent, false);
});

test('filterPackages accurately filters by destination', () => {
  const sundarbanPkgs = filterPackages(PACKAGES_DATA, { destination: 'sundarbans' });
  assert.ok(sundarbanPkgs.length > 0);
  for (const pkg of sundarbanPkgs) {
    assert.equal(pkg.destination, 'sundarbans');
  }
});

test('filterPackages accurately filters by search query in title and location', () => {
  const queryResults = filterPackages(PACKAGES_DATA, { searchQuery: 'Sandakphu' });
  assert.ok(queryResults.length >= 1);
  assert.ok(queryResults[0].title.includes('Sandakphu'));
});

test('filterPackages filters by price threshold', () => {
  const affordable = filterPackages(PACKAGES_DATA, { maxPrice: 10000 });
  for (const pkg of affordable) {
    const price = pkg.discountPrice || pkg.basePrice;
    assert.ok(price <= 10000);
  }
});

test('calculateQuotation calculates transparent totals with GST', () => {
  const quote = calculateQuotation({
    basePrice: 10000,
    adults: 2,
    children: 1,
    tier: 'deluxe', // 1.25 multiplier
    includeKolkataTransfer: true,
    includeTravelInsurance: true,
  });

  // Effective adult: 10000 * 1.25 = 12500 -> 2 adults = 25000
  // Effective child: 10000 * 0.6 * 1.25 = 7500 -> 1 child = 7500
  // Subtotal travelers = 32500
  // Add-ons: Transfer (2800) + Insurance (450 * 3 = 1350) = 4150
  // Subtotal = 32500 + 4150 = 36650
  // GST 5% = 1832.5 -> Math.round = 1833
  // Grand total = 38483
  assert.equal(quote.adultTotal, 25000);
  assert.equal(quote.childTotal, 7500);
  assert.equal(quote.addOnsTotal, 4150);
  assert.equal(quote.subtotal, 36650);
  assert.equal(quote.gstAmount, 1833);
  assert.equal(quote.grandTotal, 38483);
});

test('formatINR formats currency in Indian notation', () => {
  const str = formatINR(14999);
  assert.ok(str.includes('14,999'));
});

test('generateWhatsAppUrl builds valid wa.me URL with encoded message', () => {
  const url = generateWhatsAppUrl('919830123456', 'Darjeeling Heritage', '2026-11-05', 4);
  assert.ok(url.startsWith('https://wa.me/919830123456?text='));
  assert.ok(url.includes(encodeURIComponent('Darjeeling Heritage')));
});
