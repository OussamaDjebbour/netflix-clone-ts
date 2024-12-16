import React, { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { fetchFilteredResults } from '../pages/fetchFilteredResults ';
import { useParams } from 'react-router-dom';

const InfiniteScrollWithPrefetch = () => {
  const { query = 'the' } = useParams();
  const queryClient = useQueryClient();
  const { ref, inView } = useInView(); // Hook to track the scroll into view

  const {
    data: allFilteredResults,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['searchResults', query],
    queryFn: ({ pageParam = 1 }) => fetchFilteredResults({ query, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage || null,
  });

  // Prefetch the next page in the background
  useEffect(() => {
    if (allFilteredResults?.pages && hasNextPage) {
      const lastPage =
        allFilteredResults.pages[allFilteredResults.pages.length - 1];
      const nextPage = lastPage?.nextPage;

      if (nextPage && !isFetchingNextPage) {
        queryClient.prefetchQuery({
          queryKey: ['searchResults', query, nextPage],
          queryFn: () => fetchFilteredResults({ query, pageParam: nextPage }),
        });
      }
    }
  }, [allFilteredResults, hasNextPage, query, queryClient, isFetchingNextPage]);

  // Lazy fetch when in view
  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Retry fetching if the current page is empty
  useEffect(() => {
    const fetchValidData = async () => {
      let nextPage =
        allFilteredResults?.pages[allFilteredResults.pages.length - 1]
          ?.nextPage;

      while (nextPage && !isFetchingNextPage) {
        const response = await fetchNextPage();
        const lastFetchedPage = response?.data?.pages?.slice(-1)?.[0];

        if (lastFetchedPage?.results?.length > 0) {
          break; // Stop fetching when valid data is found
        }

        nextPage = lastFetchedPage?.nextPage; // Update next page for retry
      }
    };

    const lastPage =
      allFilteredResults?.pages?.[allFilteredResults.pages.length - 1];
    if (lastPage?.results?.length === 0 && hasNextPage) {
      fetchValidData();
    }
  }, [allFilteredResults, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div>
      {allFilteredResults?.pages?.map((page, pageIndex) =>
        page.results.map((result, resultIndex) => (
          <div key={`${pageIndex}-${resultIndex}`}>
            {/* Render your result here */}
            <p>{result.title}</p>
          </div>
        )),
      )}
      {/* Loader at the bottom of the page */}
      <div ref={ref} style={{ height: '50px', background: 'transparent' }}>
        {isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </div>
  );
};

export default InfiniteScrollWithPrefetch;
