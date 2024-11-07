// components/Overview.tsx
import React from 'react';

interface Props {
  overview: string;
}

const Overview: React.FC<Props> = ({ overview }) => {
  return (
    <div className="mb-4 text-lg leading-relaxed">
      <h2 className="mb-2 text-2xl font-bold">Overview</h2>
      <p>{overview}</p>
    </div>
  );
};

export default Overview;
