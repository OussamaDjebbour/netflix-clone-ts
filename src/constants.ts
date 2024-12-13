export const TMDBBASEURL = 'https://api.themoviedb.org/3';
export const TMDBIMAGEURL = 'https://image.tmdb.org/t/p/original';
export const PERCENTAGE_TRANSFORM = 100;
export const JIKAN_API = 'https://api.jikan.moe/v4';

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
} as const;

// Media types
export const MEDIA_TYPES = {
  MOVIE: 'movie',
  TV: 'tv',
} as const;
