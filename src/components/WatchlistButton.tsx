// components/WatchlistButton.tsx
import React from 'react';

interface Props {
  movieId: number;
}

const WatchlistButton: React.FC<Props> = ({ movieId }) => {
  const handleAddToWatchlist = () => {
    // Add the movie to the watchlist logic here
  };

  return (
    <button
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      onClick={handleAddToWatchlist}
    >
      Add to Watchlist
    </button>
  );
};

export default WatchlistButton;
