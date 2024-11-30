// components/Cast.tsx
import React from 'react';

interface Props {
  cast: { id: number; name: string; character: string }[];
}

const Cast: React.FC<Props> = ({ cast }) => {
  console.log(cast);
  return (
    <div className="mb-4 leading-relaxed">
      <h2 className="mb-2 text-xl font-bold">Cast</h2>
      <ul>
        {cast?.map((actor) => (
          <li key={actor.id}>
            <span className="font-bold">{actor.name}</span> as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cast;