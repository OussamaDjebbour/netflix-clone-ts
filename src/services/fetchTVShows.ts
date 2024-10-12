import { useSearchParams } from 'react-router-dom';
import { TMDBBASEURL } from '../constants';

// fetchTVShows.ts
export const fetchTVShows = async (tvList: string, mediaType: string) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  // const url =
  //   tvList !== 'trending'
  //     ? `${TMDBBASEURL}/tv/${tvList}?api_key=${API_KEY}&language=en-US&page=1`
  //     : `${TMDBBASEURL}/${tvList}/tv/day?api_key=${API_KEY}&language=en-US`;

  const url =
    tvList !== 'trending'
      ? `${TMDBBASEURL}/${mediaType === 'movies' ? 'movie' : 'tv'}/${tvList}?api_key=${API_KEY}&language=en-US&page=1`
      : `${TMDBBASEURL}/${tvList}/${mediaType === 'movies' ? 'movie' : 'tv'}/day?api_key=${API_KEY}&language=en-US`;

  // const url = (() => {
  //   const baseType = mediaType === 'movies' ? 'tv' : 'movie';
  //   // mediaType === 'movies'
  //   //   ? 'movie'
  //   //   : mediaType === 'tv-shows'
  //   //     ? 'tv'
  //   //     : 'movies';

  //   // Adjust URL structure based on mediaType and tvList
  //   if (tvList === 'trending') {
  //     return `${TMDBBASEURL}/trending/${baseType}/day?api_key=${API_KEY}&language=en-US`;
  //   } else {
  //     return `${TMDBBASEURL}/${baseType}/${tvList}?api_key=${API_KEY}&language=en-US&page=1`;
  //   }
  // })();

  console.log('urlurlurlurlurlurlurlurl', url);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch TV show details');
  }
  const data = await response.json();
  const tvShows = data.results.slice(0, 20);
  console.log('tvShows', tvShows);
  return tvShows;
};

export const ftchTest = async () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/tv/latest?api_key=${API_KEY}&language=en-US&page=1`;
  //   `${TMDBBASEURL}/tv/${tvList}?api_key=${API_KEY}&language=en-US&page=1`

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch TV show details');
  }
  const data = await response.json();
  const tvShows = data;
  console.log('Latessssssst', tvShows);
  return tvShows;
};
