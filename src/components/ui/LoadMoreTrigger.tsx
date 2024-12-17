import { LoadingSpinner } from '../../Testt/LoadingSpinner';

interface LoadMoreTriggerProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  hasResults: boolean;
  triggerRef: (node?: Element | null) => void;
}

export function LoadMoreTrigger({
  hasNextPage,
  isFetchingNextPage,
  hasResults,
  triggerRef,
}: LoadMoreTriggerProps) {
  if (!hasNextPage && !isFetchingNextPage && hasResults) {
    return <p className="mt-8 text-center text-gray-500">No more results</p>;
  }

  if (hasNextPage || isFetchingNextPage) {
    return (
      <div ref={triggerRef} className="mt-8 text-center">
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    );
  }

  return null;
}
