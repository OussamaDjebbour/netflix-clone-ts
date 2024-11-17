import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import RowSlider from './RowSlider';

interface RowSliderContainerProps {
  title: string;
}

const RowSliderContainer: FC<RowSliderContainerProps> = ({ title }) => {
  return (
    <div className="mb-10">
      <h2 className="mb-5 pl-8 text-2xl font-semibold capitalize text-[rgba(255,255,255,0.8)] min-[600px]:pl-12 min-[600px]:text-3xl">
        {title === 'on_the_air' ? 'Now Playing' : title}
      </h2>

      <ErrorBoundary fallback={<ErrorFallback />}>
        <RowSlider title={title || ''} />
      </ErrorBoundary>
    </div>
  );
};

export default RowSliderContainer;
