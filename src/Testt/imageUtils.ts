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
