import React, { createContext, useContext, useState, ReactNode } from 'react';

interface isImageLoadedContextState {
  isImageLoaded: boolean;
  handleChangeIsImageLoaded: (newImageLoaded: boolean) => void;
}

// Create the context
const isImageLoadedContext = createContext<
  isImageLoadedContextState | undefined
>(undefined);

// Create the provider component
interface IsImageLoadedProviderProps {
  children: ReactNode;
}

export const IsImageLoadedProvider: React.FC<IsImageLoadedProviderProps> = ({
  children,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleChangeIsImageLoaded = (newImageLoaded: boolean) => {
    setIsImageLoaded(newImageLoaded);
  };

  const value: isImageLoadedContextState = {
    isImageLoaded,
    handleChangeIsImageLoaded,
  };

  return (
    <isImageLoadedContext.Provider value={value}>
      {children}
    </isImageLoadedContext.Provider>
  );
};

// Custom hook to access isImageLoadedContext
export const useIsImageLoadedContext = () => {
  const context = useContext(isImageLoadedContext);
  if (!context) {
    throw new Error(
      'useIsImageLoadedContext must be used within a IsImageLoadedProvider',
    );
  }
  return context;
};
