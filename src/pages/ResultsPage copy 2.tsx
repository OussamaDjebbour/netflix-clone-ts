// import React from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';

// import { useInView } from 'react-intersection-observer';
// import { fetchFilteredResults } from './fetchFilteredResults ';
// import { useParams } from 'react-router-dom';

// const ResultsPage = () => {
//   //   const query = 'john'; // Replace with dynamic query from state or props
//   const { query = 'lad' } = useParams(); // Replace with dynamic query from state or props
//   const mediaType = 'movie'; // Or 'tv'

// const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//   useInfiniteQuery({
//     queryKey: [query, mediaType],
//     queryFn: ({ pageParam = 1 }) =>
//       fetchFilteredResults({ queryKey: [query, mediaType], pageParam }),
//     getNextPageParam: (lastPage) => lastPage.nextPage,
//     initialPageParam: 1,
//   });

//   //   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//   //     useInfiniteQuery({
//   //       queryKey: ['filteredResults', query, mediaType],

//   //        queryFn: ({ pageParam = 1 }) =>
//   //           fetchFilteredResults({ queryKey: [query, mediaType], pageParam }),
//   //         {
//   //           getNextPageParam: (lastPage) => lastPage.nextPage,
//   //         },
//   //     });

//   // Intersection observer to fetch next page
//   const { ref, inView } = useInView({
//     triggerOnce: false,
//     threshold: 1,
//   });

//   // React.useEffect(() => {
//   //   console.log('Fetching next page...', inView, hasNextPage);
//   //   if (inView && hasNextPage) {
//   //     // console.log('Fetching next page...', inView, hasNextPage);
//   //     fetchNextPage();
//   //   } else {
//   //     console.log('No more pages to fetch');
//   //   }
//   // }, [inView, hasNextPage, fetchNextPage]);

