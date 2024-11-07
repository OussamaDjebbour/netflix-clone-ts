import React, { createContext, useContext, useState, ReactNode } from 'react';

interface isShowContextState {
  isShow: boolean;
  handleToggleIsShow: () => void;
}

// Create the context
const isShowContext = createContext<isShowContextState | undefined>(undefined);

// Create the provider component
interface IsShowNavbarProviderProps {
  children: ReactNode;
}

export const IsShowNavbarProvider: React.FC<IsShowNavbarProviderProps> = ({
  children,
}) => {
  const [isShow, setIsShow] = useState(false);

  const handleToggleIsShow = () => {
    setIsShow((isShow) => !isShow);
  };

  const value: isShowContextState = {
    isShow,
    handleToggleIsShow,
  };

  return (
    <isShowContext.Provider value={value}>{children}</isShowContext.Provider>
  );
};

// Custom hook to access isShowContext
export const useIsShowNavbarContext = () => {
  const context = useContext(isShowContext);
  if (!context) {
    throw new Error(
      'useIsShowNavbarContext must be used within a IsShowNavbarProvider',
    );
  }
  return context;
};
