import React from 'react';

interface Props {
  overview: string;
}

const Overview: React.FC<Props> = ({ overview }) => {
  return (
    <div className="mb-8 leading-relaxed">
      <h2 className="mb-2 text-xl font-bold min-[600px]:text-2xl lg:text-[1.6rem]">
        Overview
      </h2>
      <p className="text-[#D3D3D3]">{overview}</p>
    </div>
  );
};

export default Overview;
