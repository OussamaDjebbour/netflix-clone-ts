import { useEffect, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import HeroSection from './components/features/HeroSection';
import Slider from './components/ui/SlidersContainer';

const queryClient = new QueryClient();

const API_KEY = '663ea5da0626ca7cc5b066f12a7d27f2';

function App() {
  useEffect(() => {
    async function getMovies() {
      const data = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=en-US`,
      );
      const movies = await data.json();
    }
    getMovies();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-black">
        <Suspense
          fallback={
            // <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            // <div className="h-64 w-64 animate-spin rounded-full border-8 border-solid border-[#4f46e5] border-t-transparent"></div>
            // </div>

            // <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transform">
            //   <div className="animate-spin rounded-full bg-gradient-to-tr from-green-500 via-purple-500 to-blue-500 p-4">
            //     <div className="rounded-full bg-white">
            //       <div className="h-24 w-24 rounded-full"></div>
            //     </div>
            //   </div>
            // </div>

            // <div className="h-20 w-20 animate-spin rounded-full border-8 border-gray-300 border-t-[#4f46e5]" />
            <div
              className="z-50 mx-auto my-20 w-28 animate-spinner rounded-full"
              style={{
                aspectRatio: '1',
                background:
                  'radial-gradient(farthest-side, #4f46e5 94%, #0000) top/10px 10px no-repeat, conic-gradient(#0000 30%, #4f46e5)',
                WebkitMask:
                  'radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)',
                //     background: radial-gradient(farthest-side, #4f46e5 94%, #0000) top/10px 10px no-repeat,
                // conic-gradient(#0000 30%, #4f46e5),
              }}
            ></div>
            // <div className="bg-gradient-[radial-gradient(farthest-side,#4f46e5_94%,#0000)_top/10px_10px_no-repeat,conic-gradient(#0000_30%,#4f46e5)] mx-auto my-20 aspect-[1] w-28 animate-[rotate(1turn)_1.5s_infinite_linear] rounded-[50%]">
            //   Loading...
            // </div>
          }
        >
          <HeroSection />
        </Suspense>
      </div>
    </QueryClientProvider>
  );
}

export default App;
