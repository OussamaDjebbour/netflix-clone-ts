import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  //   const handleFocus = () => setIsOpen(true);

  const handleFocus = () => {
    setIsOpen(true);
    // Set focus on the input when it expands
    // setTimeout(() => inputRef.current?.focus(), 0);
    inputRef.current?.focus();
  };
  const handleBlur = () => {
    if (searchTerm.trim() === '') {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`absolute right-14 flex items-center transition-all duration-300 md:right-20 ${
        isOpen ? 'w-64' : 'w-10'
      }`}
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        onClick={handleFocus}
        color="white"
        size="lg"
        className="absolute left-3 z-50 cursor-pointer"
      />
      {/* <FiSearch
        className="absolute left-3 cursor-pointer text-gray-500"
        size={20}
      /> */}
      {/* Child element with a higher z-index  */}
      {/* <div className="absolute left-16 top-16 z-20 bg-red-500 px-4 py-2 text-white">
        I am on top of the fixed parent!
      </div> */}
      <input
        ref={inputRef}
        type="text"
        className={`rounded-full bg-[rgba(0,0,0,0.5)] py-2 pl-10 pr-4 text-white outline-none transition-all duration-300 focus:ring-[1.5px] focus:ring-neutral-300 ${
          isOpen ? 'opacity-100' : 'w-0 opacity-0'
        }`}
        placeholder="Search a movie or a tvShow"
        value={searchTerm}
        onBlur={handleBlur}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

// const SearchBar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleFocus = () => setIsOpen(true);
//   const handleBlur = () => {
//     if (searchTerm.trim() === '') {
//       setIsOpen(false);
//     }
//   };

//   return (
//     <div
//       className={`absolute right-14 flex items-center transition-all duration-300 ${
//         isOpen ? 'w-64' : 'w-10'
//       }`}
//     >
//       <FontAwesomeIcon
//         icon={faMagnifyingGlass}
//         color="white"
//         size="lg"
//         className="absolute left-3 z-50 cursor-pointer"
//       />
//       {/* <FiSearch
//         className="absolute left-3 cursor-pointer text-gray-500"
//         size={20}
//       /> */}
//       <input
//         type="text"
//         className={`rounded-full bg-gray-800 py-2 pl-10 pr-4 text-white outline-none transition-all duration-300 focus:ring-2 focus:ring-red-500 ${
//           isOpen ? 'opacity-100' : 'w-0 opacity-0'
//         }`}
//         placeholder="Search"
//         value={searchTerm}
//         onFocus={handleFocus}
//         onBlur={handleBlur}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </div>
//   );
// };

// export default SearchBar;
