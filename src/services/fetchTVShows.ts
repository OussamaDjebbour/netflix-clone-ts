import { TMDBBASEURL } from '../constants';
import { getDateMonthBefore } from '../helpers/getDateMonthBefore';
import { getDateThreeMonthsAfter } from '../helpers/getDateThreeMonthsAfter';

// export const fetchTVShows = async (
//   tvList: string,
//   mediaType: string,
//   page: number = 1,
//   moviesPerPage: number,
// ) => {
//   const API_KEY = import.meta.env.VITE_API_KEY;
//   const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
//   const url =
//     tvList !== 'trending'
//       ? `${TMDB_BASE_URL}/${mediaType === 'movies' ? 'movie' : 'tv'}/${tvList}?api_key=${API_KEY}&language=en-US&page=${page}&limit=${moviesPerPage}`
//       : `${TMDB_BASE_URL}/${tvList}/${mediaType === 'movies' ? 'movie' : 'tv'}/day?api_key=${API_KEY}&language=en-US&page=${page}&limit=${moviesPerPage}`;

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch movies');
//   }

//   const data = await response.json();
//   return data.results; // Returns only the results (movies) for the current page
// };

// export const fetchTVShows = async (
//   tvList: string,
//   mediaType: string,
//   page: number = 1,
// ) => {
//   const API_KEY = import.meta.env.VITE_API_KEY;
//   const url =
//     tvList !== 'trending'
//       ? `${TMDBBASEURL}/${mediaType === 'movies' ? 'movie' : 'tv'}/${tvList}?api_key=${API_KEY}&language=en-US&page=${page}`
//       : `${TMDBBASEURL}/${tvList}/${mediaType === 'movies' ? 'movie' : 'tv'}/day?api_key=${API_KEY}&language=en-US&page=${page}`;
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch TV show details');
//   }
//   const data = await response.json();
//   console.log('datadatadatadatadata', data, page);
//   return {
//     results: data.results,
//     page: data.page,
//     total_pages: data.total_pages,
//   };
// };

// export const fetchTVShows = async (
//   tvList: string,
//   mediaType: string,
//   // page: number = 1,
// ) => {
//   const API_KEY = import.meta.env.VITE_API_KEY;

//   // console.log('pagepagepagepagepagepagepagepagepagepagepagepagepage', page);

//   const url =
//     tvList !== 'trending'
//       ? `${TMDBBASEURL}/${mediaType === 'movies' ? 'movie' : 'tv'}/${tvList}?api_key=${API_KEY}&with_genres=16&language=en-US&page=${1}`
//       : `${TMDBBASEURL}/${tvList}/${mediaType === 'movies' ? 'movie' : 'tv'}/day?api_key=${API_KEY}&with_genres=16&language=en-US&page=${1}`;

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch TV show details');
//   }
//   const data = await response.json();
//   console.log(
//     'Return all results for the pageReturn all results for the pageReturn all results for the page',
//     data.results,
//   );
//   return data.results; // Return all results for the page
// };

// export const fetchTVShows = async (tvList: string, mediaType: string) => {
//   const API_KEY = import.meta.env.VITE_API_KEY;
//   const genreId = 16; // Animation genre ID
//   let sortBy = '';

//   console.log('tvListtvListtvListtvList', tvList);

//   // Set the sort_by parameter based on the list type
//   switch (tvList) {
//     case 'popular':
//       sortBy = 'popularity.desc';
//       break;
//     case 'top_rated':
//       sortBy = 'vote_average.desc';
//       break;
//     case 'trending':
//       // trending uses a different endpoint (handled separately)
//       break;
//     default:
//       sortBy = 'popularity.desc'; // Default to popular
//     // sortBy = 'vote_average.desc'; // Default to popular
//   }

//   let url = '';

//   if (tvList === 'trending') {
//     // For trending, we use the 'trending' endpoint
//     url = `https://api.themoviedb.org/3/trending/${mediaType === 'movies' ? 'movie' : 'tv'}/day?api_key=${API_KEY}&language=en-US`;
//   } else {
//     // For popular, top-rated, etc., we use the 'discover' endpoint
//     url = `https://api.themoviedb.org/3/discover/${mediaType === 'movies' ? 'movie' : 'tv'}?api_key=${API_KEY}&language=en-US&page=1&sort_by=${sortBy}`;
//   }

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch content');
//   }

//   const data = await response.json();
//   console.log('Filtered Animation Content:', data.results);
//   return data.results;
// };

