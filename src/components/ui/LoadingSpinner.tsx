export function LoadingSpinner() {
  return (
    <div
      className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
      aria-label="Loading"
    />
  );
}
