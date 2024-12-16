// import React, { useEffect, useMemo, useState } from 'react';
// import { useInView } from 'react-intersection-observer';
// import { useSearchResults } from '../hooks/useSearchResults';
// // import { ResultsGrid } from './ResultsGrid';
// import { LoadingSpinner } from './LoadingSpinner';
// import { useParams } from 'react-router-dom';
// import MovieCard from './MovieCard';
// // import { fetchFilteredResults } from '../types/tmdb';
// import { useQueryClient } from '@tanstack/react-query';
// // import { fetchFilteredResults } from '../pages/fetchFilteredResults ';
// import { SearchResult } from '../types/tmdb';
// import fetchFilteredResults from '../pages/fetchFilteredResults ';
// // import { ResultsGrid } from './components/ResultsGrid';
// // import { LoadingSpinner } from './components/LoadingSpinner';
// // import { useSearchResults } from './hooks/useSearchResults';

// function ResultsPage() {
//   const { query = 'the' } = useParams();
//   // const { ref, inView } = useInView({
//   //   // triggerOnce: true,
//   //   threshold: 0.2, // Trigger when 20% of the element is visible
//   // });
//   const { ref, inView } = useInView({
//     threshold: 0.5, // Trigger fetching when half the element is visible
//   });

//   const [currentPage, setCurrentPage] = useState(1);

//   const {
//     // data: allFilteredResults,
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isError,
//   } = useSearchResults({
//     query,
//   });

//   const allFilteredResults = useMemo(() => {
//     if (!data?.pages) {
//       return { pages: [], pageParams: [] }; // Match structure of useInfiniteQuery
//     }

//     // Flatten the results across all pages
//     const results = data.pages.flatMap((page) => page.results);

//     // Determine the next page for the last page of data
//     const lastPage = data.pages[data.pages.length - 1];
//     const nextPage =
//       lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null;

//     // Keep pageParams as it is (or modify if needed)
//     const pageParams = data.pageParams || [];

//     return {
//       pages: [{ results, nextPage }], // Flatten results while keeping structure
//       pageParams,
//     };
//   }, [data?.pages, data?.pageParams]); // Include pageParams in dependency array if needed

//   // const allFilteredResults = useMemo(() => {
//   //   if (!data?.pages) return { results: [], nextPage: null };

//   //   // Flatten the pages into a single array of results
//   //   const results = data.pages.flatMap((page) => page.results);

//   //   // Determine the next page if available
//   //   const lastPage = data.pages[data.pages.length - 1];
//   //   const nextPage =
//   //     lastPage.page < lastPage.total_pages ? lastPage.page + 1 : null;

//   //   return { results, nextPage };
//   // }, [data?.pages]);

//   // Memoize the results
//   // const allFilteredResults = useMemo(() => {
//   //   if (!data?.pages) return [];
//   //   // return data.pages.flatMap((page) => page.results);
//   //   return {
//   //     results: data.pages.flatMap((page) => page.results),
//   //     // results: data.results,
//   //     nextPage: pageParam < data.total_pages ? pageParam + 1 : null,
//   //   };
//   // }, [data?.pages]);
//   // const allFilteredResults = useMemo(() => {
//   //   if (!data?.results) return [];
//   //   return data.results;
//   // }, [data?.results]);

//   console.log('allFilteredResultsdata', allFilteredResults);
//   console.log('query', query);

//   const queryClient = useQueryClient();

//   // useEffect(() => {
//   //   if (hasNextPage) {
//   //     queryClient.prefetchQuery({
//   //       queryKey: ['searchResults', query, currentPage + 1],
//   //       queryFn: () =>
//   //         fetchFilteredResults({ query, pageParam: currentPage + 1 }),
//   //     });
//   //   }
//   // }, [query, currentPage, hasNextPage, queryClient]);

//   // Prefetch next page when the current page data loads
//   // useEffect(() => {
//   //   if (allFilteredResults?.pages && hasNextPage) {
//   //     const lastPage =
//   //       allFilteredResults.pages[allFilteredResults.pages.length - 1];
//   //     const nextPage = lastPage.nextPage;

//   //     if (nextPage && !isFetchingNextPage) {
//   //       queryClient.prefetchQuery({
//   //         // ['searchResults', query, nextPage],
//   //         // () => fetchFilteredResults({ query, pageParam: nextPage }),
//   //         // // fetchFilteredResults({ query: { query, pageParam: nextPage } }),
//   //         queryKey: ['prefetchSearchResults', query, nextPage],
//   //         queryFn: () =>
//   //           fetchFilteredResults({ query, pageParam: nextPage + 1 }),
//   //       });
//   //     }
//   //   }
//   // }, [allFilteredResults, hasNextPage, queryClient, query, isFetchingNextPage]);

