import { Dispatch, FC, SetStateAction } from 'react';
import RowSlider from './RowSlider';
import { Movie } from '../features/SlidersContainer';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPlayNowMovies } from '../../services/fetchPlayNowMovies';
import replaceSpacesWithUnderscores from '../../helpers/replaceSpacesWithUndescores';

interface RowSliderContainer {
  // movies?: Movie[] | null;
  title: string;
  currentIndex: number;
  isVerySmallScreen: boolean;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  // prevSlide: () => void;
  // nextSlide: () => void;
  moviesPerPage: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

const RowSliderContainer: FC<RowSliderContainer> = ({
  // movies,
  title,
  currentIndex,
  isVerySmallScreen,
  isSmallScreen,
  isMediumScreen,
  isLargeScreen,
  // prevSlide,
  // nextSlide,
  moviesPerPage,
  setCurrentIndex,
}) => {
  const { data: movies } = useSuspenseQuery<Movie[]>({
    queryKey: ['playNowMovies'],
    queryFn: () => fetchPlayNowMovies(replaceSpacesWithUnderscores(title)),
  });
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const [moviesPerPage, setMoviesPerPage] = useState(1);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="mb-10">
      <h2 className="mb-5 pl-8 text-2xl font-semibold capitalize text-[rgba(255,255,255,0.8)] min-[600px]:pl-12 min-[600px]:text-3xl">
        {title}
      </h2>

      <RowSlider
        movies={movies}
        currentIndex={currentIndex}
        isVerySmallScreen={isVerySmallScreen}
        isSmallScreen={isSmallScreen}
        isMediumScreen={isMediumScreen}
        isLargeScreen={isLargeScreen}
        // prevSlide={prevSlide}
        // nextSlide={nextSlide}
        totalPages={totalPages}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default RowSliderContainer;
