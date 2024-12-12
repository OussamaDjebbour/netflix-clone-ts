import { TMDBBASEURL } from '../constants';
import { SearchResponse, SearchResult } from '../types/tmdb';

// export const searchMoviesAndTv = async (
//   query: string,
//   mediaType: 'movie' | 'tv',
// ): Promise<SearchResult[]> => {
//   const API_KEY = import.meta.env.VITE_API_KEY;
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&popularity.desc&language=en-US`,
//     );
//     const data = await response.json();

//     // Filter results by media type and genres
//     const filteredResults = data.results.filter((item: any) => {
//       if (item.media_type === 'movie' || item.media_type === 'tv') {
//         const genres = item.genre_ids || [];
//         const includeGenres = [10751, 16]; // Family and Animation
//         const excludeGenres = [10749, 35]; // Romance and Comedy

//         // Include if it has any includeGenres and none of the excludeGenres
//         return (
//           genres.every((genre: number) => includeGenres.includes(genre)) &&
//           !genres.every((genre: number) => excludeGenres.includes(genre))
//         );
//       }
//       return false;
//     });

//     console.log(
//       'filteredResultsfilteredResultsfilteredResultsfilteredResults',
//       filteredResults,
//       data.results,
//     );
//     // return data.results;

//     // Sort filtered results by vote_average (rating) in descending order
//     const sortedResults = filteredResults.sort(
//       (a: any, b: any) => b.vote_average - a.vote_average,
//     );
//     // .map((item: any) => ({
//     //   title: item.title || item.name, // Movies have 'title', TV shows have 'name'
//     //   rating: item.vote_average, // Rating score
//     //   mediaType: item.media_type, // 'movie' or 'tv'
//     // }));

//     return sortedResults;

//     // genre_ids=28
//     // const response = await fetch(
//     //   `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&with_genres=10751,16&without_genres=10749,35&language=en-US`,
//     // );

//     // const response = await fetch(
//     //   `${TMDBBASEURL}}/search/${mediaType}?api_key=${API_KEY}&query=${query}`,
//     // );
//     // const response = await fetch(
//     //   `${TMDBBASEURL}}/search/${mediaType}?api_key=${API_KEY}&query=${encodeURIComponent(
//     //     query,
//     //   )}`,
//     // );

//     // if (!response.ok) {
//     //   throw new Error(`HTTP error! Status: ${response.status}`);
//     // }

//     // const data: SearchResponse = await response.json();
//     // console.log('data.results', data.results);
//     // return data.results;
//   } catch (error) {
//     console.error('Error fetching search results:', error);
//     return [];
//   }
// };

// export const searchMoviesAndTv = async (
//   query: string,
//   mediaType: 'movie' | 'tv',
// ): Promise<SearchResult[]> => {
//   const API_KEY = import.meta.env.VITE_API_KEY;

//   if (!query.trim()) return []; // Prevent empty queries

//   try {
//     // Fetch the first page
//     const fetchPage = async (page: number) => {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${page}`,
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     };

//     // Fetch the first page of results
//     let data = await fetchPage(1);
//     console.log('dato', data);

//     // // If no results, fetch the second page
//     // if (!data.results || data.results.length === 0) {
//     //   console.log('No results on the first page. Fetching the second page...');
//     //   data = await fetchPage(2);
//     //   console.log('data1', data);
//     // }

//     // Filter results by media type and genres
//     let filteredResults = [];
//     filteredResults = data.results.filter((item: any) => {
//       if (item.media_type === 'movie' || item.media_type === 'tv') {
//         const genres = item.genre_ids || [];
//         const includeGenres = [10751]; // Family and Animation
//         const excludeGenres = [10749, 35]; // Romance and Comedy

//         // Include if it has any includeGenres and none of the excludeGenres
//         return (
//           genres.every((genre: number) => includeGenres.includes(genre)) &&
//           !genres.every((genre: number) => excludeGenres.includes(genre))
//         );
//       }
//       return false;
//     });

//     // If no results, fetch the second page
//     if (!filteredResults || filteredResults.length === 0) {
//       console.log('No results on the first page. Fetching the second page...');
//       data = await fetchPage(2);
//       console.log('data1', data);

//       filteredResults = data.results.filter((item: any) => {
//         if (item.media_type === 'movie' || item.media_type === 'tv') {
//           const genres = item.genre_ids || [];
//           const includeGenres = [10751]; // Family and Animation
//           const excludeGenres = [10749, 35]; // Romance and Comedy

//           // Include if it has any includeGenres and none of the excludeGenres
//           return (
//             genres.every((genre: number) => includeGenres.includes(genre)) &&
//             !genres.every((genre: number) => excludeGenres.includes(genre))
//           );
//         }
//         return false;
//       });
//     }

//     // Sort filtered results by vote_average (rating) in descending order
//     const sortedResults = filteredResults.sort(
//       (a: any, b: any) => b.vote_average - a.vote_average,
//     );

//     return sortedResults;
//   } catch (error) {
//     console.error('Error fetching search results:', error);
//     return [];
//   }
// };

export const searchMoviesAndTv = async (
  query: string,
  mediaType: 'movie' | 'tv',
): Promise<SearchResult[]> => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  if (!query.trim()) return []; // Prevent empty queries

  try {
    // Fetch a specific page
    const fetchPage = async (page: number) => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${page}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    };

    let currentPage = 1; // Start with the first page
    // let totalPages = 1; // Will be updated dynamically
    let totalPages = 5;
    let filteredResults: SearchResult[] = [];

    let res;

    while (currentPage <= totalPages && filteredResults.length === 0) {
      // Fetch the current page
      const data = await fetchPage(currentPage);

      res = data.results;
      console.log('dato', data);
      console.log('currentPage', currentPage);
      // totalPages = data.total_pages; // Update the total pages based on the API response

      // Filter results by media type and genres
      const pageFilteredResults = data.results.filter((item: any) => {
        if (item.media_type === 'movie' || item.media_type === 'tv') {
          const genres = item.genre_ids || [];
          const includeGenres = [10751]; // Family and Animation
          const excludeGenres = [10749, 35]; // Romance and Comedy

          // Include if it has any includeGenres and none of the excludeGenres
          return (
            genres.some((genre: number) => includeGenres.includes(genre)) &&
            !genres.some((genre: number) => excludeGenres.includes(genre))
          );
        }
        return false;
      });

      // Add the filtered results from the current page
      filteredResults = filteredResults.concat(pageFilteredResults);

      currentPage++; // Move to the next page
    }

    // Sort all filtered results by vote_average (rating) in descending order
    const sortedResults = filteredResults.sort(
      (a: any, b: any) => b.vote_average - a.vote_average,
    );

    console.log('sortedResultssortedResults', sortedResults);

    // return sortedResults;
    return res;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

// export const searchMoviesAndTv = async (
//   query: string,
//   mediaType: 'movie' | 'tv',
// ): Promise<SearchResult[]> => {
//   const API_KEY = import.meta.env.VITE_API_KEY;

//   if (!query.trim()) return []; // Prevent empty queries

//   try {
//     // Fetch the first page
//     const fetchPage = async (page: number) => {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&language=en-US&page=${page}`,
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       return response.json();
//     };

//     // Fetch the first page of results
//     let data = await fetchPage(1);
//     console.log('dato', data);

//     // If no results, fetch the second page
//     if (!data.results || data.results.length === 0) {
//       console.log('No results on the first page. Fetching the second page...');
//       data = await fetchPage(2);
//       console.log('data1', data);
//     }

//     // Filter results by media type and genres
//     const filteredResults = data.results.filter((item: any) => {
//       if (item.media_type === 'movie' || item.media_type === 'tv') {
//         const genres = item.genre_ids || [];
//         const includeGenres = [10751]; // Family and Animation
//         const excludeGenres = [10749, 35]; // Romance and Comedy

//         // Include if it has any includeGenres and none of the excludeGenres
//         return (
//           genres.every((genre: number) => includeGenres.includes(genre)) &&
//           !genres.every((genre: number) => excludeGenres.includes(genre))
//         );
//       }
//       return false;
//     });

//     // Sort filtered results by vote_average (rating) in descending order
//     const sortedResults = filteredResults.sort(
//       (a: any, b: any) => b.vote_average - a.vote_average,
//     );

//     return sortedResults;
//   } catch (error) {
//     console.error('Error fetching search results:', error);
//     return [];
//   }
// };
