export interface TrekSpecs {
  difficulty: 'Easy' | 'Moderate' | 'Strenuous';
  altitude: string;
  distance: string;
  fitnessLevel: string;
}

export interface DepartureBatch {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;
  spotsLeft: number;
  totalSeats: number;
  status: 'available' | 'filling-fast' | 'almost-full' | 'sold-out';
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  meals: string;
  stay: string;
  highlights: string[];
}

export interface Captain {
  id: string;
  name: string;
  bengaliName?: string;
  role: string;
  experience: string;
  dialects: string[];
  avatar: string;
  bio: string;
  specialty: string;
}

export interface PackageItem {
  id: string;
  slug: string;
  title: string;
  bengaliTitle: string;
  tagline: string;
  destination: 'darjeeling-hills' | 'dooars-terai' | 'sundarbans' | 'coastal-puri' | 'sikkim-offbeat' | 'north-bengal-treks';
  destinationLabel: string;
  type: 'vacation-getaway' | 'offbeat' | 'backpacking-trek' | 'one-day' | 'weekend-getaway';
  typeLabel: string;
  locationsCovered: string[];
  duration: string;
  days: number;
  nights: number;
  basePrice: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  spotsLeft: number;
  featured: boolean;
  isUpcoming: boolean;
  departureDate: string; // Closest batch ISO date
  trekSpecs?: TrekSpecs;
  tags: string[];
  interestCategories: string[];
  summary: string;
  heroImage: string;
  galleryImages: string[];
  fallbackGradient: string;
  itinerary: DayItinerary[];
  includedActivities: string[];
  inclusions: string[];
  exclusions: string[];
  assignedCaptain: Captain;
}

export interface DestinationAccordionItem {
  id: string;
  slug: string;
  title: string;
  bengaliTitle: string;
  shortDesc: string;
  highlight: string;
  image: string;
  gradient: string;
  totalPackages: number;
}

export const DESTINATIONS_DATA: DestinationAccordionItem[] = [
  {
    id: 'darjeeling-hills',
    slug: 'darjeeling-hills',
    title: 'Darjeeling & Hills',
    bengaliTitle: 'দার্জিলিং ও পাহাড়',
    shortDesc: 'Queen of Hills, misty tea estates, heritage Toy Train and sunrise over Kanchenjunga.',
    highlight: 'Kanchenjunga Sunrise & Tea Tasting',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-amber-900/80 via-emerald-950/70 to-slate-900',
    totalPackages: 4,
  },
  {
    id: 'dooars-terai',
    slug: 'dooars-terai',
    title: 'Dooars & Terai',
    bengaliTitle: 'ডুয়ার্স ও তরাই বনভূমি',
    shortDesc: 'Untamed floodplains, Gorumara and Jaldapara elephant corridors and Murti riverbanks.',
    highlight: 'Wild Rhino & Elephant Safaris',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-emerald-950/80 via-teal-950/70 to-slate-900',
    totalPackages: 3,
  },
  {
    id: 'sundarbans',
    slug: 'sundarbans',
    title: 'Sundarbans Delta',
    bengaliTitle: 'সুন্দরবন ম্যানগ্রোভ',
    shortDesc: 'World’s largest mangrove biosphere, royal boat cruises through tidal creeks and tiger trails.',
    highlight: 'Royal Bengal Tiger Boat Safaris',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-emerald-900/80 via-stone-900/80 to-slate-950',
    totalPackages: 3,
  },
  {
    id: 'coastal-puri',
    slug: 'coastal-puri',
    title: 'Coastal Bengal & Puri',
    bengaliTitle: 'উপকূলীয় বাংলা ও পুরী',
    shortDesc: 'Endless golden beaches of Mandarmani, tranquil Tajpur pine forests, and Puri Chilika lagoon.',
    highlight: 'Bay of Bengal Sunsets & Scuba',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-blue-950/80 via-cyan-950/70 to-slate-900',
    totalPackages: 3,
  },
  {
    id: 'sikkim-offbeat',
    slug: 'sikkim-offbeat',
    title: 'Sikkim & Offbeat',
    bengaliTitle: 'সিকিম ও রেশম পথ',
    shortDesc: 'Zuluk 32 hairpin loops on the Old Silk Route, glacial Tsomgo lake and secluded monasteries.',
    highlight: 'Silk Route Pass & Sacred Glacial Lakes',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-indigo-950/80 via-slate-900/80 to-sky-950',
    totalPackages: 3,
  },
  {
    id: 'north-bengal-treks',
    slug: 'north-bengal-treks',
    title: 'North Bengal Treks',
    bengaliTitle: 'উত্তরবঙ্গের ট্রেকিং ট্রেইল',
    shortDesc: 'Sandakphu ridge walk along the Indo-Nepal border with grand panoramic Himalayan views.',
    highlight: 'Sleeping Buddha Ridge & Phalut Trail',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-amber-950/80 via-stone-900/80 to-slate-900',
    totalPackages: 3,
  },
];

