import { FC } from 'react';
import RowSlider from './RowSlider';

interface RowSliderContainer {
  title: string;
}

const RowSliderContainer: FC<RowSliderContainer> = ({ title }) => {
  return (
    <div className="mb-10">
      <h2 className="mb-5 pl-8 text-2xl font-semibold capitalize text-[rgba(255,255,255,0.8)] min-[600px]:pl-12 min-[600px]:text-3xl">
        {title}
      </h2>

      <RowSlider title={title} />
    </div>
  );
};

export default RowSliderContainer;
