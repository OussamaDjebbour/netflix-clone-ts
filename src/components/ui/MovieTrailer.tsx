import { fetchMovieVideo } from '../../services/fetchMovieVideo';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMediaContext } from '../../context/useMediaContext';

const MovieTrailer = ({ movieId }: { movieId: number }) => {
  const { mediaType } = useMediaContext();

  const { data: movieTrailer, error } = useSuspenseQuery({
    queryKey: ['movieVideos', mediaType, movieId],
    queryFn: () => fetchMovieVideo(movieId, mediaType),
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
      src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&autohide=1&showinfo=0`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      className="aspect-video w-full object-cover"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default MovieTrailer;
