import { MEDIA_TYPES } from '../../constants';
import { MediaType } from '../../types/tmdb';
import NavbarButton from './NavbarButton';

interface NavbarButtonContainerProps {
  handleClick: (media: MediaType) => void;
}

const NavbarButtonContainer: React.FC<NavbarButtonContainerProps> = ({
  handleClick,
}) => {
  return (
    <>
      <NavbarButton onClick={() => handleClick(MEDIA_TYPES.MOVIE)}>
        Home
      </NavbarButton>
      <NavbarButton onClick={() => handleClick(MEDIA_TYPES.MOVIE)}>
        Movies
      </NavbarButton>
      <NavbarButton onClick={() => handleClick(MEDIA_TYPES.TV)}>
        TV Shows
      </NavbarButton>
      <NavbarButton>New</NavbarButton>
      <NavbarButton>My List</NavbarButton>
    </>
  );
};

export default NavbarButtonContainer;
