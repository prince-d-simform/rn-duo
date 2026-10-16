import {
  DestinationCategory,
  type CategoryOption,
  type Destination,
  type DestinationDetails,
  type SavedCollection,
  type Trip,
  type UserPreferences,
  type UserProfile
} from '../types';
import Strings from './Strings';

/**
 * Builds a sized Unsplash image URL for a photo id.
 * @param {string} photoId - The Unsplash photo id.
 * @returns {string} The image URL.
 */
const unsplashImage = (photoId: string): string =>
  `https://images.unsplash.com/photo-${photoId}?w=800&q=70&auto=format&fit=crop`;

/**
 * Unsplash photo ids used by the mock destination data.
 */
const Photos = {
  santorini: '1570077188670-e3a8d69ac5ff',
  kyoto: '1493976040374-85c8e12f0c0e',
  bali: '1537996194471-e657df975ab4',
  maldives: '1540202404-a2f29016b523',
  lagoDiBraies: '1501785888041-af3ef285b470',
  porto: '1555881400-74d7acaacd8b',
  swissAlps: '1530122037265-a5f1f91d3b99',
  beachSunset: '1507525428034-b723cf961d3e',
  limestoneBay: '1504214208698-ea1916a2195a',
  aerialBeach: '1506929562872-bb421503ef21',
  karstIslands: '1528127269322-539801943592',
  seaTemple: '1518548419970-58e3b4079ab2',
  pineValley: '1464822759023-fed622ff2c3b'
} as const;

/**
 * Category filter options shown on the Explore screen.
 */
export const exploreCategories: CategoryOption[] = [
  { id: DestinationCategory.All, label: Strings.Explore.categoryAll },
  { id: DestinationCategory.Beaches, label: Strings.Explore.categoryBeaches },
  { id: DestinationCategory.Mountains, label: Strings.Explore.categoryMountains },
  { id: DestinationCategory.Cities, label: Strings.Explore.categoryCities },
  { id: DestinationCategory.Islands, label: Strings.Explore.categoryIslands },
  { id: DestinationCategory.Village, label: 'Village' }
];

/**
 * Mock data: popular destinations for the Explore carousel.
 * Replace with an API response when the backend is available.
 */
export const dummyPopularDestinations: Destination[] = [
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    rating: 4.8,
    priceFrom: 890,
    imageUrl: unsplashImage(Photos.santorini),
    categories: [DestinationCategory.Beaches, DestinationCategory.Islands]
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    rating: 4.9,
    priceFrom: 940,
    imageUrl: unsplashImage(Photos.kyoto),
    categories: [DestinationCategory.Cities]
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    rating: 4.7,
    priceFrom: 720,
    imageUrl: unsplashImage(Photos.bali),
    categories: [DestinationCategory.Beaches, DestinationCategory.Islands]
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    rating: 4.9,
    priceFrom: 1240,
    imageUrl: unsplashImage(Photos.maldives),
    categories: [DestinationCategory.Beaches, DestinationCategory.Islands]
  }
];

/**
 * Mock data: weekend escape destinations for the Explore list.
 * Replace with an API response when the backend is available.
 */
export const dummyWeekendDestinations: Destination[] = [
  {
    id: 'lago-di-braies',
    name: 'Lago di Braies',
    country: 'Italy',
    rating: 4.8,
    priceFrom: 420,
    imageUrl: unsplashImage(Photos.lagoDiBraies),
    categories: [DestinationCategory.Mountains]
  },
  {
    id: 'porto',
    name: 'Porto',
    country: 'Portugal',
    rating: 4.6,
    priceFrom: 310,
    imageUrl: unsplashImage(Photos.porto),
    categories: [DestinationCategory.Cities]
  },
  {
    id: 'zermatt',
    name: 'Zermatt',
    country: 'Switzerland',
    rating: 4.9,
    priceFrom: 560,
    imageUrl: unsplashImage(Photos.swissAlps),
    categories: [DestinationCategory.Mountains]
  },
  {
    id: 'tulum',
    name: 'Tulum',
    country: 'Mexico',
    rating: 4.5,
    priceFrom: 480,
    imageUrl: unsplashImage(Photos.beachSunset),
    categories: [DestinationCategory.Beaches]
  }
];

