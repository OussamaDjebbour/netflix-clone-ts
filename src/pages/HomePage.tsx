import { FC, Suspense } from 'react';
import Spinner from '../components/ui/Spinner';
import HeroSection from '../components/features/HeroSection';
import SlidersContainer from '../components/features/SlidersContainer';
import Footer from '../components/features/Footer';

function HomePage() {
  return (
    <div className="bg-black">
      {/* <Suspense
        fallback={<Spinner />}
        // fallback={
        //   <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transform">
        //     <div className="h-64 w-64 animate-spin rounded-full border-8 border-solid border-[#4f46e5] border-t-transparent"></div>
        //   </div>
        // }
        // fallback={
        //   // <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        //   // <div className="h-64 w-64 animate-spin rounded-full border-8 border-solid border-[#4f46e5] border-t-transparent"></div>
        //   // </div>

        //   // <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 transform">
        //   //   <div className="animate-spin rounded-full bg-gradient-to-tr from-green-500 via-purple-500 to-blue-500 p-4">
        //   //     <div className="rounded-full bg-white">
        //   //       <div className="h-24 w-24 rounded-full"></div>
        //   //     </div>
        //   //   </div>
        //   // </div>

        //   // <div className="h-20 w-20 animate-spin rounded-full border-8 border-gray-300 border-t-[#4f46e5]" />
        //   <div
        //     className="z-50 mx-auto my-20 w-28 animate-spinner rounded-full"
        //     style={{
        //       aspectRatio: '1',
        //       background:
        //         'radial-gradient(farthest-side, #4f46e5 94%, #0000) top/10px 10px no-repeat, conic-gradient(#0000 30%, #4f46e5)',
        //       WebkitMask:
        //         'radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)',
        //       //     background: radial-gradient(farthest-side, #4f46e5 94%, #0000) top/10px 10px no-repeat,
        //       // conic-gradient(#0000 30%, #4f46e5),
        //     }}
        //   ></div>
        //   // <div className="bg-gradient-[radial-gradient(farthest-side,#4f46e5_94%,#0000)_top/10px_10px_no-repeat,conic-gradient(#0000_30%,#4f46e5)] mx-auto my-20 aspect-[1] w-28 animate-[rotate(1turn)_1.5s_infinite_linear] rounded-[50%]">
        //   //   Loading...
        //   // </div>
        // }
      >
        <HeroSection />
      </Suspense> */}
      <HeroSection />
      <SlidersContainer />
      <Footer />
      {/* <MovieGenres movieId={movies?.[0].id} /> */}
      {/* <HoverImageReveal /> */}
    </div>
  );
}
export default HomePage;
