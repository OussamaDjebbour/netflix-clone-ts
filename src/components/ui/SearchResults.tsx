import { useEffect, useRef, useState } from 'react';
import { SearchResult } from '../../types/tmdb';
import Overlay from './Overlay';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useMediaContext } from '../../context/useMediaContext';

interface SearchResultProps {
  searchResults: SearchResult[] | undefined;
  isSearchbarOpen: boolean;
  setIsSearchbarOpen: (isSearchbarOpen: boolean) => void;
  debouncedQuery: string;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultProps> = ({
  searchResults,
  isSearchbarOpen,
  setIsSearchbarOpen,
  debouncedQuery,
  isLoading,
}) => {
  //   const [navbarHeight, setNavbarHeight] = useState(0); // State to store navbar height
  // const resultsRef = useRef<HTMLDivElement>(null); // Reference for the search results container

  const navigate = useNavigate();
  const { mediaType } = useMediaContext();

  console.log('isLoading', isLoading);

  console.log(
    'searchResultssearchResultssearchResultssearchResults',
    searchResults,
  );

  //   useEffect(() => {
  //     // Dynamically calculate navbar height
  //     const navbar = document.querySelector('nav');
  //     if (navbar) {
  //       setNavbarHeight(navbar.offsetHeight);
  //     }
  //   }, []);

  //   searchResults
  //     .slice(0, 5)
  //     .map((result) =>
  //       console.log(
  //         'result.release_date.getFullYear().toLocaleString()',
  //         new Date(result.release_date).getFullYear(),
  //       ),
  //     );

  useEffect(() => {
    // Scroll search results into view when they are rendered
    // if (resultsRef.current) {
    //   resultsRef.current.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'start',
    //   });
    // }
    // Scroll to the top of the page when searchResults change
    if (searchResults && searchResults.length > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scrolling effect
      });
    }
  }, [searchResults]);

  // if (isLoading) {
  //   return (
  //     <div className="z-[100000000] h-screen w-full bg-black">
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <div className="z-[100000000000000000000]">
      {/* <> */}
      {/* Search Results */}

      {/* && searchResults.length>0 */}
      {isSearchbarOpen && searchResults?.length === 0 && (
        <div
          className={`${isSearchbarOpen ? 'top-12' : 'top-[58px]'} absolute left-0 right-0 z-[600000000000] mb-10 flex flex-col items-center overflow-y-auto rounded-xl bg-[rgb(31,31,31)] py-4 text-white small:left-[12.5%] small:right-[12.5%] small:top-24`}
        >
          <p>
            No results found for "
            <span className="font-bold">{debouncedQuery}</span>"
          </p>
        </div>
      )}
      {isSearchbarOpen && searchResults && searchResults.length > 0 && (
        <div
          // ref={resultsRef}
          // small:left-auto small:right-auto
          // className={`absolute left-0 right-0 rounded-xl small:left-[12.5%] small:right-[12.5%] ${isSearchbarOpen ? 'top-12' : 'top-[58px]'} z-[60] mb-10 flex flex-col items-center overflow-y-auto bg-[rgb(31,31,31)] text-white small:top-24`}
          // style={{
          // max-h-[120vh]
          //   // top: `${navbarHeight}px`,
          //   // top: `40px  `,
          //   // maxHeight: `calc(100vh - ${navbarHeight}px)`, // Prevent overlapping viewport
          //   maxHeight: `calc(100vh + 400px)`, // Prevent overlapping viewport
          // }}
          className={`absolute left-0 right-0 rounded-xl small:left-[12.5%] small:right-[12.5%] ${isSearchbarOpen ? 'top-12' : 'top-[58px]'} z-[600000000000] mb-10 flex flex-col items-center overflow-y-auto bg-[rgb(31,31,31)] text-white small:top-24`}
        >
          {/* {isLoading && (
            <div className="z-[100000000] h-screen w-full bg-black">
              <Spinner />
            </div>
          )} */}
          {/* {searchResults.map((result) => ( */}
          {searchResults.slice(0, 8).map((result) => (
            <div
              key={result.id}
              // /${mediaType}/
              onClick={() => navigate(`/${mediaType}/${result?.id}`)}
              className="flex w-full cursor-pointer items-center gap-6 overflow-hidden border-t border-[rgba(255,255,255,0.25)] p-3 hover:bg-[#333]"
            >
              {
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.backdrop_path || result.poster_path}`}
                  alt="No image"
                  className="w-1/4 rounded-md text-white"
                />
              }
              {/* {result.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt={result.title || result.name}
                  className="max-w-24 rounded-md"
                />
              )} */}
              <div className="max-w-[70%] text-[rgba(255,255,255,0.7)]">
                <h3 className="w-auto truncate font-bold text-white">
                  {result.title || result.name}
                </h3>
                <p>
                  {new Date(result.release_date).getFullYear() ||
                    'Release date is unknown'}
                </p>
                <p>{result.vote_average} / 10</p>
              </div>
            </div>
          ))}
          <div className="w-full cursor-pointer border-t border-[rgba(255,255,255,0.25)] pb-4 pt-3 text-center text-xl text-white hover:bg-[#333]">
            See all results for "{debouncedQuery}"
          </div>
        </div>
      )}

      {/* searchResults.length > 0 && */}
      {isSearchbarOpen && searchResults && (
        <Overlay setIsSearchbarOpen={setIsSearchbarOpen} />
      )}
      {/* </> */}
    </div>
  );
};

export default SearchResults;
