import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

interface NavbarProps {
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ setIsShow }) => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  // const navigate = useNavigate();
  // const handleMediaSwitch = (media: 'movies' | 'tv-shows' | 'anime') => {
  //   navigate(`?mediaType=${media}`);
  // };

  //

  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Set default value for "mediaType" parameter if it's missing
  const mediaType = searchParams.get('mediaType') || 'movies';

  useEffect(() => {
    if (!searchParams.has('mediaType')) {
      // Set the default "mediaType" parameter in the URL if not present
      setSearchParams({ mediaType });
    }
  }, [mediaType, searchParams, setSearchParams]);

  const handleChangeMedia = (newMedia: 'movies' | 'tv-shows' | 'anime') => {
    startTransition(() => {
      setSearchParams({ mediaType: newMedia });
    });
  };

  return (
    <nav
      className={`fixed top-0 z-50 flex h-[58px] w-full items-center gap-8 bg-black px-4 py-4 transition-all duration-500 ease-in min-[500px]:px-8 md:px-12 lg:gap-12 ${isScrolled ? 'small:bg-black' : 'small:bg-transparent'} `}
      // className={`flex h-20 w-full items-center justify-between px-4 transition-all duration-500 ease-in ${isScrolled ? 'bg-black' : 'bg-transparent'}`}
    >
      {/* <img
        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt="logo"
        className="w-36"
      /> */}

      {/* <div className="flex gap-8"> */}
      <img
        src="../../../src/assets/images/netflix-logo-0.png"
        alt="logo"
        className="w-28"
      />

      <AnimatePresence>
        <motion.ul
          key="content"
          initial={{ x: 300, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: -300, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="hidden text-white small:flex small:items-center small:gap-4 small:transition-all small:duration-500 small:ease-in lg:gap-5"
        >
          <li className="hover:cursor-pointer">Home</li>
          <li
            className="hover:cursor-pointer"
            onClick={() => handleChangeMedia('movies')}
          >
            Movies
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => handleChangeMedia('tv-shows')}
          >
            TV Shows
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => handleChangeMedia('anime')}
          >
            Anime
          </li>
          {/* <li className="hover:cursor-pointer">TV Shows</li>
          <li className="hover:cursor-pointer">Movies</li> */}
          <li className="hover:cursor-pointer">New</li>
          <li className="hover:cursor-pointer">My List</li>
        </motion.ul>
      </AnimatePresence>

      {/* <ul>
        <li className="hover:cursor-pointer">Home</li>
        <li className="hover:cursor-pointer">TV Shows</li>
        <li className="hover:cursor-pointer">Movies</li>
        <li className="hover:cursor-pointer">New</li>
        <li className="hover:cursor-pointer">My List</li>
      </ul> */}

      {/* </div> */}

      <div className="hidden small:ml-auto small:flex small:items-center">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          color="white"
          size="lg"
          className="mx-6"
        />
        <FontAwesomeIcon icon={faBell} color="white" size="lg" />
      </div>

      <div
        onClick={() => setIsShow((isShow) => !isShow)}
        className="ml-auto mr-8 flex cursor-pointer items-center small:hidden"
      >
        <FontAwesomeIcon icon={faBars} color="white" size="lg" />
      </div>
    </nav>
  );
};

// const Navbar: React.FC = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <motion.nav
//       className={`${isScrolled ? 'fixed left-0 top-0 z-50 w-full bg-gray-800 text-white shadow-lg' : 'relative bg-transparent'} transition-all duration-300 ease-in-out`}
//     >
//       {' '}
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
//         {' '}
//         <div className="text-xl font-bold">My Website</div>{' '}
//         <ul className="flex space-x-4">
//           {' '}
//           <li>
//             <a href="#home" className="hover:text-gray-400">
//               Home
//             </a>
//           </li>{' '}
//           <li>
//             <a href="#about" className="hover:text-gray-400">
//               About
//             </a>
//           </li>{' '}
//           <li>
//             <a href="#contact" className="hover:text-gray-400">
//               Contact
//             </a>
//           </li>{' '}
//         </ul>{' '}
//       </div>{' '}
//     </motion.nav>
//   );
// };

export default Navbar;
