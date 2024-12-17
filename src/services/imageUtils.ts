import { TMDBIMAGEURL } from '../constants';
import { SearchResult } from '../types/tmdb';

export function getImageUrl(item: SearchResult): string | null {
  if (item.backdrop_path) {
    return `${TMDBIMAGEURL}${item.backdrop_path}`;
  }
  if (item.poster_path) {
    return `${TMDBIMAGEURL}${item.poster_path}`;
  }
  return null;
}
