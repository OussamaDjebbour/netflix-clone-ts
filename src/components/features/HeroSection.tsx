import React, { useState } from 'react';
import Navbar from '../ui/Navbar';
import RandomMovieImageCover from '../ui/RandomMovieImageCover';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../ui/ErrorFallback';

export interface HeroSectionProps {
  // imageLoaded: boolean;
  // setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeroSection: React.FC<HeroSectionProps> = (
  {
    // imageLoaded,
    // setImageLoaded,
  },
) => {
  // const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <RandomMovieImageCover
          // isShow={isShow}
          // imageLoaded={imageLoaded}
          // setImageLoaded={setImageLoaded}
          />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default HeroSection;
