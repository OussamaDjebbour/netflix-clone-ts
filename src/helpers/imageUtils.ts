import { TMDBIMAGEURLSMALLSIZE } from '../constants';
import { SearchResult } from '../types/tmdb';

export function getImageUrl(item: SearchResult): string | null {
  if (item.backdrop_path) {
    return `${TMDBIMAGEURLSMALLSIZE}${item.backdrop_path}`;
  }
  if (item.poster_path) {
    return `${TMDBIMAGEURLSMALLSIZE}${item.poster_path}`;
  }
  return null;
}
