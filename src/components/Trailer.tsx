// components/Trailer.tsx
import React from 'react';

interface Props {
  trailerPath: string;
}

const Trailer: React.FC<Props> = ({ trailerPath }) => {
  return (
    <div className="mb-4 p-4">
      <h2 className="mb-2 text-xl font-bold">Trailer</h2>
      <iframe
        className="border border-[#999]"
        src={`https://www.youtube.com/embed/${trailerPath}`}
        allowFullScreen
      />
    </div>
  );
};

export default Trailer;
