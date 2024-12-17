import { GENRE_CONFIG } from '../constants';
import { SearchResult } from '../types/tmdb';

export function filterResults(results: any[]): SearchResult[] {
  return results.filter((item) => {
    if (item.media_type === 'movie' || item.media_type === 'tv') {
      const genres = item.genre_ids || [];
      return (
        genres.some((genre: number) =>
          GENRE_CONFIG.INCLUDE_GENRES.includes(genre),
        ) &&
        !genres.some((genre: number) =>
          GENRE_CONFIG.EXCLUDE_GENRES.includes(genre),
        )
      );
    }
    return false;
  });
}
