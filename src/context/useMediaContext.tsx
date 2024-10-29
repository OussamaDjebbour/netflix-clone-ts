import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for mediaType and the context state
type MediaType = 'movie' | 'tv';

interface MediaContextState {
  mediaType: MediaType;
  handleChangeMedia: (newMedia: MediaType) => void;
}

// Create the context
const MediaContext = createContext<MediaContextState | undefined>(undefined);

// Create the provider component
interface MediaProviderProps {
  children: ReactNode;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({ children }) => {
  const [mediaType, setMediaType] = useState<MediaType>('movie');

  const handleChangeMedia = (newMedia: MediaType) => {
    // startTransition(() => {
    setMediaType(newMedia);
    // });
  };

  const value: MediaContextState = {
    mediaType,
    handleChangeMedia,
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
