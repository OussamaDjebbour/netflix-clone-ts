import React from 'react';
import RandomMovieImageCover from '../ui/RandomMovieImageCover';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../ui/ErrorFallback';

const HeroSection: React.FC = () => {
  return (
    <>
      <div className="relative w-full">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <RandomMovieImageCover />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default HeroSection;
