import { FC, Suspense, useState } from 'react';
import Spinner from '../components/ui/Spinner';
import HeroSection from '../components/features/HeroSection';
import SlidersContainer from '../components/features/SlidersContainer';
import Footer from '../components/features/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ui/ErrorFallback';

function HomePage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  console.log('imageLoaded', imageLoaded);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="bg-black">
        <HeroSection
          imageLoaded={imageLoaded}
          setImageLoaded={setImageLoaded}
        />
        {imageLoaded && (
          <>
            <SlidersContainer />
            <Footer />
          </>
        )}
        {/* <MovieGenres movieId={movies?.[0].id} /> */}
        {/* <HoverImageReveal /> */}
      </div>
    </ErrorBoundary>
  );
}
export default HomePage;
