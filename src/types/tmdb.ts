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

// export { MovieDetailsResponse };
