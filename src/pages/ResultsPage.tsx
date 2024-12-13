import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
// import { fetchFilteredResults } from './fetchFilteredResults';
import { SearchResult } from '../types/tmdb';
import { fetchFilteredResults } from './fetchFilteredResults ';

function ResultsPage() {
  const query = 'the';
  const [mediaType, setMediaType] = useState('all');
  const { ref, inView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [query, mediaType] as const,
      queryFn: ({ pageParam = 1 }) =>
        fetchFilteredResults({ queryKey: [query, mediaType], pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialPageParam: 1,
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
    <div className="min-h-screen bg-black pt-14 text-gray-100">
      <div className="container mx-auto">
        <div className="p-6">
          <h1 className="mb-6 text-3xl font-bold text-purple-400">
            Search Results
          </h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.pages.map((page: any) =>
              page.results.map((item: SearchResult) => (
                <div
                  key={item.id}
                  className="group rounded-lg bg-gray-900 p-4 shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-purple-500/20"
                >
                  {(item.backdrop_path || item.poster_path) && (
                    <div
                      className="relative aspect-video overflow-hidden rounded-lg"
                      // className="overflow-hidden rounded-lg"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
                        alt={item.title || item.name}
                        // className="w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
                        className="absolute inset-0 h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <h2 className="mt-4 text-xl font-semibold text-purple-300">
                    {item.title || item.name}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-400">
                    {item.overview}
                  </p>
                </div>
              )),
            )}
          </div>

          <div ref={ref} className="mt-8 text-center">
            {isFetchingNextPage && (
              <div
                className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
                aria-label="Loading"
              ></div>
            )}
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
