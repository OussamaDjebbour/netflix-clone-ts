import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export const TMDBBASEURL = 'https://api.themoviedb.org/3';
export const TMDBORIGINALIMAGEURL = 'https://image.tmdb.org/t/p/original';
export const TMDBIMAGEURLSMALLSIZE = 'https://image.tmdb.org/t/p/w500';
export const PERCENTAGE_TRANSFORM = 100;

// Pagination configuration
export const PAGINATION_CONFIG = {
  MAX_PAGES: 20,
  INITIAL_PAGE: 1,
  OBSERVER_THRESHOLD: 0.1,
} as const;

// Genre configuration
export const GENRE_CONFIG = {
  INCLUDE_GENRES: [10751], // Family
  EXCLUDE_GENRES: [10749, 35], // Romance and Comedy
};

// Media types
export const MEDIA_TYPES = {
  MOVIE: 'movie',
  TV: 'tv',
} as const;

export const socialMediaLinks = [
  { icon: faFacebook, label: 'Facebook' },
  { icon: faInstagram, label: 'Instagram' },
  { icon: faTwitter, label: 'Twitter' },
  { icon: faYoutube, label: 'YouTube' },
];

export const footerLinks = [
  'Audio Description',
  'Help Center',
  'Gift Cards',
  'Media Center',
  'Investor Relations',
  'Jobs',
  'Terms of Use',
  'Privacy',
  'Legal Notices',
  'Cookie Preferences',
  'Corporate Information',
  'Contact Us',
];
