export interface Genre {
  id: number;
  name: string;
}

export type MediaType = 'movie' | 'tv';

export interface MovieTvDetails {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  genres: Genre[];
  runtime?: number;
  vote_average: number;
  popularity: number;
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
  media_type: string;
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