// export const fetchTVShows = async (tvList: string, mediaType: string) => {
//   const API_KEY = import.meta.env.VITE_API_KEY;
//   const genreId = 16; // Animation genre ID
//   let sortBy = '';
//   let endpoint = ''; // Endpoint to use if not using discover
//   let isDiscover = false; // Flag to check whether to use discover

//   // Set the sort_by parameter and endpoints based on the list type
//   switch (tvList) {
//     case 'popular':
//       sortBy = 'popularity.desc';
//       isDiscover = true;
//       break;
//     case 'top_rated':
//       sortBy = 'vote_average.desc';
//       isDiscover = true;
//       break;
//     case 'now_playing':
//       endpoint = `${mediaType === 'movies' ? 'movie/now_playing' : 'tv/on_the_air'}`;
//       break;
//     case 'upcoming':
//       endpoint = `movie/upcoming`;
//       break;
//     case 'trending':
//       // trending uses a different endpoint (handled separately)
//       break;
//     default:
//       sortBy = 'popularity.desc'; // Default to popular
//       isDiscover = true;
//   }

//   let url = '';

//   if (tvList === 'trending') {
//     // For trending, we use the 'trending' endpoint
//     url = `https://api.themoviedb.org/3/trending/${mediaType === 'movies' ? 'movie' : 'tv'}/day?api_key=${API_KEY}&language=en-US`;
//   } else if (isDiscover) {
//     // For popular, top-rated, etc., we use the 'discover' endpoint with genre filter
//     url = `https://api.themoviedb.org/3/discover/${mediaType === 'movies' ? 'movie' : 'tv'}?api_key=${API_KEY}&language=en-US&page=1&with_genres=${genreId}&sort_by=${sortBy}`;
//   } else {
//     // For now playing and upcoming, use their specific endpoints with genre filtering
//     url = `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=en-US&page=1&with_genres=${genreId}`;
//   }

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch content');
//   }

//   const data = await response.json();
//   console.log('Filtered Animation Content:', data.results);
//   return data.results;
// };

export const fetchTVShows = async (
  tvList: string,
  mediaType: string,
  currentIndex: number,
  moviesPerPage: number,
) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  console.log('tvListtvListtvList', tvList, tvList === 'upcoming');

  let url = '';

  switch (tvList) {
    case 'popular':
      url = `${TMDBBASEURL}/discover/${mediaType === 'movies' ? 'movie' : 'tv'}?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&without_genres=10749,35&with_genres=10751`;
      break;
    case 'top rated':
      url = `${TMDBBASEURL}/discover/${mediaType === 'movies' ? 'movie' : 'tv'}?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=10749,35&vote_count.gte=200&with_genres=10751`;

      break;
    case 'now playing':
      url = `${TMDBBASEURL}/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${getDateMonthBefore()}&release_date.lte=${new Date().toISOString()}&without_genres=10749,35&with_genres=10751`;
      break;
    case 'on_the_air':
      url = `${TMDBBASEURL}/discover/tv?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${getDateMonthBefore()}&release_date.lte=${new Date().toISOString()}&without_genres=10749,35&with_genres=10751`;
      break;
    case 'upcoming':
      url = `${TMDBBASEURL}/discover/${mediaType === 'movies' ? 'movie' : 'tv'}?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${new Date().toISOString()}&release_date.lte=${getDateThreeMonthsAfter()}`;
      // url = `${TMDBBASEURL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&without_genres=10749,35&with_genres=10751`;
      break;
    case 'trending':
      // url = `${TMDBBASEURL}/trending/movie/day?api_key=${API_KEY}&language=en-US&without_genres=10749,35&with_genres=10751`;
      // url = `${TMDBBASEURL}/trending/movie/day?api_key=${API_KEY}&language=en-US&without_genres=10749,35&with_genres=10751`;
      // url = `${TMDBBASEURL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&without_genres=10749,35&with_genres=10751`;

      break;

    default:
  }

  // url = `${TMDBBASEURL}/discover/${mediaType === 'movies' ? 'movie' : 'tv'}?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=10749,10755&vote_count.gte=200&with_genres=16`;;

  // const url =
  //   tvList !== 'trending'
  //     ? `${TMDBBASEURL}/${mediaType === 'movies' ? 'movie' : 'tv'}/${tvList}?api_key=${API_KEY}&language=en-US&page=${1}`
  //     : `${TMDBBASEURL}/${tvList}/${mediaType === 'movies' ? 'movie' : 'tv'}/day?api_key=${API_KEY}&language=en-US&page=${1}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch TV show details');
  }
  const data = await response.json();
  const tvShows = data.results.slice(0, 20);
  // const tvShows = data.results.slice(
  //   currentIndex,
  //   currentIndex + moviesPerPage,
  // );
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
