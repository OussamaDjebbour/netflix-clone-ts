// components/Reviews.tsx
import React from 'react';

interface Props {
  reviews: { id: string; author: string; content: string }[];
}

const Reviews: React.FC<Props> = ({ reviews }) => {
  return (
    <div className="mb-4 text-lg leading-relaxed">
      <h2 className="mb-2 text-2xl font-bold">Reviews</h2>
      <ul>
        {reviews?.map((review) => (
          <li key={review.id}>
            <span className="font-bold">{review.author}</span>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
