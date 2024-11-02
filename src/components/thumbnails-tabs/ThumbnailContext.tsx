import React from "react";
import { createContext } from "react";

const ThumbnailContext = createContext<any>({
  onFocus: null
});

interface ThumbnailContextProviderProps {
  children: React.ReactElement;
  onFocus: (event: React.FocusEvent<HTMLDivElement>) => void;
}

const ThumbnailContextProvider = ({ children, onFocus }: ThumbnailContextProviderProps) => {
  return (
    <ThumbnailContext.Provider
      value={{
        onFocus
      }}
    >
      {children}
    </ThumbnailContext.Provider>
  );
};

export { ThumbnailContext, ThumbnailContextProvider };
