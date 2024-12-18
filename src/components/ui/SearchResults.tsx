import { useEffect } from 'react';
import { SearchResult } from '../../types/tmdb';
import Overlay from './Overlay';
import { useNavigate } from 'react-router-dom';

interface SearchResultProps {
  searchResults: SearchResult[] | undefined;
  isSearchbarOpen: boolean;
  setIsSearchbarOpen: (isSearchbarOpen: boolean) => void;
  debouncedQuery: string;
  isLoading: boolean;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchResults: React.FC<SearchResultProps> = ({
  searchResults,
  isSearchbarOpen,
  setIsSearchbarOpen,
  debouncedQuery,
  setSearchTerm,
}) => {
  const navigate = useNavigate();

  const handleClick = (
    param1: string,
    param2?: '/' | '',
    param3?: number | '',
  ) => {
    setSearchTerm('');
    setIsSearchbarOpen(false);
    navigate(`/${param1}${param2}${param3}`);
  };

  useEffect(() => {
    // Scroll to the top of the page when searchResults change
    if (searchResults && searchResults.length > 0) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scrolling effect
      });
    }
  }, [searchResults]);

  return (
    <div id="searchResult">
      {isSearchbarOpen && searchResults?.length === 0 && (
        <div
          className={`${isSearchbarOpen ? 'top-12' : 'top-[58px]'} fixed left-0 right-0 z-[60] mb-10 flex flex-col items-center overflow-y-auto rounded-xl bg-[rgb(31,31,31)] py-4 text-white small:left-[12.5%] small:right-[12.5%] small:top-24`}
        >
          <p>
            No results found for "
            <span className="font-bold">{debouncedQuery}</span>"
          </p>
        </div>
      )}
      {isSearchbarOpen && searchResults && searchResults.length > 0 && (
        <div
          className={`absolute left-0 right-0 max-h-[calc(100dvh-7rem)] rounded-xl small:left-[12.5%] small:right-[12.5%] ${isSearchbarOpen ? 'top-12' : 'top-[58px]'} z-[60] mb-10 flex flex-col items-center ${searchResults.length > 3 && 'small:overflow-y-scroll'} ${searchResults.length > 4 && 'overflow-y-scroll'} bg-[rgb(31,31,31)] text-white small:top-24`}
        >
          {searchResults.slice(0, 8).map((result) => (
            <div
              key={result.id}
              onClick={() => {
                handleClick(result.media_type, '/', result.id);
              }}
              className="flex w-full cursor-pointer items-center gap-6 border-t border-[rgba(255,255,255,0.25)] p-3 hover:bg-[#333]"
            >
              {
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.backdrop_path || result.poster_path}`}
                  alt="No image"
                  className="w-1/4 rounded-md text-white"
                />
              }

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
          <button
            tabIndex={-1}
            onClick={() => {
              handleClick(debouncedQuery, '', '');
            }}
            className="w-full cursor-pointer border-t border-[rgba(255,255,255,0.25)] pb-4 pt-3 text-center text-xl text-white hover:bg-[#333]"
          >
            See all results for "{debouncedQuery}"
          </button>
        </div>
      )}

      {isSearchbarOpen && searchResults && (
        <Overlay
          setIsSearchbarOpen={setIsSearchbarOpen}
          setSearchTerm={setSearchTerm}
        />
      )}
    </div>
  );
};

export default SearchResults;
