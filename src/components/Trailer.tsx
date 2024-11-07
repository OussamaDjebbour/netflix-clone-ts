// components/Trailer.tsx
import React from 'react';

interface Props {
  trailerPath: string;
}

const Trailer: React.FC<Props> = ({ trailerPath }) => {
  return (
    <div className="mb-4">
      <h2 className="mb-2 text-2xl font-bold">Trailer</h2>
      <iframe
        className="h-64 w-full"
        src={`https://www.youtube.com/embed/${trailerPath}`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default Trailer;
