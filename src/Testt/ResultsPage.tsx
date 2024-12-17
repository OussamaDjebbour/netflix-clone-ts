// import React, { useEffect, useCallback } from 'react';
// import { useInView } from 'react-intersection-observer';
// import { useSearchResults } from '../hooks/useSearchResults';
// import { useParams } from 'react-router-dom';
// import { SearchResults } from '../kkk/SearchResults';
// import { LoadMoreTrigger } from '../kkk/Load';
// import { LoadingSpinner } from './LoadingSpinner';

// function ResultsPage() {
//   const { query = 'the' } = useParams();
//   const { ref, inView } = useInView({
//     threshold: 0.5,
//     delay: 100,
//   });

//   const {
//     data: allFilteredResults,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isError,
//     isLoading,
//   } = useSearchResults({ query });

//   const handleFetchNextPage = useCallback(() => {
//     if (hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//   useEffect(() => {
//     if (inView) {
//       handleFetchNextPage();
//     }
//   }, [inView, handleFetchNextPage]);

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex min-h-screen justify-center text-red-400">
//         <p>Error loading results. Please try again.</p>
//       </div>
//     );
//   }

//   const allResults =
//     allFilteredResults?.pages.flatMap((page) => page.results) ?? [];
//   const hasResults = allResults.length > 0;

//   if (!hasResults && !isFetchingNextPage && !hasNextPage) {
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

//           <SearchResults results={allResults} />

//           <LoadMoreTrigger
//             hasNextPage={hasNextPage}
//             isFetchingNextPage={isFetchingNextPage}
//             hasResults={hasResults}
//             triggerRef={ref}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResultsPage;

import React, { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchResults } from '../hooks/useSearchResults';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';
import { SearchResults } from '../kkk/SearchResults';
import { LoadMoreTrigger } from '../kkk/Load';

function ResultsPage() {
  const { query = 'the' } = useParams();
  const { ref, inView } = useInView({
    threshold: 0.5,
    rootMargin: '100px',
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useSearchResults({ query });

  console.log('data', data);

  // const allResults = data?.pages.flatMap((page) => page.results) ?? [];
  // Memoize all results to prevent unnecessary array operations
  const allResults = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data?.pages],
  );
  // const allResults = useMemo(() => {
  //   if (!data) return [];
  //   return data.pages.flatMap((page) => page.results);
  // }, [data]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen justify-center pt-14 text-red-400">
        <p>Error loading results. Please try again.</p>
      </div>
    );
  }

  if (!allResults.length && !isFetchingNextPage) {
    return (
      <div className="flex min-h-screen justify-center pt-14 text-gray-500">
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

          <SearchResults results={allResults} />

          <LoadMoreTrigger
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasResults={allResults.length > 0}
            triggerRef={ref}
          />
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;

// function ResultsPage() {
//   const { query = 'the' } = useParams();
//   const { ref, inView } = useInView({
//     threshold: 0.5,
//     rootMargin: '100px',
//   });

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isError,
//     isLoading,
//     prefetchNextPage,
//   } = useSearchResults({ query });

// // Memoize all results to prevent unnecessary array operations
// const allResults = useMemo(
//   () => data?.pages.flatMap((page) => page.results) ?? [],
//   [data?.pages],
// );

//   useEffect(() => {
//     if (inView && hasNextPage && !isFetchingNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

//   // Prefetch next page when user is close to the end
//   useEffect(() => {
//     if (inView && hasNextPage) {
//       prefetchNextPage();
//     }
//   }, [inView, hasNextPage, prefetchNextPage]);

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex min-h-screen justify-center text-red-400">
//         <p>Error loading results. Please try again.</p>
//       </div>
//     );
//   }

//   if (!allResults.length && !isFetchingNextPage) {
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

//           <SearchResults results={allResults} />

//           <LoadMoreTrigger
//             hasNextPage={!!hasNextPage}
//             isFetchingNextPage={isFetchingNextPage}
//             hasResults={allResults.length > 0}
//             triggerRef={ref}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResultsPage;