/**
 * Mock data: details for each destination, keyed by destination id.
 * Replace with an API response when the backend is available.
 */
export const dummyDestinationDetails: Record<string, DestinationDetails> = {
  santorini: {
    region: 'Cyclades',
    reviewCount: 1204,
    bestSeason: 'May–Oct',
    priceLevel: '€€€',
    nights: 5,
    tags: ['Oia sunset', 'Caldera views', 'Volcanic beaches', 'Wine'],
    description:
      'Whitewashed villages stacked over a flooded caldera. Come for the sunsets in Oia, stay for the black-sand beaches and the Assyrtiko.',
    experiences: [
      {
        id: 'caldera-sailing',
        title: 'Caldera sailing',
        meta: 'Half day · $95',
        imageUrl: unsplashImage(Photos.beachSunset)
      },
      {
        id: 'red-beach',
        title: 'Red beach',
        meta: 'Free · Akrotiri',
        imageUrl: unsplashImage(Photos.santorini)
      }
    ]
  },
  kyoto: {
    region: 'Kansai',
    reviewCount: 2310,
    bestSeason: 'Mar–May',
    priceLevel: '¥¥',
    nights: 6,
    tags: ['Temples', 'Tea houses', 'Gion', 'Bamboo grove'],
    description:
      'Lantern-lit lanes, wooden machiya and more than a thousand temples. Walk Gion at dusk and catch the morning quiet in the bamboo grove.',
    experiences: [
      {
        id: 'gion-walk',
        title: 'Gion evening walk',
        meta: '2 hours · $40',
        imageUrl: unsplashImage(Photos.kyoto)
      },
      {
        id: 'river-boat',
        title: 'Hozugawa river boat',
        meta: 'Half day · $55',
        imageUrl: unsplashImage(Photos.karstIslands)
      }
    ]
  },
  bali: {
    region: 'Ubud',
    reviewCount: 1876,
    bestSeason: 'Apr–Oct',
    priceLevel: '$$',
    nights: 7,
    tags: ['Rice terraces', 'Temples', 'Surf', 'Yoga'],
    description:
      'Lake temples in the highlands, rice terraces around Ubud and surf breaks along the south coast, with sunsets over the sea temples.',
    experiences: [
      {
        id: 'sea-temple-sunset',
        title: 'Sea temple sunset',
        meta: '3 hours · $25',
        imageUrl: unsplashImage(Photos.seaTemple)
      },
      {
        id: 'lake-temple',
        title: 'Lake temple visit',
        meta: 'Half day · $45',
        imageUrl: unsplashImage(Photos.bali)
      }
    ]
  },
  maldives: {
    region: 'North Malé Atoll',
    reviewCount: 954,
    bestSeason: 'Nov–Apr',
    priceLevel: '$$$$',
    nights: 5,
    tags: ['Overwater villas', 'Snorkeling', 'Sandbanks'],
    description:
      'Overwater villas above turquoise lagoons, house reefs a few strokes from your deck and sandbanks that appear only at low tide.',
    experiences: [
      {
        id: 'reef-snorkel',
        title: 'Reef snorkel',
        meta: 'Half day · $120',
        imageUrl: unsplashImage(Photos.aerialBeach)
      },
      {
        id: 'sandbank-picnic',
        title: 'Sandbank picnic',
        meta: '3 hours · $180',
        imageUrl: unsplashImage(Photos.maldives)
      }
    ]
  },
  'lago-di-braies': {
    region: 'Dolomites',
    reviewCount: 1432,
    bestSeason: 'Jun–Sep',
    priceLevel: '€€',
    nights: 2,
    tags: ['Rowing', 'Hiking', 'Alpine lake'],
    description:
      'An emerald lake under the Seekofel cliffs. Rent a wooden rowboat at dawn, then walk the easy loop trail around the shore.',
    experiences: [
      {
        id: 'rowboat',
        title: 'Rowboat hire',
        meta: '1 hour · $35',
        imageUrl: unsplashImage(Photos.lagoDiBraies)
      },
      {
        id: 'lake-loop',
        title: 'Lakeside loop trail',
        meta: 'Free · 4 km',
        imageUrl: unsplashImage(Photos.pineValley)
      }
    ]
  },
  porto: {
    region: 'Norte',
    reviewCount: 2087,
    bestSeason: 'May–Sep',
    priceLevel: '€',
    nights: 3,
    tags: ['Port wine', 'Ribeira', 'Azulejos'],
    description:
      'Tiled facades tumbling down to the Douro. Cross the iron bridge to the port lodges and end the day on the Ribeira waterfront.',
    experiences: [
      {
        id: 'douro-cruise',
        title: 'Six bridges cruise',
        meta: '1 hour · $20',
        imageUrl: unsplashImage(Photos.porto)
      },
      {
        id: 'cellar-tasting',
        title: 'Port cellar tasting',
        meta: '90 min · $25',
        imageUrl: unsplashImage(Photos.porto)
      }
    ]
  },
  zermatt: {
    region: 'Valais',
    reviewCount: 1150,
    bestSeason: 'Dec–Apr',
    priceLevel: '$$$$',
    nights: 3,
    tags: ['Matterhorn', 'Skiing', 'Car-free village'],
    description:
      'A car-free alpine village at the foot of the Matterhorn, with year-round glacier skiing and cog railways up to the high peaks.',
    experiences: [
      {
        id: 'mountain-railway',
        title: 'Mountain railway',
        meta: 'Half day · $120',
        imageUrl: unsplashImage(Photos.pineValley)
      },
      {
        id: 'village-walk',
        title: 'Old village walk',
        meta: 'Free · 2 km',
        imageUrl: unsplashImage(Photos.swissAlps)
      }
    ]
  },
  tulum: {
    region: 'Quintana Roo',
    reviewCount: 1689,
    bestSeason: 'Nov–Apr',
    priceLevel: '$$',
    nights: 4,
    tags: ['Mayan ruins', 'Cenotes', 'Beach clubs'],
    description:
      'Clifftop Mayan ruins above Caribbean water, jungle cenotes for a cool swim and a long strip of palm-lined beach.',
    experiences: [
      {
        id: 'cenote-swim',
        title: 'Cenote swim',
        meta: 'Half day · $60',
        imageUrl: unsplashImage(Photos.limestoneBay)
      },
      {
        id: 'ruins-sunrise',
        title: 'Ruins at sunrise',
        meta: '2 hours · $30',
        imageUrl: unsplashImage(Photos.beachSunset)
      }
    ]
  }
};

