"use client";

import { useTheme } from "next-themes";
import React, { useState } from "react";
import { createContext } from "react";

const SettingsContext = createContext<any>({
  theme: null,
  setTheme: () => {},
  language: null,
  setLanguage: () => {},
  pauseStories: null,
  setPauseStories: () => {},
});

const SettingsContextProvider = ({children} : {children: React.ReactNode}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [pausedStories, setPausedStories] = useState(true);

  return (
    <SettingsContext.Provider
      value={{
        theme: resolvedTheme,
        setTheme: setTheme,
        pausedStories: pausedStories,
        setPausedStories: setPausedStories
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsContextProvider };
