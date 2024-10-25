import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for mediaType and the context state
type MediaType = 'movies' | 'tvShows';

interface MediaContextState {
  mediaType: MediaType;
  setMediaType: (type: MediaType) => void;
}

// Create the context
const MediaContext = createContext<MediaContextState | undefined>(undefined);

// Create the provider component
interface MediaProviderProps {
  children: ReactNode;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
  const [mediaType, setMediaType] = useState<MediaType>('movies');

  const value: MediaContextState = {
    mediaType,
    setMediaType,
  };

  return (
    <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
  );
};

// Custom hook to access MediaContext
export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMediaContext must be used within a MediaProvider');
  }
  return context;
};
