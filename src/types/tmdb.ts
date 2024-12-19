export interface Genre {
  id: number;
  name: string;
}

export type MediaType = 'movie' | 'tv';

export interface MovieTvDetails {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  last_air_date?: string;
  genres: Genre[];
  runtime?: number;
  vote_average: number;
  number_of_seasons?: number;
  popularity: number;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
  }[];
}

// Movie and TV show result interface
export interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: Date;
  vote_average: number;
  media_type?: string;
}

// API response interface
export interface SearchResponse {
  results: SearchResult[];
  total_results: number;
}

export interface TMDBResponse {
  results: any[];
  page: number;
  total_pages: number;
}

export interface SearchAllResultsResponse {
  results: SearchResult[];
  nextPage: number | null;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
}

export interface Video {
  site: string;
  type: string;
}
export interface DetailsProps {
  genres: Genre[];
  rating: number;
  releaseDate: string;
  firstEpisode: string;
  lastEpisode: string;
  runtime: number;
  numberOfSeasons: number;
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
  }[];
}