/**
 * Destination ids saved on first launch, in display order.
 */
export const defaultSavedDestinationIds: string[] = [
  'kyoto',
  'lago-di-braies',
  'bali',
  'porto',
  'zermatt'
];

/**
 * Mock data: the user's saved collections.
 * Replace with an API response when the backend is available.
 */
export const dummySavedCollections: SavedCollection[] = [
  { id: 'summer-2027', name: 'Summer 2027', destinationIds: ['lago-di-braies', 'porto', 'bali'] },
  { id: 'someday', name: 'Someday', destinationIds: ['kyoto', 'zermatt'] }
];

/**
 * Mock data: the user's planned trips.
 * Replace with an API response when the backend is available.
 */
export const dummyTrips: Trip[] = [
  {
    id: 'trip-santorini',
    destinationId: 'santorini',
    startDate: '2027-06-12',
    endDate: '2027-06-17'
  },
  { id: 'trip-kyoto', destinationId: 'kyoto' }
];

/**
 * Mock data: the signed-in traveler's profile.
 * Replace with an API response when the backend is available.
 */
export const dummyProfile: UserProfile = {
  name: 'Ava Moreno',
  memberSince: 2021,
  countriesVisited: 14,
  tripsTaken: 6
};

/**
 * All mock destinations, popular first.
 */
export const allDestinations: Destination[] = [
  ...dummyPopularDestinations,
  ...dummyWeekendDestinations
];

/**
 * Mock data: the signed-in traveler's app preferences.
 * Replace with an API response when the backend is available.
 */
export const dummyPreferences: UserPreferences = {
  notificationsEnabled: true,
  currency: 'USD',
  distanceUnit: 'km'
};
