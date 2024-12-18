import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MediaProvider } from './context/useMediaContext';
import { ErrorBoundary } from 'react-error-boundary';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import ResultsPage from './pages/ResultsPage';
import MoviesAndTVShowsApp from './pages/MoviesAndTVShowsApp';
import MovieAndTVDetails from './components/ui/MovieAndTVDetails';
import ErrorFallback from './components/ui/ErrorFallback';
import { IsImageLoadedProvider } from './context/useIsImageLoadedContext';
import { IsShowNavbarProvider } from './context/useIsShowNavbarContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <MoviesAndTVShowsApp />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: ':mediaType/:id', element: <MovieAndTVDetails /> },
      { path: ':query', element: <ResultsPage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MediaProvider>
        <IsShowNavbarProvider>
          <IsImageLoadedProvider>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <RouterProvider router={router} />
            </ErrorBoundary>
          </IsImageLoadedProvider>
        </IsShowNavbarProvider>
      </MediaProvider>
    </QueryClientProvider>
  );
}

export default App;