//   // useEffect(() => {
//   //   const prefetchOrFetchNext = async () => {
//   //     if (allFilteredResults?.pages && hasNextPage && !isFetchingNextPage) {
//   //       const lastPage =
//   //         allFilteredResults.pages[allFilteredResults.pages.length - 1];
//   //       const nextPage = lastPage.nextPage;

//   //       // Check if the current page data is empty
//   //       const isCurrentPageEmpty = lastPage.results.length === 0;

//   //       if (isCurrentPageEmpty) {
//   //         // Prefetch the next page if current data is valid
//   //         queryClient.prefetchQuery({
//   //           queryKey: ['prefetchSearchResults', query, nextPage],
//   //           queryFn: () => fetchFilteredResults({ query, pageParam: nextPage }),
//   //         });
//   //       } else if (nextPage) {
//   //         // Use fetchNextPage to load the next page immediately
//   //         await fetchNextPage();
//   //       }
//   //     }
//   //   };

//   //   prefetchOrFetchNext();
//   // }, [
//   //   allFilteredResults,
//   //   hasNextPage,
//   //   queryClient,
//   //   query,
//   //   isFetchingNextPage,
//   //   fetchNextPage,
//   // ]);

//   // useEffect(() => {
//   //   const prefetchUntilValid = async () => {
//   //     if (hasNextPage && !isFetchingNextPage) {
//   //       let nextPageToPrefetch =
//   //         allFilteredResults?.pages[allFilteredResults.pages.length - 1]
//   //           ?.nextPage;

//   //       while (nextPageToPrefetch) {
//   //         // Prefetch the next page
//   //         await queryClient.prefetchQuery({
//   //           queryKey: ['searchResults', query, nextPageToPrefetch],
//   //           queryFn: () =>
//   //             fetchFilteredResults({ query, pageParam: nextPageToPrefetch }),
//   //         });

//   //         // Check if the prefetch data has valid results
//   //         const prefetchData = queryClient.getQueryData([
//   //           'searchResults',
//   //           query,
//   //           nextPageToPrefetch,
//   //         ]);

//   //         if (prefetchData && prefetchData?.results?.length > 0) {
//   //           break; // Stop prefetching when valid data is found
//   //         }

//   //         // Increment the next page if still invalid
//   //         nextPageToPrefetch += 1;
//   //       }
//   //     }
//   //   };

//   //   prefetchUntilValid();
//   // }, [allFilteredResults, hasNextPage, queryClient, query, isFetchingNextPage]);

//   // useEffect(() => {
//   //   const fetchNextValidPage = async () => {
//   //     if (!isFetchingNextPage && hasNextPage) {
//   //       let isValid = false;
//   //       let nextPage =
//   //         allFilteredResults?.pages[allFilteredResults.pages.length - 1]
//   //           ?.nextPage;

//   //       while (!isValid && nextPage) {
//   //         // Fetch the next page
//   //         const response = await fetchNextPage();

//   //         // Check if the new data contains valid results
//   //         const lastFetchedPage = response?.data?.pages?.slice(-1)?.[0];
//   //         isValid = lastFetchedPage?.results?.length > 0;

//   //         if (!isValid) {
//   //           nextPage = lastFetchedPage?.nextPage; // Update next page
//   //         }
//   //       }
//   //     }
//   //   };

//   //   if (allFilteredResults?.pages && hasNextPage) {
//   //     const lastPage =
//   //       allFilteredResults.pages[allFilteredResults.pages.length - 1];

//   //     if (lastPage?.results?.length === 0) {
//   //       fetchNextValidPage(); // Fetch until a valid page is found
//   //     }
//   //   }
//   // }, [allFilteredResults, hasNextPage, isFetchingNextPage, fetchNextPage]);

//   // useEffect(() => {
//   //   if (allFilteredResults?.pages && hasNextPage) {
//   //     const lastPage =
//   //       allFilteredResults.pages[allFilteredResults.pages.length - 1];
//   //     const nextPage = lastPage?.nextPage;

//   //     if (nextPage && !isFetchingNextPage) {
//   //       queryClient.prefetchQuery({
//   //         queryKey: ['searchResults', query, nextPage],
//   //         queryFn: () => fetchFilteredResults({ query, pageParam: nextPage }),
//   //       });
//   //     }
//   //   }
//   // }, [allFilteredResults, hasNextPage, queryClient, query, isFetchingNextPage]);

//   useEffect(() => {
//     if (inView && !isFetchingNextPage && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

//   // useEffect(() => {
//   //   const loadMoreResults = async () => {
//   //     if (inView && !isFetchingNextPage) {
//   //       if (hasNextPage) {
//   //         await fetchNextPage();
//   //       } else if (currentPage < 20) {
//   //         setCurrentPage((prev) => prev + 1);
//   //         await fetchNextPage();
//   //       }
//   //     }
//   //   };

//   //   loadMoreResults();
//   // }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage, currentPage]);

