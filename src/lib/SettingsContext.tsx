"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import { createContext } from "react";

const SettingsContext = createContext<any>({
  theme: null,
  setTheme: () => {},
  language: null,
  setLanguage: () => {},
  pauseStories: null,
  setPauseStories: () => {},
  setTemporalPause: () => {},
  mutedStories: null,
  setMutedStories: () => {},
});

const SettingsContextProvider = ({children} : {children: React.ReactNode}) => {
  const { resolvedTheme, setTheme } = useTheme();
  
  const [pausedStories, setPausedStories] = useState(true);
  const [temporalPause, setTemporalPause] = useState(false);
  
  const previousPauseState = useRef(pausedStories);

  const [mutedStories, setMutedStories] = useState(true);

  useEffect(() => {
    setMutedStories(window.localStorage.getItem("mutedStories") === "true");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mutedStories", mutedStories.toString());
  }, [mutedStories]);

  useEffect(() => {
    if (temporalPause) {
      previousPauseState.current = pausedStories;
      setPausedStories(true);
    } else {
      setPausedStories(previousPauseState.current);
    }
  }, [temporalPause]);

  return (
    <SettingsContext.Provider
      value={{
        theme: resolvedTheme,
        setTheme: setTheme,
        pausedStories: pausedStories,
        setPausedStories: setPausedStories,
        setTemporalPause: setTemporalPause,
        mutedStories: mutedStories,
        setMutedStories: setMutedStories
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsContextProvider };
