import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const useResponsiveMoviesPerPage = () => {
  const [moviesPerPage, setMoviesPerPage] = useState(1);

  const isVerySmallScreen = useMediaQuery({ query: '(max-width: 599px)' });
  const isSmallScreen = useMediaQuery({
    query: '(min-width: 600px) and (max-width: 679px)',
  });
  const isMediumScreen = useMediaQuery({
    query: '(min-width: 680px) and (max-width: 899px)',
  });
  const isLargeScreen = useMediaQuery({
    query: '(min-width: 900px) and (max-width: 1023px)',
  });
  const isVeryLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  useEffect(() => {
    if (isVerySmallScreen) setMoviesPerPage(1);
    else if (isSmallScreen) setMoviesPerPage(2);
    else if (isMediumScreen) setMoviesPerPage(3);
    else if (isLargeScreen) setMoviesPerPage(4);
    else if (isVeryLargeScreen) setMoviesPerPage(5);
  }, [
    isVerySmallScreen,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    isVeryLargeScreen,
  ]);

  return moviesPerPage;
};

export default useResponsiveMoviesPerPage;
