import { TMDBBASEURL } from '../constants';
import { getDateMonthBefore } from '../helpers/getDateMonthBefore';
import { getDateThreeMonthsAfter } from '../helpers/getDateThreeMonthsAfter';

export const fetchMoviesAndTVShows = async (
  tvList: string,
  mediaType: string,
) => {
  try {
    const API_KEY = import.meta.env.VITE_API_KEY;

    let url = '';

    switch (tvList) {
      case 'popular':
        url = `${TMDBBASEURL}/discover/${mediaType}?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&without_genres=10749,35&with_genres=10751,16`;
        break;
      case 'top rated':
        url = `${TMDBBASEURL}/discover/${mediaType}?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=10749,35&vote_count.gte=200&with_genres=10751,16`;

        break;
      case 'now playing':
        url = `${TMDBBASEURL}/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${getDateMonthBefore()}&release_date.lte=${new Date().toISOString()}&without_genres=10749,35&with_genres=10751,16`;
        break;
      case 'on_the_air':
        url = `${TMDBBASEURL}/discover/tv?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${getDateMonthBefore()}&release_date.lte=${new Date().toISOString()}&without_genres=10749,35&with_genres=10751,16`;
        break;
      case 'upcoming':
        url = `${TMDBBASEURL}/discover/${mediaType}?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10751,16&without_genres=10749,35&with_release_type=2|3&release_date.gte=${new Date().toISOString()}&release_date.lte=${getDateThreeMonthsAfter()}`;
        break;

      default:
        url = `${TMDBBASEURL}/discover/${mediaType}?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=10749,35&vote_count.gte=200&with_genres=10751,16`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      // throw new Error('Failed to fetch TV show details');
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    const tvShows = data.results.slice(0, 20);
    return tvShows;
  } catch (error) {
    // Rethrow any fetch errors
    throw new Error(`Fetch failed: ${error}`);
  }
};
