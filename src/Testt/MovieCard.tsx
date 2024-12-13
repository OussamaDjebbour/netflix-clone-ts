import React from 'react';
import { SearchResult } from '../types/tmdb';
import { getImageUrl } from './imageUtils';
import { useNavigate } from 'react-router-dom';
// import { getImageUrl } from '../utils/imageUtils';

interface MovieCardProps {
  item: SearchResult;
}

export function MovieCard({ item }: MovieCardProps) {
  const { title, name, overview } = item;
  const imageUrl = getImageUrl(item);

  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${item.media_type}/${item.id}`)}
      className="group cursor-pointer rounded-lg bg-gray-900 p-4 shadow-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-purple-500/20"
    >
      {imageUrl && (
        <div
          className="relative aspect-video overflow-hidden rounded-lg"
          //   className="overflow-hidden rounded-lg"
        >
          <img
            src={imageUrl}
            alt={title || name}
            className="absolute inset-0 h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
            // className="w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <h2 className="mt-4 text-xl font-semibold text-purple-300">
        {title || name}
      </h2>
      <p className="mt-2 line-clamp-3 text-sm text-gray-400">{overview}</p>
    </div>
  );
}
