import { TMDBBASEURL } from '../constants';
import { SearchResponse, SearchResult } from '../types/tmdb';

export const searchMoviesAndTv = async (
  query: string,
  mediaType: 'movie' | 'tv',
): Promise<SearchResult[]> => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&include_adult=false&popularity.desc&language=en-US`,
    );
    const data = await response.json();

    // Filter results by media type and genres
    const filteredResults = data.results.filter((item: any) => {
      if (item.media_type === 'movie' || item.media_type === 'tv') {
        const genres = item.genre_ids || [];
        const includeGenres = [10751, 16]; // Family and Animation
        const excludeGenres = [10749, 35]; // Romance and Comedy

        // Include if it has any includeGenres and none of the excludeGenres
        return (
          genres.some((genre: number) => includeGenres.includes(genre)) &&
          !genres.some((genre: number) => excludeGenres.includes(genre))
        );
      }
      return false;
    });

    console.log(
      'filteredResultsfilteredResultsfilteredResultsfilteredResults',
      filteredResults,
      data.results,
    );
    // return data.results;

    // Sort filtered results by vote_average (rating) in descending order
    const sortedResults = filteredResults.sort(
      (a: any, b: any) => b.vote_average - a.vote_average,
    );
    // .map((item: any) => ({
    //   title: item.title || item.name, // Movies have 'title', TV shows have 'name'
    //   rating: item.vote_average, // Rating score
    //   mediaType: item.media_type, // 'movie' or 'tv'
    // }));

    return sortedResults;

    // genre_ids=28
    // const response = await fetch(
    //   `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&with_genres=10751,16&without_genres=10749,35&language=en-US`,
    // );

    // const response = await fetch(
    //   `${TMDBBASEURL}}/search/${mediaType}?api_key=${API_KEY}&query=${query}`,
    // );
    // const response = await fetch(
    //   `${TMDBBASEURL}}/search/${mediaType}?api_key=${API_KEY}&query=${encodeURIComponent(
    //     query,
    //   )}`,
    // );

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    // const data: SearchResponse = await response.json();
    // console.log('data.results', data.results);
    // return data.results;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};
