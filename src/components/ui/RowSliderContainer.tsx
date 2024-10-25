import { FC, Suspense } from 'react';
import RowSlider from './RowSlider';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Movie } from './SlidersContainer copy';
import { transformString } from '../../helpers/transformString';
import replaceSpacesWithUnderscores from '../../helpers/replaceSpacesWithUndescores';
import Spinner from './Spinner';
import RowTest from './RowTest';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { HeroSectionProps } from '../features/HeroSection';

interface RowSliderContainerProps {
  title: string;
}

const RowSliderContainer: FC<RowSliderContainerProps> = ({ title }) => {
  return (
    <div className="mb-10">
      <h2 className="mb-5 pl-8 text-2xl font-semibold capitalize text-[rgba(255,255,255,0.8)] min-[600px]:pl-12 min-[600px]:text-3xl">
        {title}
      </h2>

      {/* <RowSlider title={title || ''} /> */}
      <ErrorBoundary fallback={<ErrorFallback />}>
        <RowTest title={title || ''} />
      </ErrorBoundary>
    </div>
  );
};

export default RowSliderContainer;
