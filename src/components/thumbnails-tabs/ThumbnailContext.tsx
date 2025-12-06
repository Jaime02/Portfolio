import React from "react";
import { createContext } from "react";

interface TThumbnailContext {
  onFocus: (event: React.FocusEvent<HTMLDivElement>) => void;
}

const ThumbnailContext = createContext<TThumbnailContext>({} as TThumbnailContext);

interface ThumbnailContextProviderProps {
  children: React.ReactElement;
  onFocus: (event: React.FocusEvent<HTMLDivElement>) => void;
}

const ThumbnailContextProvider = ({ children, onFocus }: ThumbnailContextProviderProps) => {
  return (
    <ThumbnailContext.Provider
      value={{
        onFocus,
      }}
    >
      {children}
    </ThumbnailContext.Provider>
  );
};

export { ThumbnailContext, ThumbnailContextProvider };
