// // // components/Reviews.tsx
// // import React from 'react';

// // interface Props {
// //   reviews: { id: string; author: string; content: string }[];
// // }

// // const Reviews: React.FC<Props> = ({ reviews }) => {
// //   return (
// //     <div className="mb-4 leading-relaxed">
// //       <h2 className="mb-2 text-xl font-bold">Reviews</h2>
// //       <ul>
// //         {reviews?.map((review) => (
// //           <li key={review.id}>
// //             <span className="font-bold">{review.author}</span>
// //             <p>{review.content}</p>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Reviews;

// import { useQuery } from '@tanstack/react-query';

// const fetchMovieReviews = async (movieId: number) => {
//   const apiKey = import.meta.env.VITE_API_KEY;
//   const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`;
//   const response = await fetch(url);
//   if (!response.ok) throw new Error('Failed to fetch reviews');
//   return response.json();
// };

// interface Props {
//   movieId: number;
//   // reviews: { id: string; author: string; content: string }[];
// }

// const ReviewsComponent: React.FC<Props> = ({ movieId }) => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['reviews', movieId], // Add mediaQuery Laterrrr
//     queryFn: () => fetchMovieReviews(movieId),
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error: {error.message}</div>;

//   return (
//     <div>
//       <h2>Reviews</h2>
//       {data.results.length > 0 ? (
//         data.results.map((review) => (
//           <div key={review.id}>
//             <h3>{review.author}</h3>
//             <p>{review.content}</p>
//           </div>
//         ))
//       ) : (
//         <p>No reviews available.</p>
//       )}
//     </div>
//   );
// };

// export default ReviewsComponent;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

interface CastMember {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number | null;
  id: number;
  name: string;
  order: number;
  profile_path: string | null;
}

interface CreditsResponse {
  cast: CastMember[];
  crew: any[]; // Optional if you only need cast data; otherwise, type accordingly
}

const fetchMovieCast = async (movieId: string): Promise<CastMember[]> => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch cast');

  const data: CreditsResponse = await response.json();
  return data.cast;
};

const CastComponent: React.FC<{ movieId: string }> = ({ movieId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['movieCast', movieId],
    queryFn: () => fetchMovieCast(movieId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError && error instanceof Error)
    return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Cast</h2>
      {data && data.length > 0 ? (
        data.map((castMember) => (
          <div key={castMember.cast_id} className="cast-member">
            <p>
              {castMember.name} as {castMember.character}
            </p>
            {castMember.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
                alt={`${castMember.name}`}
                className="profile-image"
              />
            )}
          </div>
        ))
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};

export default CastComponent;
