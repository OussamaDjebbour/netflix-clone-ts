function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="h-full w-full text-center text-xl text-white">
      Error: {error.message}
    </div>
  );
}

export default ErrorFallback;
