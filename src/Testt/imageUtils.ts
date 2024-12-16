import { SearchResult } from '../types/tmdb';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export function getImageUrl(item: SearchResult): string | null {
  if (item.backdrop_path) {
    return `${IMAGE_BASE_URL}${item.backdrop_path}`;
  }
  if (item.poster_path) {
    return `${IMAGE_BASE_URL}${item.poster_path}`;
  }
  return null;
}

// import { SearchResult } from '../types/tmdb';

// const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// export function getImageUrl(item: SearchResult): string | null {
//   if (!item) return null;

//   // Choose appropriate image size based on viewport
//   const getResponsiveSize = () => {
//     if (window.innerWidth < 640) return 'w342';
//     if (window.innerWidth < 1024) return 'w500';
//     return 'w780';
//   };

//   const size = getResponsiveSize();

//   if (item.backdrop_path) {
//     return `${IMAGE_BASE_URL}/${size}${item.backdrop_path}`;
//   }
//   if (item.poster_path) {
//     return `${IMAGE_BASE_URL}/${size}${item.poster_path}`;
//   }
//   return null;
// }
