import { useEffect, Suspense } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  queryOptions,
} from '@tanstack/react-query';

import HeroSection from './components/features/HeroSection';
import Slider from './components/features/SlidersContainer';
import SlidersContainer from './components/features/SlidersContainer';
import HoverImageReveal from './components/ui/test';
import Footer from './components/features/Footer';
import Spinner from './components/ui/Spinner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     staleTime: 1000 * 30,
  //   },
  // },
});

const router = createBrowserRouter([
  {
    path: '/',
    // path: '/:mediaType',
    // path: '/?mediaType=movies',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      {/* <HomePage /> */}
    </QueryClientProvider>
  );
}

export default App;
