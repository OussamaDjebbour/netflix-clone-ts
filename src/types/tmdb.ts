import { MediaProvider } from './../context/useMediaContext';
export interface Genre {
  id: number;
  name: string;
}

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

export interface MovieDetailsResponse {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
  vote_average: number;
  release_date: string;
  runtime: number;
  credits: {
    cast: { id: number; name: string; character: string }[];
  };
  videos: {
    results: { id: string; key: string; name: string }[];
  };
  reviews: {
    results: { id: string; author: string; content: string }[];
  };
  homepage: string;
  social_media: { facebook: string; twitter: string; instagram: string };
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

interface FetchParams {
  query: string;
  mediaType: string;
  pageParam: number;
}

export const fetchFilteredResults = async ({
  query,
  mediaType,
  pageParam,
}: FetchParams) => {
  if (!query.trim()) {
    return {
      results: [],
      // queryKey: ['search', query, mediaType],
      // lastPage:null
      nextPage: null,
      totalPages: 0,
    };
  }
};

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
