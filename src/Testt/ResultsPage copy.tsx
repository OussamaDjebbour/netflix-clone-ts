import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchResults } from '../hooks/useSearchResults';
// import { ResultsGrid } from './ResultsGrid';
import { LoadingSpinner } from './LoadingSpinner';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
// import { fetchFilteredResults } from '../types/tmdb';
import { useQueryClient } from '@tanstack/react-query';
import { fetchFilteredResults } from '../pages/fetchFilteredResults ';
import { SearchResult } from '../types/tmdb';
// import { ResultsGrid } from './components/ResultsGrid';
// import { LoadingSpinner } from './components/LoadingSpinner';
// import { useSearchResults } from './hooks/useSearchResults';

function ResultsPage() {
  const { query = 'the' } = useParams();
  const { ref, inView } = useInView({
    // triggerOnce: true,
    threshold: 0.2, // Trigger when 20% of the element is visible
  });
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: allFilteredResults,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchResults({
    query,
  });

  console.log('allFilteredResults', allFilteredResults);

  const queryClient = useQueryClient();

  // useEffect(() => {
  //   if (hasNextPage) {
  //     queryClient.prefetchQuery({
  //       queryKey: ['searchResults', query, currentPage + 1],
  //       queryFn: () =>
  //         fetchFilteredResults({ query, pageParam: currentPage + 1 }),
  //     });
  //   }
  // }, [query, currentPage, hasNextPage, queryClient]);

  // Prefetch next page when the current page data loads
  // useEffect(() => {
  //   if (allFilteredResults?.pages && hasNextPage) {
  //     const lastPage =
  //       allFilteredResults.pages[allFilteredResults.pages.length - 1];
  //     const nextPage = lastPage.nextPage;

  //     if (nextPage && !isFetchingNextPage) {
  //       queryClient.prefetchQuery({
  //         // ['searchResults', query, nextPage],
  //         // () => fetchFilteredResults({ query, pageParam: nextPage }),
  //         // // fetchFilteredResults({ query: { query, pageParam: nextPage } }),
  //         queryKey: ['prefetchSearchResults', query, nextPage],
  //         queryFn: () =>
  //           fetchFilteredResults({ query, pageParam: nextPage + 1 }),
  //       });
  //     }
  //   }
  // }, [allFilteredResults, hasNextPage, queryClient, query, isFetchingNextPage]);

  // useEffect(() => {
  //   const prefetchOrFetchNext = async () => {
  //     if (allFilteredResults?.pages && hasNextPage && !isFetchingNextPage) {
  //       const lastPage =
  //         allFilteredResults.pages[allFilteredResults.pages.length - 1];
  //       const nextPage = lastPage.nextPage;

  //       // Check if the current page data is empty
  //       const isCurrentPageEmpty = lastPage.results.length === 0;

  //       if (isCurrentPageEmpty) {
  //         // Prefetch the next page if current data is valid
  //         queryClient.prefetchQuery({
  //           queryKey: ['prefetchSearchResults', query, nextPage],
  //           queryFn: () => fetchFilteredResults({ query, pageParam: nextPage }),
  //         });
  //       } else if (nextPage) {
  //         // Use fetchNextPage to load the next page immediately
  //         await fetchNextPage();
  //       }
  //     }
  //   };

  //   prefetchOrFetchNext();
  // }, [
  //   allFilteredResults,
  //   hasNextPage,
  //   queryClient,
  //   query,
  //   isFetchingNextPage,
  //   fetchNextPage,
  // ]);

  // useEffect(() => {
  //   const prefetchUntilValid = async () => {
  //     if (hasNextPage && !isFetchingNextPage) {
  //       let nextPageToPrefetch =
  //         allFilteredResults?.pages[allFilteredResults.pages.length - 1]
  //           ?.nextPage;

  //       while (nextPageToPrefetch) {
  //         // Prefetch the next page
  //         await queryClient.prefetchQuery({
  //           queryKey: ['searchResults', query, nextPageToPrefetch],
  //           queryFn: () =>
  //             fetchFilteredResults({ query, pageParam: nextPageToPrefetch }),
  //         });

  //         // Check if the prefetch data has valid results
  //         const prefetchData = queryClient.getQueryData([
  //           'searchResults',
  //           query,
  //           nextPageToPrefetch,
  //         ]);

  //         if (prefetchData && prefetchData?.results?.length > 0) {
  //           break; // Stop prefetching when valid data is found
  //         }

  //         // Increment the next page if still invalid
  //         nextPageToPrefetch += 1;
  //       }
  //     }
  //   };

  //   prefetchUntilValid();
  // }, [allFilteredResults, hasNextPage, queryClient, query, isFetchingNextPage]);

  // useEffect(() => {
  //   const fetchNextValidPage = async () => {
  //     if (!isFetchingNextPage && hasNextPage) {
  //       let isValid = false;
  //       let nextPage =
  //         allFilteredResults?.pages[allFilteredResults.pages.length - 1]
  //           ?.nextPage;

  //       while (!isValid && nextPage) {
  //         // Fetch the next page
  //         const response = await fetchNextPage();

  //         // Check if the new data contains valid results
  //         const lastFetchedPage = response?.data?.pages?.slice(-1)?.[0];
  //         isValid = lastFetchedPage?.results?.length > 0;

  //         if (!isValid) {
  //           nextPage = lastFetchedPage?.nextPage; // Update next page
  //         }
  //       }
  //     }
  //   };

  //   if (allFilteredResults?.pages && hasNextPage) {
  //     const lastPage =
  //       allFilteredResults.pages[allFilteredResults.pages.length - 1];

  //     if (lastPage?.results?.length === 0) {
  //       fetchNextValidPage(); // Fetch until a valid page is found
  //     }
  //   }
  // }, [allFilteredResults, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
  }, [allFilteredResults, hasNextPage, queryClient, query, isFetchingNextPage]);

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  // useEffect(() => {
  //   const loadMoreResults = async () => {
  //     if (inView && !isFetchingNextPage) {
  //       if (hasNextPage) {
  //         await fetchNextPage();
  //       } else if (currentPage < 20) {
  //         setCurrentPage((prev) => prev + 1);
  //         await fetchNextPage();
  //       }
  //     }
  //   };

  //   loadMoreResults();
  // }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage, currentPage]);

  return (
    <div className="min-h-screen bg-black pt-14 text-gray-100">
      <div className="container mx-auto">
        <div className="p-6">
          <h1 className="mb-6 text-3xl font-bold text-purple-400">
            Search Results
          </h1>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allFilteredResults?.pages?.map((page) =>
              page.results.map((filteredResult) => (
                <MovieCard
                  key={filteredResult.id}
                  filteredResult={filteredResult}
                />
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

// import React, { useEffect, useState, useCallback } from 'react';
// import { useVirtual } from 'react-virtual';
// import { useInView } from 'react-intersection-observer';
// import { useSearchResults } from '../hooks/useSearchResults';
// import { LoadingSpinner } from './LoadingSpinner';
// import { MovieCard } from './MovieCard';
// import { useParams } from 'react-router-dom';
// import useDebounce from '../hooks/useDebounce';
// // import { useDebounce } from '../hooks/useDebounce';

// const ITEMS_PER_PAGE = 20;
// const SCROLL_THRESHOLD = 0.8;

// function ResultsPage() {
//   const { query = '' } = useParams();
//   const debouncedQuery = useDebounce(query, 200);
//   const [currentPage, setCurrentPage] = useState(1);
//   const parentRef = React.useRef<HTMLDivElement>(null);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isError,
//     isLoading,
//   } = useSearchResults({
//     query: debouncedQuery,
//     // query,
//     // page: currentPage,
//   });

//   const allItems = data?.pages.flatMap((page) => page.results) ?? [];

//   const rowVirtualizer = useVirtual({
//     size: allItems.length,
//     parentRef,
//     estimateSize: useCallback(() => 300, []), // Estimated height of each card
//     overscan: 5,
//   });

//   const { ref: intersectionRef } = useInView({
//     threshold: SCROLL_THRESHOLD,
//     onChange: (inView) => {
//       if (inView && !isFetchingNextPage && hasNextPage) {
//         setCurrentPage((prev) => Math.min(prev + 1, ITEMS_PER_PAGE));
//         fetchNextPage();
//       }
//     },
//   });

//   if (isError) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-black text-red-400">
//         <p>Error loading results. Please try again.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black pt-14 text-gray-100">
//       <div className="container mx-auto">
//         <div className="p-6">
//           <h1 className="mb-6 text-3xl font-bold text-purple-400">
//             Search Results
//           </h1>

//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {data?.pages?.map((page) =>
//               page.results.map((item) => (
//                 <MovieCard key={item.id} item={item} />
//               )),
//             )}
//           </div>

//           <div ref={intersectionRef} className="mt-8 text-center">
//             {isFetchingNextPage && <LoadingSpinner />}
//             {!hasNextPage && !isFetchingNextPage && (
//               <p className="text-gray-500">No more results</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//     // <div className="min-h-screen bg-black pt-14 text-gray-100">
//     //   <div className="container mx-auto">
//     //     <div className="p-6">
//     //       <h1 className="mb-6 text-3xl font-bold text-purple-400">
//     //         Search Results for "{query}"
//     //       </h1>

//     //       {isLoading ? (
//     //         <div className="flex justify-center">
//     //           <LoadingSpinner />
//     //         </div>
//     //       ) : (
//     //         <div ref={parentRef} className="h-[800px] overflow-auto">
//     //           <div
//     //             style={{
//     //               height: rowVirtualizer.totalSize,
//     //               width: '100%',
//     //               position: 'relative',
//     //             }}
//     //           >
//     //             {rowVirtualizer.virtualItems.map((virtualRow) => {
//     //               const item = allItems[virtualRow.index];
//     //               return (
//     //                 <div
//     //                   key={virtualRow.index}
//     //                   ref={
//     //                     virtualRow.index === allItems.length - 5
//     //                       ? intersectionRef
//     //                       : null
//     //                   }
//     //                   style={{
//     //                     position: 'absolute',
//     //                     top: 0,
//     //                     left: 0,
//     //                     width: '100%',
//     //                     transform: `translateY(${virtualRow.start}px)`,
//     //                   }}
//     //                 >
//     //                   <MovieCard item={item} />
//     //                 </div>
//     //               );
//     //             })}
//     //           </div>
//     //         </div>
//     //       )}

//     //       {isFetchingNextPage && (
//     //         <div className="mt-8 text-center">
//     //           <LoadingSpinner />
//     //         </div>
//     //       )}

//     //       {!hasNextPage && !isFetchingNextPage && allItems.length > 0 && (
//     //         <p className="mt-8 text-center text-gray-500">No more results</p>
//     //       )}
//     //     </div>
//     //   </div>
//     // </div>
//   );
// }

// export default ResultsPage;