export const CAPTAINS_DATA: Captain[] = [
  {
    id: 'captain-subhendu',
    name: 'Subhendu Mukherjee',
    bengaliName: 'শুভেন্দু মুখার্জি',
    role: 'Senior Sandakphu & Himalayan Ridge Master',
    experience: '14+ Years in Field',
    dialects: ['Bengali', 'English', 'Hindi', 'Nepali'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    specialty: 'High-Altitude Navigation & Mountain Safety',
    bio: 'Born in Siliguri, Subhendu has led 280+ successful batch expeditions across the Singalila Ridge. A certified mountaineering instructor from HMI Darjeeling, he turns high-altitude trails into masterclasses on geology and Himalayan flora.',
  },
  {
    id: 'captain-ananya',
    name: 'Ananya Roy',
    bengaliName: 'অনন্যা রায়',
    role: 'Lead Dooars Naturalist & Wildlife Prober',
    experience: '9+ Years in Field',
    dialects: ['Bengali', 'English', 'Hindi', 'Rajbanshi'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    specialty: 'Herpetology, Asian Elephants & Forest Tracking',
    bio: 'Ananya holds a post-graduate specialization in Wildlife Conservation and has guided international researchers through Jaldapara and Gorumara. She ensures quiet, ethical safaris that prioritize animal welfare.',
  },
  {
    id: 'captain-debabrata',
    name: 'Debabrata Mondal',
    bengaliName: 'দেবব্রত মন্ডল',
    role: 'Sundarbans Estuarine Boatmaster & Tiger Tracker',
    experience: '16+ Years in Field',
    dialects: ['Bengali', 'Hindi'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    specialty: 'Tidal Navigations, Creeks & Mangrove Ecology',
    bio: 'A native of Gosaba island, Debabrata knows the winding muddy creeks of the Sundarbans like the back of his hand. His uncanny ability to spot pugmarks on riverbanks makes every boat journey unforgettable.',
  },
  {
    id: 'captain-tenzing',
    name: 'Tenzing Sherpa',
    bengaliName: 'তেনজিং শেরপা',
    role: 'Sikkim & Alpine Pass Lead',
    experience: '12+ Years in Field',
    dialects: ['Nepali', 'Tibetan', 'Hindi', 'English', 'Bengali'],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    specialty: 'Glacial Trails, Winter Passes & Monastic Lore',
    bio: 'A veteran of high-altitude passes in Sikkim and West Bengal, Tenzing carries the deep mountain wisdom of his ancestors. He is renowned for his warm campfire storytelling and meticulous high-camp hospitality.',
  },
  {
    id: 'captain-sourav',
    name: 'Sourav Banerjee',
    bengaliName: 'সৌরভ ব্যানার্জি',
    role: 'Coastal Expedition Lead & Marine Explorer',
    experience: '8+ Years in Field',
    dialects: ['Bengali', 'English', 'Hindi', 'Odia'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    specialty: 'Coastal Photography, Kayaking & Scuba Safety',
    bio: 'Sourav combines his love for maritime history with certified water-sports instruction. He leads our coastal retreats across Mandarmani, Tajpur and the Chilika Lake biosphere with relaxed coastal rhythm.',
  },
];

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: 'darjeeling-colonial-tea-trails',
    slug: 'darjeeling-colonial-tea-trails',
    title: 'Darjeeling Colonial Tea Trails & Heritage Rail',
    bengaliTitle: 'দার্জিলিং চা বাগান ও টয় ট্রেন অভিযান',
    tagline: 'Private luxury bungalows, Toy Train steam charters and dawn over Kanchenjunga',
    destination: 'darjeeling-hills',
    destinationLabel: 'Darjeeling & Hills',
    type: 'vacation-getaway',
    typeLabel: 'Vacation Getaway',
    locationsCovered: ['Darjeeling Mall', 'Tiger Hill', 'Happy Valley Tea Estate', 'Batasia Loop', 'Kurseong'],
    duration: '4N / 5D',
    days: 5,
    nights: 4,
    basePrice: 16999,
    discountPrice: 14499,
    rating: 4.9,
    reviewCount: 218,
    spotsLeft: 4,
    featured: true,
    isUpcoming: true,
    departureDate: '2026-11-03', // Leaves in 3 days
    tags: ['#ToyTrain', '#TeaEstate', '#HimalayanSunrise', '#HeritageLiving'],
    interestCategories: ['Hills', 'Heritage', 'Luxury Resorts'],
    summary: 'Savor misty morning tea plucking in century-old British colonial gardens, steam through Batasia Loop, and watch the sun gild the world’s 3rd highest peak.',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    ],
    fallbackGradient: 'from-amber-900 to-emerald-950',
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Bagdogra / NJP & Scenic Climb to Kurseong',
        description: 'Meet Captain Subhendu at Bagdogra. Enjoy a picturesque drive through Rohini ghats, stopping at Makaibari for orthodox first-flush tea tasting before check-in at your colonial estate.',
        meals: 'Dinner included (Bengali-Anglo Spread)',
        stay: 'Colonial Tea Planter Bungalow, Kurseong',
        highlights: ['Rohini Valley Panoramas', 'Tea Tasting Session', 'Campfire Evening'],
      },
      {
        day: 2,
        title: 'Heritage Toy Train Steam Charter to Darjeeling Mall',
        description: 'Board the UNESCO World Heritage steam locomotive from Kurseong to Ghum, looping through Batasia with panoramic views of Kanchenjunga. Check-in near Darjeeling Mall.',
        meals: 'Breakfast & High Tea',
        stay: 'The Elgin Heritage Resort, Darjeeling',
        highlights: ['Toy Train Steam Ride', 'Batasia War Memorial', 'Evening stroll at Chowrasta'],
      },
      {
        day: 3,
        title: 'Tiger Hill 4:00 AM Sunrise & Monastery Circuit',
        description: 'Pre-dawn climb to Tiger Hill. Watch the golden illumination wash over Kanchenjunga and Mount Everest. Afternoon visit to Ghoom Monastery, Padmaja Naidu Himalayan Zoo and Tibetan Self-Help Center.',
        meals: 'Breakfast & Dinner',
        stay: 'The Elgin Heritage Resort, Darjeeling',
        highlights: ['Tiger Hill Sunrise', 'Snow Leopard Sanctuary', 'Tibetan Handicrafts'],
      },
      {
        day: 4,
        title: 'Happy Valley Organic Tea Plucking & Glenary’s Dinner',
        description: 'Walk through terraced organic tea gardens with veteran pluckers. Hand-roll fresh green leaves and understand orthodox fermentation. Evening dinner at iconic Glenary’s bakery with live acoustics.',
        meals: 'Breakfast & Gala Dinner at Glenary’s',
        stay: 'The Elgin Heritage Resort, Darjeeling',
        highlights: ['Tea Plucking Workshop', 'Glenary’s Heritage Bakery', 'Local Wine Tasting'],
      },
      {
        day: 5,
        title: 'Mirik Lake Detour & Farewell Bagdogra Drop',
        description: 'Descend via the serene pine-fringed Mirik Sumendu Lake and Pashupati Nepal border market before airport transfer.',
        meals: 'Hearty Breakfast',
        stay: 'Departure',
        highlights: ['Mirik Pine Forests', 'Cardamom Valley Vista', 'Airport Drop'],
      },
    ],
    includedActivities: [
      'UNESCO Toy Train Heritage Steam Ticket',
      'Exclusive Tea Estate Plucking & Tasting Workshop',
      'Tiger Hill Priority Viewpoint VIP Pass',
      'Private Dedicated 4x4 Luxury Innova / Scorpio',
      'Daily Planters Breakfast & Specially Curated Dinners',
      'Professional Naturalist & Local Historian Guide',
    ],
    inclusions: ['4 Nights Luxury Heritage Stays', 'All Tolls, Forest Taxes and Permits', '24/7 Concierge Support'],
    exclusions: ['Airfare to Bagdogra', 'Personal shopping & alcoholic beverages', 'Camera fees at monuments'],
    assignedCaptain: CAPTAINS_DATA[0],
  },
  {
    id: 'sundarban-royal-mangrove-safari',
    slug: 'sundarban-royal-mangrove-safari',
    title: 'Sundarban Deep Mangrove Safari & Tiger Trail',
    bengaliTitle: 'সুন্দরবন গভীর ম্যানগ্রোভ ও রয়্যাল বেঙ্গল অভিযান',
    tagline: 'Exclusive river cruiser, Dobanki canopy walk and estuarine crocodile creek prober',
    destination: 'sundarbans',
    destinationLabel: 'Sundarbans Delta',
    type: 'weekend-getaway',
    typeLabel: 'Weekend Getaway',
    locationsCovered: ['Godkhali', 'Sajnekhali Watchtower', 'Sudhanyakhali', 'Dobanki Canopy', 'Pirkhali Creek'],
    duration: '2N / 3D',
    days: 3,
    nights: 2,
    basePrice: 8499,
    discountPrice: 7299,
    rating: 4.8,
    reviewCount: 340,
    spotsLeft: 2,
    featured: true,
    isUpcoming: true,
    departureDate: '2026-11-01', // Leaves Tomorrow!
    tags: ['#TigerSafari', '#MangroveCanopy', '#DeltaCruiser', '#EstuarineWildlife'],
    interestCategories: ['Wildlife', 'Boat Safari', 'Heritage'],
    summary: 'Glide quietly into the world’s largest mangrove forest on a custom wooden safari cruiser. Track Royal Bengal Tigers, saltwater crocodiles, and rare mudskippers.',
    heroImage: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    ],
    fallbackGradient: 'from-emerald-950 to-stone-900',
    itinerary: [
      {
        day: 1,
        title: 'Kolkata Pickup to Godkhali & Delta Boarding',
        description: 'Morning pickup from Kolkata (Science City / Esplanade). Drive to Godkhali port through fertile delta villages. Board the private cruiser M.B. Sundari, welcome tender coconut drink, and cruise into Sajnekhali.',
        meals: 'Lunch with fresh Hilsa / Bhetki curry & dinner',
        stay: 'Riverfront Eco-Cottage, Pakhiralay',
        highlights: ['Scenic Delta Cruise', 'Sajnekhali Mangrove Interpretation Centre', 'Bonbibi Folk Drama Evening'],
      },
      {
        day: 2,
        title: 'Full Day Deep Forest Safari: Dobanki & Sudhanyakhali',
        description: 'Dawn tea on the boat roof. Cruise into narrow Pirkhali, Gazikhali, and Deulbharani creeks. Climb Sudhanyakhali watchtower overlooking freshwater tiger pond, then walk the half-kilometer caged canopy at Dobanki.',
        meals: 'Breakfast, Lunch & Riverfront Barbecue Dinner',
        stay: 'Riverfront Eco-Cottage, Pakhiralay',
        highlights: ['Dobanki Caged Canopy Walk', 'Sudhanyakhali Tiger Pond', 'Irrawaddy Dolphin Sighting Spot'],
      },
      {
        day: 3,
        title: 'Panchamukhani Junction, Island Village Walk & Kolkata Return',
        description: 'Sail through the meeting point of five grand rivers at Panchamukhani. Visit local honey collector cooperatives, followed by hot lunch aboard before cruise back to Godkhali and AC drive to Kolkata.',
        meals: 'Breakfast & Traditional Lunch',
        stay: 'Departure',
        highlights: ['Panchamukhani 5-River Confluence', 'Mangrove Honey Tasting', 'Kolkata Drop by 7 PM'],
      },
    ],
    includedActivities: [
      'Private Custom Motor Cruiser with Upper Sundeck',
      'All Forest Department Entry Permits & Boat Licenses',
      'Sajnekhali, Sudhanyakhali & Dobanki Watchtower Entries',
      'All 7 Regional Meals featuring authentic Sundarban fish and crab curries',
      'Evening Baul & Bonbibi Folk Performance',
      'Armed Forest Guard Escort & Expert Tracker Guide',
    ],
    inclusions: ['AC Coach transfer Kolkata-Godkhali roundtrip', 'Eco-resort stay', 'Mineral water & hot tea throughout'],
    exclusions: ['Professional video camera permit fees', 'Personal expenses'],
    assignedCaptain: CAPTAINS_DATA[2],
  },
  {
    id: 'sandakphu-singalila-ridge-trek',
    slug: 'sandakphu-singalila-ridge-trek',
    title: 'Sandakphu & Singalila Ridge Backpacking Trek',
    bengaliTitle: 'সান্দাকফু ও সিঙ্গারলীলা রিজ ব্যাকপ্যাকিং ট্রেক',
    tagline: 'Trek the border of India and Nepal to the summit of West Bengal with panoramic Sleeping Buddha views',
    destination: 'north-bengal-treks',
    destinationLabel: 'North Bengal Treks',
    type: 'backpacking-trek',
    typeLabel: 'Backpacking Trek',
    locationsCovered: ['Manebhanjan', 'Tonglu', 'Kalipokhri', 'Sandakphu Summit', 'Srikhola'],
    duration: '5N / 6D',
    days: 6,
    nights: 5,
    basePrice: 12999,
    discountPrice: 11499,
    rating: 4.95,
    reviewCount: 412,
    spotsLeft: 3,
    featured: true,
    isUpcoming: true,
    departureDate: '2026-10-31', // Leaves Today!
    trekSpecs: {
      difficulty: 'Moderate',
      altitude: '11,930 ft (3,636 m)',
      distance: '48 km over 5 days',
      fitnessLevel: 'Moderate cardio stamina required',
    },
    tags: ['#Sandakphu', '#HimalayanTrek', '#SleepingBuddha', '#SingalilaRidge'],
    interestCategories: ['Trekking', 'Hills', 'Campfire'],
    summary: 'Stand atop West Bengal’s highest point at 11,930 feet. Witness the legendary Sleeping Buddha cluster encompassing Kangchenjunga, Makalu, Lhotse, and Everest.',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    ],
    fallbackGradient: 'from-amber-950 to-stone-900',
    itinerary: [
      {
        day: 1,
        title: 'NJP to Manebhanjan Base Camp & Briefing',
        description: 'Drive from NJP through Sukna forest and Mirik tea gardens to the colorful border settlement of Manebhanjan. Equipment check, acclimatization stroll, and traditional Thukpa dinner.',
        meals: 'Dinner & Hot Himalayan Herbal Tea',
        stay: 'Trekker Lodge, Manebhanjan (6,400 ft)',
        highlights: ['Manebhanjan Border Town', 'Gear Check & Oximeter Vitals', 'Sherpa Lodge Dinner'],
      },
      {
        day: 2,
        title: 'Trek Manebhanjan to Tonglu via Chitre Monastery',
        description: 'Ascend steep rhododendron trails through Chitre monastery to Meghma. Enter Nepal border track and reach Tonglu overlooking the Darjeeling valley.',
        meals: 'Breakfast, Packed Trail Lunch, Hot Dinner',
        stay: 'Tonglu Mountain Huts (10,074 ft)',
        highlights: ['Chitre 100-yr Monastery', 'Rhododendron Forest Trail', 'Sunset on Kanchenjunga'],
      },
      {
        day: 3,
        title: 'Tonglu to Kalipokhri via Singalila National Park Checkpost',
        description: 'Gentle undulating ridgeline through Gairibas and Kaiyakatta. Reach the sacred black-water lake of Kalipokhri fringed with Tibetan prayer flags.',
        meals: 'All Meals Included',
        stay: 'Traditional Tea House, Kalipokhri (10,170 ft)',
        highlights: ['Singalila National Park Crossing', 'Sacred Kalipokhri Lake', 'Stargazing at 10,000 ft'],
      },
      {
        day: 4,
        title: 'Summit Push: Kalipokhri to Sandakphu (11,930 ft)',
        description: 'The final iconic push through Bikheybhanjyang (Valley of Poisonous Aconite plants). Stand on Sandakphu peak with unobstructed 360-degree vista of four of the world’s five highest mountains.',
        meals: 'All Meals Included',
        stay: 'Summit Lodge, Sandakphu (11,930 ft)',
        highlights: ['Summit of West Bengal', 'Grand Sleeping Buddha Panorama', 'Everest & Kanchenjunga Sunset'],
      },
      {
        day: 5,
        title: 'Descent from Sandakphu through Bamboo Jungles to Srikhola',
        description: 'Early dawn sunrise photograph. Steep scenic descent through oak, pine, and moss-draped bamboo forests to the suspension bridge village of Srikhola.',
        meals: 'All Meals Included',
        stay: 'River Lodge, Srikhola',
        highlights: ['Srikhola Suspension Bridge', 'Fresh River Trout Dinner', 'Bonfire Celebration'],
      },
      {
        day: 6,
        title: 'Srikhola to Rimbik & Drive back to NJP / Bagdogra',
        description: 'Short morning walk to Rimbik bazaar. Board private Jeeps for the scenic journey back to NJP or Bagdogra airport.',
        meals: 'Breakfast & Enroute Lunch',
        stay: 'Departure',
        highlights: ['Rimbik Organic Farm Valley', 'Return Transfer with Certificate of Completion'],
      },
    ],
    includedActivities: [
      'Certified HMI Mountaineering Lead & Local Sherpa Guides',
      'Singalila National Park Permits & Indo-Nepal Transit Clearance',
      'Full Trek Logistics: Porter Support for Heavy Backpacks (1 bag per trekker up to 10kg)',
      'High-Altitude Oxygen Cylinders, First Aid Kit & Daily Oximeter Logs',
      'All Tea House Lodgings with Thermal Blankets & Fresh Cooked Meals',
      'Roundtrip Jeeps NJP - Manebhanjan and Rimbik - NJP',
    ],
    inclusions: ['All meals during trek', 'Accommodations', 'Official Bengal Odyssey Trek Certificate'],
    exclusions: ['Personal trekking gear (boots, down jackets)', 'Mules for riding'],
    assignedCaptain: CAPTAINS_DATA[0],
  },
  {
    id: 'dooars-gorumara-jaldapara-wildlife',
    slug: 'dooars-gorumara-jaldapara-wildlife',
    title: 'Dooars Gorumara & Jaldapara Wildlife Expedition',
    bengaliTitle: 'ডুয়ার্স গরুমারা ও জলদাপাড়া অরণ্য অভিযান',
    tagline: 'Track One-Horned Rhinoceros, Asian Elephants, and leopards across Murti riverbanks',
    destination: 'dooars-terai',
    destinationLabel: 'Dooars & Terai',
    type: 'vacation-getaway',
    typeLabel: 'Vacation Getaway',
    locationsCovered: ['Lataguri', 'Gorumara National Park', 'Jaldapara Rhino Sanctuary', 'Murti River', 'Samsing & Suntalekhola'],
    duration: '3N / 4D',
    days: 4,
    nights: 3,
    basePrice: 11200,
    discountPrice: 9800,
    rating: 4.85,
    reviewCount: 195,
    spotsLeft: 5,
    featured: true,
    isUpcoming: false,
    departureDate: '2026-11-08',
    tags: ['#OneHornedRhino', '#ElephantSafari', '#JungleCottage', '#MurtiRiver'],
    interestCategories: ['Wildlife', 'Hills', 'Luxury Resorts'],
    summary: 'Venture into the heart of Dooars where the Himalayan foothills meet lush grasslands. Experience sunrise elephant safaris and riverbank campfire evenings.',
    heroImage: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    ],
    fallbackGradient: 'from-emerald-950 to-teal-900',
    itinerary: [
      {
        day: 1,
        title: 'NJP / Malbazar Arrival & Murti River Resort Check-in',
        description: 'Drive along Coronation Bridge across the roaring Teesta River. Arrive at luxury forest resort beside Murti river. Afternoon watchtower safari at Jatraprasad.',
        meals: 'Lunch, Tea & Forest Barbecue Dinner',
        stay: 'Murti Riverfront Wooden Resort, Lataguri',
        highlights: ['Teesta River Bridge View', 'Jatraprasad Rhino Tower', 'Tribal Dance Performance'],
      },
      {
        day: 2,
        title: 'Gorumara Morning Jeep Safari & Rocky Island Excursion',
        description: 'Early morning 4x4 Jeep Safari deep inside Gorumara core zone. Afternoon scenic drive to Samsing tea gardens and Rocky Island natural rock pools.',
        meals: 'All Meals Included',
        stay: 'Murti Riverfront Wooden Resort, Lataguri',
        highlights: ['Gorumara Core Zone Jeep Safari', 'Rocky Island River Bathing', 'Samsing Orange Orchards'],
      },
      {
        day: 3,
        title: 'Jaldapara Elephant Safari & South Khairbari Leopard Center',
        description: 'Transfer to Hollong / Jaldapara. Morning elephant-back safari tracking greater one-horned rhinoceros in tall elephant grass. Visit the South Khairbari leopard rehab forest.',
        meals: 'All Meals Included',
        stay: 'Jaldapara Eco Resort, Madarihat',
        highlights: ['Elephant-back Rhino Tracking', 'Hollong Salt Lick', 'Khairbari Forest Trail'],
      },
      {
        day: 4,
        title: 'Buxa Fort & Jayanti Riverbed Detour to Alipurduar / NJP',
        description: 'Visit the historic Buxa Fort and white dolomite riverbed of Jayanti before evening drop at Alipurduar or NJP station.',
        meals: 'Breakfast & Picnic Lunch',
        stay: 'Departure',
        highlights: ['Buxa Tiger Reserve Perimeter', 'Jayanti Riverbed', 'Train Station Drop'],
      },
    ],
    includedActivities: [
      'Gorumara Jeep Safari & Jatraprasad Watchtower Pass',
      'Jaldapara Elephant Back Rhino Tracking Pass',
      'Dedicated 4x4 Gypsy Safari Vehicles',
      'Certified Dooars Forest Naturalist',
      'All Resort Stays with Buffet Meals',
    ],
    inclusions: ['Transportation, Forest taxes, Accommodation'],
    exclusions: ['Camera fees', 'Personal laundry'],
    assignedCaptain: CAPTAINS_DATA[1],
  },
  {
    id: 'mandarmani-puri-coastal-scuba-escape',
    slug: 'mandarmani-puri-coastal-scuba-escape',
    title: 'Coastal Mandarmani & Puri Golden Beach Scuba Escape',
    bengaliTitle: 'মন্দারমণি ও পুরী গোল্ডেন বিচ স্কুবা এস্কেপ',
    tagline: 'Drive on Mandarmani sand, explore Chilika dolphin waters and snorkel off Puri coast',
    destination: 'coastal-puri',
    destinationLabel: 'Coastal Bengal & Puri',
    type: 'weekend-getaway',
    typeLabel: 'Weekend Getaway',
    locationsCovered: ['Mandarmani', 'Tajpur Pine Forests', 'Puri Golden Beach', 'Chilika Lake', 'Konark Sun Temple'],
    duration: '3N / 4D',
    days: 4,
    nights: 3,
    basePrice: 9499,
    discountPrice: 8299,
    rating: 4.75,
    reviewCount: 260,
    spotsLeft: 6,
    featured: false,
    isUpcoming: true,
    departureDate: '2026-11-05',
    tags: ['#BeachResort', '#ScubaSnorkel', '#ChilikaDolphins', '#KonarkHeritage'],
    interestCategories: ['Beach', 'Scuba Diving', 'Heritage', 'Luxury Resorts'],
    summary: 'Unwind along the gentle surf of Mandarmani, taste freshly caught jumbo prawns, spot Irrawaddy dolphins at Chilika Lake, and explore the ancient Konark Sun Temple.',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    ],
    fallbackGradient: 'from-blue-950 to-cyan-900',
    itinerary: [
      {
        day: 1,
        title: 'Kolkata Drive to Mandarmani Beach Resort',
        description: 'Morning pickup from Kolkata. Smooth 4-hour highway drive to Mandarmani. Check-in at private beachfront luxury cottages with direct beach access. Sunset quad biking and seafood barbecue.',
        meals: 'Lunch & Beach Barbecue Dinner',
        stay: 'Luxury Sea Resort, Mandarmani',
        highlights: ['Beach Driving Experience', 'Red Crab Colony Walk', 'Live Crab & Prawn Grill'],
      },
      {
        day: 2,
        title: 'Tajpur Pine Walk & Vande Bharat Transit to Puri',
        description: 'Morning yoga on Mandarmani beach. Walk through tranquil Tajpur pine forest. Afternoon swift rail connection to holy Puri. Check in at marine drive resort.',
        meals: 'Breakfast & Puri Grand Odia Thali',
        stay: 'Mayfair Waves / Heritage Beachfront, Puri',
        highlights: ['Tajpur Virgin Coast', 'Blue Flag Golden Beach Sunset', 'Jagannath Temple Darshan'],
      },
      {
        day: 3,
        title: 'Puri Coastal Scuba Diving & Chilika Dolphin Boat Ride',
        description: 'Morning introductory scuba diving and snorkeling session with PADI certified divemasters off Puri coast. Afternoon boat excursion in Chilika Lake (Satapada) spotting playful Irrawaddy dolphins.',
        meals: 'Breakfast & Seafood Lagoon Lunch',
        stay: 'Mayfair Waves / Heritage Beachfront, Puri',
        highlights: ['Scuba Snorkel Experience', 'Satapada Dolphin Spotting', 'Sea-mouth Island Picnic'],
      },
      {
        day: 4,
        title: 'Konark Sun Temple Architectural Tour & Return',
        description: 'Morning guided walk through the 13th-century Konark Sun Temple chariot wheels. Drive to Bhubaneswar airport / railway station for evening departure.',
        meals: 'Breakfast & Traditional Lunch',
        stay: 'Departure',
        highlights: ['UNESCO Konark Temple', 'Chandrabhaga Beach', 'Bhubaneswar Return'],
      },
    ],
    includedActivities: [
      'PADI Divemaster Supervised Scuba & Snorkel Session with Gear',
      'Chilika Lake Private Motorboat Dolphin Cruise',
      'Konark Sun Temple Historian Guided Walk',
      'All Luxury Beachfront Stays & Curated Coastal Meals',
      'AC Transfers Mandarmani to Puri and Bhubaneswar',
    ],
    inclusions: ['Resorts, Diving Gear, Boat Fees, Meals'],
    exclusions: ['Airfare', 'Personal water sports rentals'],
    assignedCaptain: CAPTAINS_DATA[4],
  },
  {
    id: 'sikkim-old-silk-route-zuluk',
    slug: 'sikkim-old-silk-route-zuluk',
    title: 'Old Silk Route Zuluk & High Glacial Lakes',
    bengaliTitle: 'রেশম পথ জুলুক ও সিকিম উচ্চ হিমবাহ লেক',
    tagline: 'Conquer the 32 hairpin loops of Zuluk, Baba Mandir, and crystal Tsomgo Lake',
    destination: 'sikkim-offbeat',
    destinationLabel: 'Sikkim & Offbeat',
    type: 'offbeat',
    typeLabel: 'Offbeat Exploration',
    locationsCovered: ['Aritar Lake', 'Zuluk 32 Loops', 'Gnathang Valley', 'Kupup Elephant Lake', 'Tsomgo Lake'],
    duration: '4N / 5D',
    days: 5,
    nights: 4,
    basePrice: 13800,
    discountPrice: 12200,
    rating: 4.88,
    reviewCount: 178,
    spotsLeft: 4,
    featured: false,
    isUpcoming: true,
    departureDate: '2026-11-06',
    tags: ['#OldSilkRoute', '#ZulukLoops', '#TsomgoLake', '#HighAltitude'],
    interestCategories: ['Hills', 'Heritage', 'Offbeat'],
    summary: 'Travel through ancient trader pathways where Tibetan caravans once trod. Marvel at the 32 zigzag curves of Zuluk and pristine frozen glacial lakes at 13,000+ feet.',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    ],
    fallbackGradient: 'from-indigo-950 to-sky-950',
    itinerary: [
      {
        day: 1,
        title: 'NJP to Aritar Lampokhari Lake',
        description: 'Drive along the Teesta valley to eastern Sikkim border. Arrive at emerald boot-shaped Lampokhari Lake in Aritar. Boating and visit to British Mankhim viewpoint.',
        meals: 'Lunch, Tea & Sikkim Traditional Dinner',
        stay: 'Aritar Heritage Homestay',
        highlights: ['Aritar Emerald Lake', 'Mankhim Kanchenjunga View', 'Organic Farm Cuisine'],
      },
      {
        day: 2,
        title: 'Enter Old Silk Route via Rongli to Zuluk',
        description: 'Process restricted area military permits at Rongli. Pass Rongli waterfall to the cliffside hamlet of Zuluk. Evening fireside butter tea and momos.',
        meals: 'All Meals Included',
        stay: 'Warm Wooden Homestay, Zuluk (9,400 ft)',
        highlights: ['Military Permit Border Check', 'Zuluk Mountain Village', 'Sikkimese Hearth Dinner'],
      },
      {
        day: 3,
        title: 'Thambi Viewpoint Sunrise over 32 Loops & Gnathang Valley',
        description: 'Dawn drive to Thambi viewpoint (11,200 ft) for golden sunrise over Kanchenjunga and the legendary 32 hairpin turns. Continue to high-altitude Gnathang valley.',
        meals: 'All Meals Included',
        stay: 'Heated Mountain Homestay, Gnathang (12,700 ft)',
        highlights: ['Thambi Viewpoint 32 Loops', 'Gnathang Valley (Ladakh of East)', 'Old Baba Mandir'],
      },
      {
        day: 4,
        title: 'Kupup Elephant Lake & Tsomgo Lake to Gangtok',
        description: 'Drive past Tukla valley battlefield, high-altitude golf course, and Elephant Lake (Kupup). Cross Nathu La corridor to the holy glacial Tsomgo (Changu) Lake and descend to Gangtok.',
        meals: 'Breakfast & Gangtok Welcome Dinner',
        stay: 'Boutique Hotel, MG Marg, Gangtok',
        highlights: ['Kupup Elephant Lake', 'Holy Tsomgo Glacial Lake', 'MG Marg Evening Walk'],
      },
      {
        day: 5,
        title: 'Gangtok Cable Car & Scenic Return to NJP / Bagdogra',
        description: 'Morning ride on the Gangtok ropeway cable car overlooking the valley. Scenic descent along Teesta to Siliguri.',
        meals: 'Breakfast & Highway Lunch',
        stay: 'Departure',
        highlights: ['Gangtok Ropeway', 'Teesta River Detour', 'Airport / Station Drop'],
      },
    ],
    includedActivities: [
      'Eastern Sikkim Inner Line Permits & Military Entry Passes',
      'Dedicated 4x4 Bolero / Scorpio with Snow-Chains for Silk Route',
      'All Homestay & Boutique Hotel Accommodations',
      'Traditional Himalayan Organic Meals & Morning Butter Tea',
      'Local Sherpa / Sikkimese Captain Guide',
    ],
    inclusions: ['Permits, Vehicles, Lodging, Meals'],
    exclusions: ['Nathu La pass special pass permit if closed by army', 'Personal shopping'],
    assignedCaptain: CAPTAINS_DATA[3],
  },
];

