import { memo } from 'react';
import { SearchResult } from '../../types/tmdb';
import MovieCard from './MovieCard';

interface SearchResultsProps {
  results: SearchResult[];
}

// Memoize the entire results grid to prevent unnecessary re-renders
export const AllSearchResults = memo(function SearchResults({
  results,
}: SearchResultsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {results.map((result) => (
        <MovieCard key={result.id} filteredResult={result} />
      ))}
    </div>
  );
});
