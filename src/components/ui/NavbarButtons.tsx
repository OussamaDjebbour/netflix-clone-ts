import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useIsImageLoadedContext } from '../../context/useIsImageLoadedContext';
import { useMediaContext } from '../../context/useMediaContext';
import NavbarButtonContainer from './NavbarButtonContainer';
import { MediaType } from '../../types/tmdb';

function NavbarButtons() {
  const { mediaType, handleChangeMedia } = useMediaContext();
  const { handleChangeIsImageLoaded } = useIsImageLoadedContext();
  const navigate = useNavigate();

  const handleClick = (media: MediaType) => {
    if (mediaType !== media) {
      handleChangeIsImageLoaded(false);
    }
    handleChangeMedia(media);
    navigate('/');
  };

  return (
    <AnimatePresence>
      <motion.ul
        key="content"
        initial={{ x: 300, opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: -300, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="hidden text-white small:flex small:items-center small:gap-4 small:transition-all small:duration-500 small:ease-in lg:gap-5"
      >
        <NavbarButtonContainer handleClick={handleClick} />
      </motion.ul>
    </AnimatePresence>
  );
}

export default NavbarButtons;