//   // React.useEffect(() => {
//   //   console.log('Fetching next page...', inView, hasNextPage);
//   //   if (inView && hasNextPage) {
//   //     fetchNextPage();
//   //   } else {
//   //     const nextPageParam = 1; // initial value
//   //     while (!hasNextPage) {
//   //       fetchNextPage({ pageParam: nextPageParam });
//   //       nextPageParam++;
//   //     }
//   //   }
//   // }, [inView, hasNextPage, fetchNextPage]);
//   React.useEffect(() => {
//     console.log('Fetching next page...', inView, hasNextPage);
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     } else {
//       let nextPageParam = 1;
//       while (!hasNextPage && nextPageParam <= 20) {
//         // assuming you want to fetch up to 10 pages
//         fetchNextPage();
//         nextPageParam++;
//       }
//     }
//   }, [inView, hasNextPage, fetchNextPage]);

// return (
//   <div className="p-4">
//     <h1 className="mb-4 text-2xl font-bold">Search Results</h1>
//     <div className="grid grid-cols-1 gap-4">
//       {data?.pages.map((page) =>
//         page.results.map((item) => (
//           <div
//             key={item.id}
//             className="rounded border p-4 shadow transition hover:shadow-lg"
//           >
//             <img
//               src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
//               alt={item.title || item.name}
//               // className="h-auto w-full rounded"
//               className="rounded"
//             />
//             <h2 className="mt-2 text-lg font-semibold">
//               {item.title || item.name}
//             </h2>
//             <p className="text-sm text-gray-500">{item.overview}</p>
//           </div>
//         )),
//       )}
//     </div>

//     {/* Loader */}
//     <div ref={ref} className="mt-4 text-center">
//       {isFetchingNextPage ? (
//         <p>Loading...</p>
//       ) : hasNextPage ? null : (
//         <p>No more results</p>
//       )}
//     </div>
//   </div>
// );
// };

// export default ResultsPage;

// import React, { useEffect, useState } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { useInView } from 'react-intersection-observer';
// // import { fetchFilteredResults } from './fetchFilteredResults';
// import { useParams } from 'react-router-dom';
// import { fetchFilteredResults } from './fetchFilteredResults ';

// const ResultsPage = () => {
//   const { query = 'the' } = useParams();
//   const mediaType = 'movie';

//   const [manualPage, setManualPage] = useState(1);

//   // const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//   //   useInfiniteQuery({
//   //     queryKey: [query, mediaType],
//   //     queryFn: ({ pageParam = 1 }) =>
//   //       fetchFilteredResults({ queryKey: [query, mediaType], pageParam }),
//   //     getNextPageParam: (lastPage) => lastPage.nextPage ?? null,
//   //   });
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: [query, mediaType],
//       queryFn: ({ pageParam = 1 }) =>
//         fetchFilteredResults({ queryKey: [query, mediaType], pageParam }),
//       getNextPageParam: (lastPage) => lastPage.nextPage,
//       initialPageParam: 1,
//     });

//   const { ref, inView } = useInView({
//     triggerOnce: false,
//     threshold: 1,
//   });

//   useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     } else if (inView && !hasNextPage) {
//       console.log('Fetching manually...');
//       setManualPage((prevPage) => prevPage + 1);
//     }
//   }, [inView, hasNextPage, fetchNextPage]);

//   useEffect(() => {
//     if (manualPage > 1 && !hasNextPage) {
//       fetchFilteredResults({
//         queryKey: [query, mediaType],
//         pageParam: manualPage,
//       })
//         .then((newData) => {
//           console.log('Manual fetch result:', newData);
//           // Optionally append data to your UI or handle it as needed
//         })
//         .catch((error) => console.error('Manual fetch error:', error));
//     }
//   }, [manualPage, query, mediaType, hasNextPage]);

//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-2xl font-bold">Search Results</h1>
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {data?.pages.map((page) =>
//           page.results.map((item) => (
//             <div
//               key={item.id}
//               className="rounded border p-4 shadow transition hover:shadow-lg"
//             >
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
//                 alt={item.title || item.name}
//                 className="h-auto w-full rounded"
//               />
//               <h2 className="mt-2 text-lg font-semibold">
//                 {item.title || item.name}
//               </h2>
//               <p className="text-sm text-gray-500">{item.overview}</p>
//             </div>
//           )),
//         )}
//       </div>

//       {/* Loader */}
//       <div ref={ref} className="mt-4 text-center">
//         {isFetchingNextPage ? (
//           <p>Loading...</p>
//         ) : hasNextPage ? null : (
//           <p>No more results</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResultsPage;

// import React, { useState, useEffect } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { useInView } from 'react-intersection-observer';
// // import { fetchFilteredResults } from './fetchFilteredResults';
// import { useParams } from 'react-router-dom';
// import { fetchFilteredResults } from './fetchFilteredResults ';

// import { FetchNextPageOptions } from '@tanstack/react-query';

// interface CustomFetchNextPageOptions extends FetchNextPageOptions {
//   pageParam?: number;
// }

// const ResultsPage = () => {
//   const { query = 'lad' } = useParams();
//   const mediaType = 'movie';

//   const [pageParam, setPageParam] = useState(1);

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: [query, mediaType],
//       queryFn: ({ pageParam = 1 }) =>
//         fetchFilteredResults({ queryKey: [query, mediaType], pageParam }),
//       getNextPageParam: (lastPage) => lastPage.nextPage,
//       initialPageParam: 1,
//     });

//   const { ref, inView } = useInView({
//     triggerOnce: false,
//     threshold: 1,
//   });

//   // useEffect(() => {
//   //   console.log('Fetching next page...', inView, hasNextPage);
//   //   if (inView && hasNextPage) {
//   //     fetchNextPage();
//   //   } else if (inView && !hasNextPage) {
//   //     // Increment pageParam and attempt to fetch the next page
//   //     setPageParam((prev) => prev + 1);
//   //     fetchNextPage({ pageParam });
//   //   }
//   // }, [inView, hasNextPage, fetchNextPage, pageParam]);

//   useEffect(() => {
//     console.log('Fetching next page...', inView, hasNextPage);
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     } else if (inView && !hasNextPage) {
//       // Increment pageParam and attempt to fetch the next page
//       setPageParam((prev) => prev + 1);
//       fetchNextPage({ pageParam: pageParam } as CustomFetchNextPageOptions);
//     }
//   }, [inView, hasNextPage, fetchNextPage, pageParam]);
//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-2xl font-bold">Search Results</h1>
//       <div className="grid grid-cols-1 gap-4">
//         {data?.pages.map((page) =>
//           page.results.map((item) => (
//             <div
//               key={item.id}
//               className="rounded border p-4 shadow transition hover:shadow-lg"
//             >
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
//                 alt={item.title || item.name}
//                 className="rounded"
//               />
//               <h2 className="mt-2 text-lg font-semibold">
//                 {item.title || item.name}
//               </h2>
//               <p className="text-sm text-gray-500">{item.overview}</p>
//             </div>
//           )),
//         )}
//       </div>

//       {/* Loader */}
//       <div ref={ref} className="mt-4 text-center">
//         {isFetchingNextPage ? (
//           <p>Loading...</p>
//         ) : hasNextPage ? null : (
//           <p>No more results</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ResultsPage;

// import React, { useEffect, useState } from 'react';
// import { useInfiniteQuery } from '@tanstack/react-query';
// import { useInView } from 'react-intersection-observer';
// import { fetchFilteredResults } from './fetchFilteredResults ';
// import { useParams } from 'react-router-dom';

// function ResultsPage() {
//   const { query = 'lad' } = useParams(); // Replace with dynamic query from state or props
//   const mediaType = 'movie'; // Or 'tv'
//   const [currentPage, setCurrentPage] = useState(1);
//   const { ref, inView } = useInView({
//     threshold: 0.1,
//     triggerOnce: false,
//   });

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: ['moviesAndTv', currentPage],
//       queryFn: ({ pageParam = 1 }) =>
//         fetchFilteredResults({ queryKey: [query, mediaType], pageParam }),
//       // queryFn: async ({ pageParam = currentPage }) => {
//       //   // Simulated API call - replace with your actual API call
//       //   const response = await fetch(
//       //     `https://api.example.com/data?page=${pageParam}`,
//       //   );
//       //   const data = await response.json();
//       //   return {
//       //     results: data.results,
//       //     nextPage: data.hasMore ? pageParam + 1 : undefined,
//       //   };
//       // },
//       getNextPageParam: (lastPage) => lastPage.nextPage,
//       initialPageParam: 1,
//     });

//   useEffect(() => {
//     const handleScroll = async () => {
//       if (inView && !hasNextPage && !isFetchingNextPage) {
//         setCurrentPage((prev) => prev + 1);
//         await fetchNextPage();
//       }
//     };

//     handleScroll();
//   }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-2xl font-bold">Search Results</h1>
//       <div className="grid grid-cols-1 gap-4">
//         {data?.pages.map((page) =>
//           page.results.map((item) => (
//             <div
//               key={item.id}
//               className="rounded border p-4 shadow transition hover:shadow-lg"
//             >
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
//                 alt={item.title || item.name}
//                 // className="h-auto w-full rounded"
//                 className="rounded"
//               />
//               <h2 className="mt-2 text-lg font-semibold">
//                 {item.title || item.name}
//               </h2>
//               <p className="text-sm text-gray-500">{item.overview}</p>
//             </div>
//           )),
//         )}
//       </div>

//       {/* Loader */}
//       <div ref={ref} className="mt-4 text-center">
//         {isFetchingNextPage ? (
//           <p>Loading...</p>
//         ) : hasNextPage ? null : (
//           <p>No more results</p>
//         )}
//       </div>
//     </div>
//   );
//   // return (
//   //   <div className="min-h-screen text-white">
//   //     <div className="container mx-auto px-4 py-8">
//   //       <div className="grid gap-6">
//   //         {data?.pages.map((page, pageIndex) => (
//   //           <React.Fragment key={pageIndex}>
//   //             {page.results.map((item: any) => (
//   //               <div
//   //                 key={item.id}
//   //                 className="overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
//   //               >
//   //                 <div className="p-6">
//   //                   <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
//   //                   <p className="text-gray-600">{item.description}</p>
//   //                 </div>
//   //               </div>
//   //             ))}
//   //           </React.Fragment>
//   //         ))}
//   //       </div>

//   //       {/* Intersection Observer Target */}
//   //       <div ref={ref} className="mt-4 h-10">
//   //         {isFetchingNextPage && (
//   //           <div className="text-center">
//   //             <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
//   //           </div>
//   //         )}
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
// }

// export default ResultsPage;

// import { useInfiniteQuery } from '@tanstack/react-query';
// import React, { useEffect, useState } from 'react';
// import { useInView } from 'react-intersection-observer';
// import { fetchFilteredResults } from './fetchFilteredResults ';
// import { SearchResult } from '../types/tmdb';
// import { useInfiniteSearch } from './hooks/useInfiniteSearch';
// import SearchResults from './components/SearchResults';

// Define proper types for the pagination function
// interface FetchNextPageOptions {
//   pageParam?: number;
// }
// export default function ResultsPage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const { ref, inView } = useInView({
//     threshold: 0.1,
//     triggerOnce: false,
//   });

//   // You can make these dynamic based on your needs
//   const query = 'lad';
//   const mediaType = 'movie';

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: [query, mediaType],
//       queryFn: ({ pageParam = 1 }) =>
//         fetchFilteredResults({ queryKey: [query, mediaType], pageParam }),
//       getNextPageParam: (lastPage) => lastPage.nextPage,
//       initialPageParam: 1,
//     });
//   useEffect(() => {
//     const loadMoreResults = async () => {
//       if (inView && !isFetchingNextPage) {
//         if (hasNextPage) {
//           await fetchNextPage();
//         } else if (currentPage < 20) {
//           // Only try to fetch more if we haven't reached page 20
//           setCurrentPage((prev) => prev + 1);
//           await fetchNextPage();
//         }
//       }
//     };

//     loadMoreResults();
//   }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage, currentPage]);
//   // useEffect(() => {
//   //   const loadMoreResults = async () => {
//   //     if (inView) {
//   //       if (hasNextPage) {
//   //         await fetchNextPage();
//   //       } else if (!isFetchingNextPage) {
//   //         // If we don't have more pages but we're at the bottom,
//   //         // increment the page counter and try fetching again
//   //         setCurrentPage((prev) => {
//   //           const nextPage = prev + 1;
//   //           if (nextPage <= 20) {
//   //             // Limit to 20 pages as per your requirement
//   //             fetchNextPage({ pageParam: nextPage });

//   //             return nextPage;
//   //           }
//   //           return prev;
//   //         });
//   //       }
//   //     }
//   //   };

//   //   loadMoreResults();
//   // }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, currentPage]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto">
//         <div className="p-4">
//           <h1 className="mb-4 text-2xl font-bold">Search Results</h1>
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//             {data?.pages.map((page: any) =>
//               page.results.map((item: SearchResult) => (
//                 // <ResultCard key={item.id} item={item} />
//                 <div className="rounded border p-4 shadow transition hover:shadow-lg">
//                   {
//                     <img
//                       src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
//                       alt={item.title || item.name}
//                       className="w-full rounded object-cover"
//                       loading="lazy"
//                     />
//                   }
//                   <h2 className="mt-2 text-lg font-semibold">
//                     {item.title || item.name}
//                   </h2>
//                   <p className="text-sm text-gray-500">{item.overview}</p>
//                 </div>
//               )),
//             )}
//           </div>

//           <div ref={ref} className="mt-4 text-center">
//             {isFetchingNextPage && (
//               <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
//             )}
//             {!hasNextPage && !isFetchingNextPage && (
//               <p className="text-gray-500">No more results</p>
//             )}
//           </div>
//         </div>
//         {/* <SearchResults
//           data={data}
//           isFetchingNextPage={isFetchingNextPage}
//           hasNextPage={hasNextPage}
//           observerRef={ref}
//         /> */}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { fetchFilteredResults } from './fetchFilteredResults ';
import { SearchResult } from '../types/tmdb';

interface Result {
  // Add your result type here
  id: number;
  title: string;
  // ... other properties
}

interface PageData {
  results: Result[];
  nextPage: number | null;
}

interface FetchParams {
  queryKey: [string, string];
  pageParam: number;
}

// const fetchFilteredResults = async ({
//   queryKey,
//   pageParam,
// }: FetchParams): Promise<PageData> => {
//   const [query, mediaType] = queryKey;
//   // Your fetch implementation here
//   // Return type should match PageData interface
//   return {
//     results: [],
//     nextPage: pageParam < 20 ? pageParam + 1 : null,
//   };
// };

function ResultsPage() {
  // const [query, setQuery] = useState('');
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
          // Only try to fetch more if we haven't reached page 20
          setCurrentPage((prev) => prev + 1);
          await fetchNextPage();
        }
      }
    };

    loadMoreResults();
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage, currentPage]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Your UI components here */}
      {/* <div className="min-h-screen bg-gray-100"> */}
      <div className="container mx-auto">
        <div className="p-4">
          <h1 className="mb-4 text-2xl font-bold">Search Results</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.pages.map((page: any) =>
              page.results.map((item: SearchResult) => (
                // <ResultCard key={item.id} item={item} />
                <div className="rounded border p-4 shadow transition hover:shadow-lg">
                  {
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
                      alt={item.title || item.name}
                      className="w-full rounded object-cover"
                      loading="lazy"
                    />
                  }
                  <h2 className="mt-2 text-lg font-semibold">
                    {item.title || item.name}
                  </h2>
                  <p className="text-sm text-gray-500">{item.overview}</p>
                </div>
              )),
            )}
          </div>

          <div ref={ref} className="mt-4 text-center">
            {isFetchingNextPage && (
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            )}
            {!hasNextPage && !isFetchingNextPage && (
              <p className="text-gray-500">No more results</p>
            )}
          </div>
        </div>
        {/* <SearchResults
          data={data}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          observerRef={ref}
        /> */}
      </div>
      {/* </div> */}
      {/* Loading indicator */}
      {/* <div ref={ref}>
        {isFetchingNextPage && (
          <div className="flex justify-center p-4">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          </div>
        )} */}
      {/* </div> */}
    </div>
  );
}

export default ResultsPage;

// import React, { useState } from 'react';
// import { useInView } from 'react-intersection-observer';
// import { useInfiniteSearch } from './hooks/useInfiniteSearch';
// import { useIntersectionLoader } from './hooks/useIntersectionLoader';
// import SearchResults from './components/SearchResults/SearchResults';
// import { PAGINATION_CONFIG } from './config/constants';

// export default function ResultsPage() {
//   const [currentPage, setCurrentPage] = useState(
//     PAGINATION_CONFIG.INITIAL_PAGE,
//   );

//   const { ref, inView } = useInView({
//     threshold: PAGINATION_CONFIG.OBSERVER_THRESHOLD,
//     triggerOnce: false,
//   });

//   const query = 'lad'; // You can make this dynamic
//   const mediaType = 'movie';

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
//     useInfiniteSearch({
//       query,
//       mediaType,
//     });

//   useIntersectionLoader({
//     inView,
//     hasNextPage,
//     isFetchingNextPage,
//     fetchNextPage,
//     currentPage,
//     setCurrentPage,
//   });

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto">
//         {data && (
//           <SearchResults
//             data={data}
//             isFetchingNextPage={isFetchingNextPage}
//             hasNextPage={hasNextPage}
//             observerRef={ref}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
