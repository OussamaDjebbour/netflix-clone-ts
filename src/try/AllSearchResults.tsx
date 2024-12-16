import React from 'react';
import { SearchResult } from '../types/tmdb';
import ResultCard from './ResultCard';
import LoadingSpinner from './LoadingSpinner';

interface AllSearchResultsProps {
  data: any;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  observerRef: (node?: Element | null) => void;
}

function AllSearchResults({
  data,
  isFetchingNextPage,
  hasNextPage,
  observerRef,
}: AllSearchResultsProps) {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Search Results</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.pages.map((page: any) =>
          page.results.map((item: SearchResult) => (
            <ResultCard key={item.id} item={item} />
          )),
        )}
      </div>

      <div ref={observerRef} className="mt-4 text-center">
        {isFetchingNextPage && <LoadingSpinner />}
        {!hasNextPage && !isFetchingNextPage && (
          <p className="text-gray-500">No more results</p>
        )}
      </div>
    </div>
  );
}

export default AllSearchResults;
