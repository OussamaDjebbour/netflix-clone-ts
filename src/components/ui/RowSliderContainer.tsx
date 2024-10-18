import { FC, Suspense } from 'react';
import RowSlider from './RowSlider';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Movie } from './SlidersContainer copy';
import { transformString } from '../../helpers/transformString';
import replaceSpacesWithUnderscores from '../../helpers/replaceSpacesWithUndescores';
import { ftchTest } from '../../services/fetchTVShows';
import Spinner from './Spinner';
import RowTest from './RowTest';

interface RowSliderContainer {
  title: string;
}

const RowSliderContainer: FC<RowSliderContainer> = ({ title }) => {
  // const { data: movies } = useSuspenseQuery<Movie[]>({
  //   queryKey: [transformString(title)],
  //   queryFn: ftchTest,
  // });
  // console.log('moviesdsssdsds', movies);

  return (
    <div className="mb-10">
      <h2 className="mb-5 pl-8 text-2xl font-semibold capitalize text-[rgba(255,255,255,0.8)] min-[600px]:pl-12 min-[600px]:text-3xl">
        {title}
      </h2>

      {/* <Suspense fallback={<Spinner />}> */}
      {/* <RowSlider title={title || ''} /> */}
      <RowTest title={title || ''} />
      {/* </Suspense> */}
    </div>
  );
};

export default RowSliderContainer;
