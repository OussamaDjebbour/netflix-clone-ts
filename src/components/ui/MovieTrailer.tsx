import React, { Suspense } from 'react';
// import { useQuery } from 'react-query';
import { fetchMovieVideo } from '../../services/fetchMovieVideo';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
// import axios from 'axios';

const MovieTrailer = ({ movieId }: { movieId: number }) => {
  const {
    data: movieTrailer,
    isLoading,
    error,
  } = useSuspenseQuery({
    queryKey: ['movieVideos', movieId],
    queryFn: () => fetchMovieVideo(movieId),
  });

  //   if (isLoading) return <p className="text-center text-white">Loading...</p>;
  if (error)
    return <p className="text-center text-white">Error fetching video</p>;

  // Filter for YouTube trailers
  const trailer = movieTrailer?.find(
    (video: any) => video.site === 'YouTube' && video.type === 'Trailer',
  );

  if (!trailer)
    return <p className="text-center text-white">No trailer available</p>;

  return (
    // <div className="relative h-0 w-full overflow-hidden rounded pb-[56.25%]">
    //   <iframe
    //     src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&autohide=1&showinfo=0`}
    //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //     className="absolute left-0 top-0 h-full w-full"
    //     frameBorder="0"
    //     allowFullScreen
    //   ></iframe>
    // </div>

    // <iframe
    //   src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&autohide=1&showinfo=0`}
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //   className="aspect-video w-full object-cover"
    //   frameBorder="0"
    //   allowFullScreen
    // ></iframe>

    // <iframe
    //   src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&autohide=1&showinfo=0`}
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //   className="max-h-full w-full rounded object-cover"
    //   frameBorder="0"
    //   allowFullScreen
    // ></iframe>

    <iframe
      src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&autohide=1&showinfo=0`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      className="aspect-video w-full object-cover"
      frameBorder="0"
      allowFullScreen
    ></iframe>

    // <iframe
    //   src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&autohide=1&showinfo=0`}
    //   frameBorder="0"
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //   allowFullScreen
    //   className="h-full w-full"
    // ></iframe>
  );
};

export default MovieTrailer;
