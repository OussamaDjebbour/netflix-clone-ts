import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchResults } from '../hooks/useSearchResults';
// import { ResultsGrid } from './ResultsGrid';
import { LoadingSpinner } from './LoadingSpinner';
import { MovieCard } from './MovieCard';
import { useParams } from 'react-router-dom';
// import { ResultsGrid } from './components/ResultsGrid';
// import { LoadingSpinner } from './components/LoadingSpinner';
// import { useSearchResults } from './hooks/useSearchResults';

function ResultsPage() {
  // const query = 'breaking';
  const { query } = useParams();
  const [mediaType, setMediaType] = useState('movie');
  const { ref, inView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSearchResults({
      query: query || '',
      mediaType,
    });

  useEffect(() => {
    const loadMoreResults = async () => {
      if (inView && !isFetchingNextPage) {
        if (hasNextPage) {
          await fetchNextPage();
        } else if (currentPage < 20) {
          setCurrentPage((prev) => prev + 1);
          await fetchNextPage();
        }
      }
    };

    loadMoreResults();
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage, currentPage]);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="container mx-auto">
        <div className="p-6">
          <h1 className="mb-6 text-3xl font-bold text-purple-400">
            Search Results
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.pages?.map((page, index) =>
              page.results.map((item) => (
                <MovieCard key={item.id} item={item} />
              )),
            )}
          </div>

          <div ref={ref} className="mt-8 text-center">
            {isFetchingNextPage && <LoadingSpinner />}
            {!hasNextPage && !isFetchingNextPage && (
              <p className="text-gray-500">No more results</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
