import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ui/ErrorFallback';
import { MediaProvider } from './context/useMediaContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 300000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <MediaProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </MediaProvider>
    </QueryClientProvider>
  );
}

export default App;