export const GALLERY_PHOTOS = [
  {
    id: 'g-1',
    category: 'Mountain Treks',
    title: 'Sleeping Buddha Ridge from Sandakphu',
    location: 'Sandakphu Summit, West Bengal',
    photographer: 'Subhendu Mukherjee',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g-2',
    category: 'Wildlife & Jungles',
    title: 'Royal Bengal Tiger Pugmarks on Tidal Creek',
    location: 'Sudhanyakhali, Sundarbans',
    photographer: 'Debabrata Mondal',
    url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g-3',
    category: 'Cultural & Heritage',
    title: 'Darjeeling Himalayan Toy Train at Batasia',
    location: 'Batasia Loop, Darjeeling',
    photographer: 'Heritage Archives',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'g-4',
    category: 'Coastal Serenity',
    title: 'Sunset over Mandarmani Waves',
    location: 'Mandarmani, Bay of Bengal',
    photographer: 'Sourav Banerjee',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g-5',
    category: 'Wildlife & Jungles',
    title: 'Wild Tusker Herd in Gorumara Grasslands',
    location: 'Gorumara National Park, Dooars',
    photographer: 'Ananya Roy',
    url: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'g-6',
    category: 'Mountain Treks',
    title: 'Zuluk 32 Zigzag Loops under Sunrise Glow',
    location: 'Old Silk Route, Sikkim-Bengal Border',
    photographer: 'Tenzing Sherpa',
    url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'g-7',
    category: 'Cultural & Heritage',
    title: 'Early Morning Tea Plucking in Happy Valley',
    location: 'Happy Valley Tea Estate, Darjeeling',
    photographer: 'Subhendu Mukherjee',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g-8',
    category: 'Coastal Serenity',
    title: 'Chilika Lake Irrawaddy Dolphin Waters',
    location: 'Satapada Lagoon, Chilika',
    photographer: 'Sourav Banerjee',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    aspect: 'aspect-[16/9]',
  },
];

