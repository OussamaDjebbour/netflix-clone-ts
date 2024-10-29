import React, { useState } from 'react';
import Navbar from '../ui/Navbar';
import RandomMovieImageCover from '../ui/RandomMovieImageCover';

export interface HeroSectionProps {
  imageLoaded: boolean;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  imageLoaded,
  setImageLoaded,
}) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <Navbar setIsShow={setIsShow} setImageLoaded={setImageLoaded} />

        <RandomMovieImageCover
          isShow={isShow}
          imageLoaded={imageLoaded}
          setImageLoaded={setImageLoaded}
        />
      </div>
    </>
  );
};

export default HeroSection;
