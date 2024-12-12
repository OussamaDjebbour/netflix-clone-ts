import { fetchMovieVideo } from '../../services/fetchMovieVideo';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMediaContext } from '../../context/useMediaContext';
import { useParams } from 'react-router-dom';

const MovieTrailer = ({ movieId }: { movieId: number }) => {
  // const { mediaType } = useMediaContext();
  const { id, mediaType = 'movie' } = useParams();

  const { data: movieTrailer, error } = useSuspenseQuery({
    queryKey: ['movieVideos', mediaType, movieId],
    queryFn: () => fetchMovieVideo(movieId, mediaType),
  });

  console.log('movieTrailer', movieTrailer);

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
