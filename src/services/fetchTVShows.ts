import { TMDBBASEURL } from '../constants';

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

export const fetchTVShows = async (tvList: string, mediaType: string) => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const genreId = 16; // Animation genre ID
  let sortBy = '';

  console.log('tvListtvListtvListtvList', tvList);

  // Set the sort_by parameter based on the list type
  switch (tvList) {
    case 'popular':
      sortBy = 'popularity.desc';
      break;
    case 'top_rated':
      sortBy = 'vote_average.desc';
      break;
    case 'trending':
      // trending uses a different endpoint (handled separately)
      break;
    default:
      sortBy = 'popularity.desc'; // Default to popular
    // sortBy = 'vote_average.desc'; // Default to popular
  }

  let url = '';

  if (tvList === 'trending') {
    // For trending, we use the 'trending' endpoint
    url = `https://api.themoviedb.org/3/trending/${mediaType === 'movies' ? 'movie' : 'tv'}/day?api_key=${API_KEY}&language=en-US`;
  } else {
    // For popular, top-rated, etc., we use the 'discover' endpoint
    url = `https://api.themoviedb.org/3/discover/${mediaType === 'movies' ? 'movie' : 'tv'}?api_key=${API_KEY}&language=en-US&page=1&sort_by=${sortBy}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch content');
  }

  const data = await response.json();
  console.log('Filtered Animation Content:', data.results);
  return data.results;
};

// export const fetchTVShows = async (
//   tvList: string,
//   mediaType: string,
//   currentPage: number,
//   moviesPerPage: number,
//   // page: number = 1,
// ) => {
//   const API_KEY = import.meta.env.VITE_API_KEY;
//   console.log(
//     'currentPagecurrentPagecurrentPagecurrentPagecurrentPage',
//     currentPage,
//   );

//   const url =
//     tvList !== 'trending'
//       ? `${TMDBBASEURL}/${mediaType === 'movies' ? 'movie' : 'tv'}/${tvList}?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`
//       : `${TMDBBASEURL}/${tvList}/${mediaType === 'movies' ? 'movie' : 'tv'}/day?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch TV show details');
//   }
//   const data = await response.json();
//   console.log('tvShows', data.results.slice(0, moviesPerPage));
//   // Return only the results for the current page
//   // return data.results.slice(0, 20); // Adjust this slice based on your needs
//   // return data.results.slice(moviesPerPage, moviesPerPage * 2);
//   return data.results.slice(0, moviesPerPage);
// };

// fetchTVShows.ts
// export const fetchTVShows = async (
//   tvList: string,
//   mediaType: string,
//   page: number = 1,
// ) => {
//   const API_KEY = import.meta.env.VITE_API_KEY;

//   // const url =
//   //   tvList !== 'trending'
//   //     ? `${TMDBBASEURL}/tv/${tvList}?api_key=${API_KEY}&language=en-US&page=1`
//   //     : `${TMDBBASEURL}/${tvList}/tv/day?api_key=${API_KEY}&language=en-US`;

//   const url =
//     tvList !== 'trending'
//       ? `${TMDBBASEURL}/${mediaType === 'movies' ? 'movie' : 'tv'}/${tvList}?api_key=${API_KEY}&language=en-US&page=${page}`
//       : `${TMDBBASEURL}/${tvList}/${mediaType === 'movies' ? 'movie' : 'tv'}/day?api_key=${API_KEY}&language=en-US&page=${page}`;

//   // const url = (() => {
//   //   const baseType = mediaType === 'movies' ? 'tv' : 'movie';
//   //   // mediaType === 'movies'
//   //   //   ? 'movie'
//   //   //   : mediaType === 'tv-shows'
//   //   //     ? 'tv'
//   //   //     : 'movies';

//   //   // Adjust URL structure based on mediaType and tvList
//   //   if (tvList === 'trending') {
//   //     return `${TMDBBASEURL}/trending/${baseType}/day?api_key=${API_KEY}&language=en-US`;
//   //   } else {
//   //     return `${TMDBBASEURL}/${baseType}/${tvList}?api_key=${API_KEY}&language=en-US&page=1`;
//   //   }
//   // })();

//   console.log('urlurlurlurlurlurlurlurl', url);

//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error('Failed to fetch TV show details');
//   }
//   const data = await response.json();
//   const tvShows = data.results.slice(0, 20);
//   console.log('tvShows', tvShows);
//   return tvShows;
// };

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
