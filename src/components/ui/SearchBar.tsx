import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';

interface SearchBarProps {
  isSearchbarOpen: boolean;
  setIsSearchbarOpen: (isSearchbarOpen: boolean) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  isSearchbarOpen,
  setIsSearchbarOpen,
  searchTerm,
  setSearchTerm,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    setIsSearchbarOpen(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    if (searchTerm.trim() === '') {
      setIsSearchbarOpen(false);
    }
  };

  return (
    <>
      <div
        className={`absolute right-[4.5rem] flex items-center transition-all duration-300 small:right-12 ${
          isSearchbarOpen ? 'small:w-64' : 'w-10'
        }`}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          onClick={handleFocus}
          color="white"
          size="lg"
          className={`absolute ${
            isSearchbarOpen && 'max-[680px]:hidden'
          } left-5 z-50 cursor-pointer`}
        />

        <input
          ref={inputRef}
          type="text"
          // small:left-auto small:right-10
          className={`fixed left-0 right-0 top-0 bg-[rgb(31,31,31)] py-3 pl-6 pr-4 text-white outline-none transition-all duration-300 focus:ring-neutral-300 small:left-auto small:right-10 small:top-auto small:block small:w-64 small:rounded-full small:pl-10 small:focus:ring-1 ${
            isSearchbarOpen ? 'z-40 w-full opacity-100' : 'w-0 opacity-0'
          }`}
          placeholder="Search a movie or a tvShow"
          value={searchTerm}
          onBlur={handleBlur}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => setIsSearchbarOpen(false)}
        color="white"
        // size="xl"
        className={`absolute right-4 top-1 z-[10000] my-auto h-6 w-6 cursor-pointer rounded-[50%] p-2 hover:bg-[rgb(60,60,60)] small:hidden ${!isSearchbarOpen && 'hidden'}`}
      />
    </>
  );
};

export default SearchBar;
