import React, { memo } from 'react';

import { useNavigate } from 'react-router-dom';
import { SearchResult } from '../../types/tmdb';
import { getImageUrl } from '../../helpers/imageUtils';

interface MovieCardProps {
  filteredResult: SearchResult;
}

const MovieCard = memo(({ filteredResult }: MovieCardProps) => {
  const { title, name, overview, media_type, id } = filteredResult;
  const imageUrl = getImageUrl(filteredResult);

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${media_type}/${id}`)}
      className="group cursor-pointer rounded-lg bg-gray-900 p-4 shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-purple-500/20"
    >
      {imageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <img
            src={imageUrl}
            alt={title || name || 'No image available'}
            className="absolute inset-0 h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <h2 className="mt-4 text-xl font-semibold text-purple-300">
        {title || name || 'No title available'}
      </h2>
      <p className="mt-2 line-clamp-3 text-sm text-gray-400">
        {overview || 'No overview available'}
      </p>
    </div>
  );
});

export default MovieCard;
