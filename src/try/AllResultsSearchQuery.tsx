import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteSearch } from './hooks/useInfiniteSearch';
import { useIntersectionLoader } from './hooks/useIntersectionLoader';
import SearchResults from './components/SearchResults/SearchResults';
import { PAGINATION_CONFIG } from './config/constants';

export default function App() {
  const [currentPage, setCurrentPage] = useState(
    PAGINATION_CONFIG.INITIAL_PAGE,
  );

  const { ref, inView } = useInView({
    threshold: PAGINATION_CONFIG.OBSERVER_THRESHOLD,
    triggerOnce: false,
  });

  const query = 'lad'; // You can make this dynamic
  const mediaType = 'movie';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteSearch({
      query,
      mediaType,
    });

  useIntersectionLoader({
    inView,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    currentPage,
    setCurrentPage,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto">
        {data && (
          <SearchResults
            data={data}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            observerRef={ref}
          />
        )}
      </div>
    </div>
  );
}
