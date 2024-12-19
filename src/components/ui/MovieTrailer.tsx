import { FC } from 'react';
import { MediaType } from '../../types/tmdb';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchMovieAndTVVideo } from '../../services/fetchMovieAndTVVideo';

interface MovieTrailerProps {
  movieId: number;
  mediaType: MediaType;
}

const MovieTrailer: FC<MovieTrailerProps> = ({ movieId, mediaType }) => {
  const { id } = useParams();
  const { data: movieTrailer, error } = useSuspenseQuery({
    queryKey: [`VideoTrailer`, mediaType, movieId],
    queryFn: () => fetchMovieAndTVVideo(movieId, mediaType),
  });

  if (error)
    return (
      <p className="text-center text-3xl text-white">Error fetching video</p>
    );

  // Filter for YouTube trailers
  const trailer = movieTrailer?.find(
    (video: any) => video.site === 'YouTube' && video.type === 'Trailer',
  );

  if (!trailer)
    return <p className="text-center text-white">No trailer available</p>;

  return (
    <iframe
      src={`https://www.youtube.com/embed/${trailer.key}?${!id ? 'autoplay=1' : 'autoplay=0'}&mute=1&loop=1&controls=0&modestbranding=1&rel=0&autohide=1&showinfo=0`}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      className={`aspect-video w-full rounded-lg object-cover ${
        id && 'border'
      }`}
      allowFullScreen
    ></iframe>
  );
};

export default MovieTrailer;
