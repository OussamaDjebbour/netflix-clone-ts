const HoverImageReveal = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="group relative">
        {/* Image */}
        <img
          src="https://via.placeholder.com/300"
          alt="Sample Image"
          className="h-72 w-72 rounded-lg object-cover"
        />

        {/* Content to reveal on hover */}
        <div className="absolute inset-0 flex items-center justify-end space-x-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">Image Title</h2>
            <p className="text-gray-600">
              Some additional content displayed on hover.
            </p>
            <button className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-white">
              Action Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverImageReveal;

import React from 'react';

// Define the type for each slide item
interface Slide {
  imageSrc: string;
  title: string;
}

const ImageSlider: React.FC<{ slides: Slide[] }> = ({ slides }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto">
      {slides.map((slide, index) => (
        <div key={index} className="group relative h-64 w-64 overflow-hidden">
          {/* Image */}
          <img
            src={slide.imageSrc}
            alt={slide.title}
            className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Title Component */}
          <div className="absolute bottom-0 left-0 w-full transform bg-black bg-opacity-75 p-2 text-center text-white opacity-0 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100">
            <p>{slide.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// export default ImageSlider;