//   if (isError) {
//     return (
//       <div className="flex justify-center text-red-400">
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
//             {allFilteredResults?.pages?.map((page) =>
//               page.results.map((filteredResult) => (
//                 <MovieCard
//                   key={filteredResult.id}
//                   filteredResult={filteredResult}
//                 />
//               )),
//             )}
//           </div>

//           <div ref={ref} className="mt-8 text-center">
//             {isFetchingNextPage && <LoadingSpinner />}
//             {!hasNextPage && !isFetchingNextPage && (
//               <p className="text-gray-500">No more results</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResultsPage;

// import React, { memo, useEffect } from 'react';
// import { useInView } from 'react-intersection-observer';
// import { useSearchResults } from '../hooks/useSearchResults';
// import { useParams } from 'react-router-dom';
// import MovieCard from './MovieCard';
// import { LoadingSpinner } from './LoadingSpinner';

// const ResultsPage = memo(() => {
//   const { query = 'the' } = useParams();
//   const { ref, inView } = useInView({ threshold: 0.5 });

//   const {
//     data: allFilteredResults,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isError,
//   } = useSearchResults({ query });

//   useEffect(() => {
//     if (inView && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, isFetchingNextPage]);

//   if (isError) {
//     return (
//       <div className="flex min-h-screen justify-center text-red-400">
//         <p>Error loading results. Please try again.</p>
//       </div>
//     );
//   }

//   if (!allFilteredResults?.pages?.[0]?.results.length && !isFetchingNextPage) {
//     return (
//       <div className="flex min-h-screen justify-center text-gray-500">
//         <p>No results found for "{query}"</p>
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
//             {allFilteredResults?.pages?.map((page) =>
//               page.results.map((filteredResult) => (
//                 <MovieCard
//                   key={filteredResult.id}
//                   filteredResult={filteredResult}
//                 />
//               )),
//             )}
//           </div>

//           <div ref={ref} className="mt-8 text-center">
//             {isFetchingNextPage && <LoadingSpinner />}

//             {!hasNextPage && !isFetchingNextPage && (
//               <p className="text-gray-500">No more results</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// });

// export default ResultsPage;

// import React, { useEffect } from 'react';
// import { useInView } from 'react-intersection-observer';
// import { useSearchResults } from '../hooks/useSearchResults';
// import { useParams } from 'react-router-dom';
// import MovieCard from './MovieCard';
// import { LoadingSpinner } from './LoadingSpinner';

// function ResultsPage() {
//   const { query = 'the' } = useParams();
//   const { ref, inView } = useInView({ threshold: 0.5, delay: 300 });

//   const {
//     data: allFilteredResults,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isError,
//   } = useSearchResults({ query });

//   useEffect(() => {
//     if (inView && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

//   if (isError) {
//     return (
//       <div className="flex min-h-screen justify-center text-red-400">
//         <p>Error loading results. Please try again.</p>
//       </div>
//     );
//   }

//   if (!allFilteredResults?.pages?.[0]?.results.length && !isFetchingNextPage) {
//     return (
//       <div className="flex min-h-screen justify-center text-gray-500">
//         <p>No results found for "{query}"</p>
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
//             {allFilteredResults?.pages?.map((page) =>
//               page.results.map((filteredResult) => (
//                 <MovieCard
//                   key={filteredResult.id}
//                   filteredResult={filteredResult}
//                 />
//               )),
//             )}
//           </div>

//           <div ref={ref} className="mt-8 text-center">
//             {isFetchingNextPage && <LoadingSpinner />}
//             {!hasNextPage && !isFetchingNextPage && (
//               <p className="text-gray-500">No more results</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResultsPage;

import React, { useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchResults } from '../hooks/useSearchResults';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import { LoadingSpinner } from './LoadingSpinner';

function ResultsPage() {
  const { query = 'the' } = useParams();
  const { ref, inView } = useInView({
    threshold: 0.5,
    // Add delay to prevent rapid firing
    delay: 100,
  });

  const {
    data: allFilteredResults,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useSearchResults({ query });

  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (inView) {
      handleFetchNextPage();
    }
  }, [inView, handleFetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen justify-center text-red-400">
        <p>Error loading results. Please try again.</p>
      </div>
    );
  }

  const hasResults = allFilteredResults?.pages?.some(
    (page) => page.results.length > 0,
  );

  if (!hasResults && !isFetchingNextPage) {
    return (
      <div className="flex min-h-screen justify-center text-gray-500">
        <p>No results found for "{query}"</p>
      </div>
    );
  }

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

          {(hasNextPage || isFetchingNextPage) && (
            <div ref={ref} className="mt-8 text-center">
              {isFetchingNextPage && <LoadingSpinner />}
            </div>
          )}

          {!hasNextPage && !isFetchingNextPage && hasResults && (
            <p className="mt-8 text-center text-gray-500">No more results</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
