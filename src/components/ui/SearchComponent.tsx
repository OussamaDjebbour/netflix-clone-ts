import React, { useState } from 'react';
// import { searchTMDb } from './services/tmdbService';
import { SearchResult } from '../../types/tmdb';
import { searchMoviesAndTv } from '../../services/searchMoviesAndTv';

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState('');
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    if (query.trim() !== '') {
      console.log('clickedddddddddddddd');
      const searchResults = await searchMoviesAndTv(query, mediaType);
      setResults(searchResults);
    }
  };

  console.log('results', results);

  return (
    <div className="">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie or TV show..."
      />
      <select
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value as 'movie' | 'tv')}
      >
        <option value="movie">Movies</option>
        <option value="tv">TV Shows</option>
      </select>
      <button onClick={handleSearch}>Search</button>

      <div className="flex flex-col items-center gap-2.5 bg-black text-white">
        {results.map((result) => (
          <div
            key={result.id}
            className="mb-2.5 w-4/5 border border-[#ddd] p-2.5"
          >
            <h3>{result.title || result.name}</h3>
            <p>{result.overview}</p>
            {result.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                alt={result.title || result.name}
                className="max-w-24 rounded-md"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
