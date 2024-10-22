// function ErrorFallback({ error }: { error: Error }) {
//   return (
//     <div className="h-full w-full text-center text-xl text-white">
//       Error: {error.message}
//     </div>
//   );
// }

// export default ErrorFallback;

const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div role="alert" className="h-10 w-10 text-white">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

export default ErrorFallback;