export const BEST_SEASONS_DATA = [
  {
    id: 'sundarbans',
    destination: 'Sundarbans Delta',
    bengaliTitle: 'সুন্দরবন শীতকালীন নদী অভিযান',
    idealMonths: 'October to March',
    weather: '14°C – 25°C · Crisp morning river mist, calm tide waters and gentle sun',
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-emerald-950 via-stone-900 to-slate-900',
    slug: 'sundarbans',
    whyOptimal: 'During the winter months, royal Bengal tigers frequently step out of dense mangrove thickets to bask under the warm sun on mudflats along the riverbanks during low tides. Estuarine crocodiles and migratory Siberian birds are at peak density, and calm waterways make long boat safaris blissful.',
    keyActivities: ['Canopy walks at Dobanki', 'Creek boat safari in Pirkhali', 'Tidal mudflat tiger tracking', 'Migratory waterbird watching'],
    packagesCount: 3,
  },
  {
    id: 'darjeeling-hills',
    destination: 'Darjeeling & Hills',
    bengaliTitle: 'দার্জিলিং শরৎ ও বসন্তের রূপ',
    idealMonths: 'October to December & March to May',
    weather: '6°C – 18°C · Crystal-clear Himalayan skies with zero haze',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-amber-950 via-emerald-950 to-slate-900',
    slug: 'darjeeling-hills',
    whyOptimal: 'Post-monsoon October through December offers the clearest, uninterrupted views of the snow-crowned Kanchenjunga range from Tiger Hill and Batasia. Spring (March-May) witnesses the burst of bright red rhododendrons, magnolias and fresh flush tea leaves across the terraces.',
    keyActivities: ['Dawn view of Kanchenjunga from Tiger Hill', 'Heritage Toy Train steam loops', 'Tea harvest masterclasses', 'Glenary’s colonial evenings'],
    packagesCount: 4,
  },
  {
    id: 'dooars-terai',
    destination: 'Dooars & Terai',
    bengaliTitle: 'ডুয়ার্স ও তরাই পোস্ট-বর্ষা ঋতু',
    idealMonths: 'November to April',
    weather: '12°C – 26°C · Pleasant dry weather with cool river breezes',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-emerald-950 via-teal-950 to-slate-900',
    slug: 'dooars-terai',
    whyOptimal: 'Following the mandatory monsoon forest closure (June to September), the national parks re-open in October. The grasslands flourish with lush vegetation, animal waterholes are easily accessible, and morning elephant-back safaris reveal rhinos and gaurs with newborn calves.',
    keyActivities: ['Gorumara Jeep core safaris', 'Jaldapara elephant-back rhino rides', 'Murti riverbank bonfires', 'Rocky Island rock pool swimming'],
    packagesCount: 3,
  },
  {
    id: 'coastal-puri',
    destination: 'Coastal Bengal & Puri',
    bengaliTitle: 'উপকূলীয় বাংলা ও পুরী সোনালী সৈকত',
    idealMonths: 'September to March',
    weather: '18°C – 28°C · Gentle sea breeze, moderate humidity, warm surf',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-blue-950 via-cyan-950 to-slate-900',
    slug: 'coastal-puri',
    whyOptimal: 'Winter and post-monsoon months provide the ideal calm marine conditions for scuba diving, coastal trekking, and dolphin watching in Chilika Lake without monsoon swells or scorching summer heat.',
    keyActivities: ['Beach driving on Mandarmani sands', 'Snorkeling & Scuba off Puri', 'Irrawaddy dolphin catamaran rides', 'Konark Sun Temple heritage walk'],
    packagesCount: 3,
  },
  {
    id: 'north-bengal-treks',
    destination: 'Sandakphu & Singalila Treks',
    bengaliTitle: 'সান্দাকফু ট্রেকিং সিজন',
    idealMonths: 'October to December (Vistas) & April to May (Blooms)',
    weather: '-2°C to 12°C · Crisp alpine air, zero humidity and deep cobalt skies',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-amber-950 via-stone-900 to-slate-900',
    slug: 'north-bengal-treks',
    whyOptimal: 'October and November offer the most spectacular mountain visibility of the year: the iconic Sleeping Buddha range (Kanchenjunga) and Mount Everest are visible in razor-sharp clarity. In April-May, the Singalila ridge explodes into crimson and pink rhododendron flowers.',
    keyActivities: ['Singalila Ridge backpack trek', 'Summit sunset over Everest & Makalu', 'Kalipokhri black lake camp', 'Sherpa homestay hospitality'],
    packagesCount: 3,
  },
];
