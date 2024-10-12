// import { fetchAnimes } from './fetchAnime';
// import { TMDBBASEURL } from '../constants';

import { JIKAN_API } from '../constants';

// export const fetchAnimes = async () => {
//   const API_KEY = import.meta.env.VITE_API_KEY;
//   const url = `${TMDBBASEURL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&language=en-US&sort_by=popularity.desc
// `;
//   // ('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
//   // const url = `${TMDBBASEURL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch movie details');
//   }
//   const data = await response.json();
//   const animes = data.results.slice(0, 20);
//   console.log('animes', animes);
//   return animes;
// };

// const JIKAN_API = 'https://api.jikan.moe/v4';

// export const fetchPopularAnime = async () => {
export const fetchAnimes = async () => {
  try {
    const url = `${JIKAN_API}/top/anime`;
    const response = await fetch(url);
    const anime = await response.json();
    console.log('anime', anime.data);
    return anime.data; // Access the 'data' property containing the anime list
  } catch (error) {
    console.error('Error fetching anime data:', error);
    throw error;
  }
};
