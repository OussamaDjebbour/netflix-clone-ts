// function ErrorFallback({ error }: { error: Error }) {
//   return (
//     <div className="h-full w-full text-center text-xl text-white">
//       Error: {error.message}
//     </div>
//   );
// }

// export default ErrorFallback;

const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  console.log('Error in fallback:', error); // Log error object
  console.log('Reset function:', resetErrorBoundary); // Check if reset function is defined
  return (
    <div role="alert" className="text-white">
      <p>Something went wrong:</p>
      <p>{error}</p>
      <p>{error?.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
