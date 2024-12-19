import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div
      className="m-auto flex basis-full items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-b-blue-500 border-t-blue-500"></div>
        <div className="absolute left-0 top-0 h-16 w-16 rounded-full border-4 border-blue-300 opacity-50"></div>
      </div>
    </div>
  );
};

export default Spinner;
