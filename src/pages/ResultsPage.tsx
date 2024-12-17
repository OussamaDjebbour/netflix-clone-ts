import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchResults } from '../hooks/useSearchResults';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { AllSearchResults } from '../components/ui/AllSearchResults';
import { LoadMoreTrigger } from '../components/ui/LoadMoreTrigger';

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

  const allResults = data?.pages.flatMap((page) => page.results) ?? [];

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

          <AllSearchResults results={allResults} />

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
