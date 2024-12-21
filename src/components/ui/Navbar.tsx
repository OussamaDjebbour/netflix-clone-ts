import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useIsShowNavbarContext } from '../../context/useIsShowNavbarContext';
import SearchBar from './SearchBar';
import NavbarButtons from './NavbarButtons';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  isSearchbarOpen: boolean;
  setIsSearchbarOpen: (isSearchOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  setSearchTerm,
  isSearchbarOpen,
  setIsSearchbarOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { handleToggleIsShow } = useIsShowNavbarContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed h-[58px] ${
        isSearchbarOpen && 'max-[680px]:h-9'
      } top-0 z-[1000000000000000] flex w-full items-center gap-8 bg-black px-4 transition-all duration-500 ease-in min-[500px]:px-8 md:px-12 lg:gap-12 ${isScrolled ? 'small:bg-black' : 'small:bg-transparent'}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <img
        src="../../../public/assets/images/netflix-logo-0.png"
        alt="logo"
        className="w-28"
      />

      <NavbarButtons />

      <SearchBar
        isSearchbarOpen={isSearchbarOpen}
        setIsSearchbarOpen={setIsSearchbarOpen}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <button
        onClick={handleToggleIsShow}
        className={`absolute right-10 flex cursor-pointer items-center transition-all duration-300 small:hidden md:right-20`}
      >
        <FontAwesomeIcon
          icon={faBars}
          color="white"
          size="lg"
          aria-label="Open navigation menu" // Descriptive label
          role="button" // Defines it as an interactive element
        />
      </button>
    </nav>
  );
};

export default Navbar;
