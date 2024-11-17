import HeroSection from '../components/features/HeroSection';
import SlidersContainer from '../components/features/SlidersContainer';
import Footer from '../components/features/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ui/ErrorFallback';
import { useIsImageLoadedContext } from '../context/useIsImageLoadedContext';

function HomePage() {
  const { isImageLoaded } = useIsImageLoadedContext();
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="bg-black">
        <HeroSection />
        {isImageLoaded && (
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
