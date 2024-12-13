import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ui/ErrorFallback';
import { MediaProvider } from './context/useMediaContext';
import MovieDetails from './components/ui/MovieDetails';
import MoviesAndTVShowsApp from './pages/MoviesAndTVShowsApp';
import { IsShowNavbarProvider } from './context/useIsShowNavbarContext';
import { IsImageLoadedProvider } from './context/useIsImageLoadedContext';
import AllSearchResults from './pages/AllSearchResults';
import ResultsPage from './Testt/ResultsPage';
// import ResultsPage from './pages/ResultsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 300000,
    },
  },
});

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     // path: '/:mediaType/:id', // Separate route for MovieTvShowsDetails
//     // element: <MovieTvShowsDetails />,
//     path: 'movie/:id', // Separate route for MovieTvShowsDetails
//     element: <MovieDetails />,
//     // errorElement: <ErrorPage />,
//   },
// ]);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MoviesAndTVShowsApp />, // Wrap with Layout
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: ':mediaType/:id', element: <MovieDetails /> },
      // { path: ':searchQuery', element: <AllSearchResults /> },
      // { path: ':searchQuery', element: <ResultsPage /> },
      { path: ':searchQuery', element: <ResultsPage /> },
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
