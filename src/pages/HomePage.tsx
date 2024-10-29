import { useState } from 'react';
import HeroSection from '../components/features/HeroSection';
import SlidersContainer from '../components/features/SlidersContainer';
import Footer from '../components/features/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ui/ErrorFallback';

function HomePage() {
  const [imageLoaded, setImageLoaded] = useState(false);
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
      </div>
    </ErrorBoundary>
  );
}
export default HomePage;
