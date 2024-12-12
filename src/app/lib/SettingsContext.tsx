"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import { createContext } from "react";
import * as Constants from "@/misc/Constants";

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
  fullScreenStories: null,
  setFullScreenStories: () => {},
});

const SettingsContextProvider = ({children} : {children: React.ReactNode}) => {
  const { resolvedTheme, setTheme } = useTheme();
  
  const [pausedStories, setPausedStories] = useState(true);
  const [temporalPause, setTemporalPause] = useState(null);
  
  const previousPauseState = useRef(pausedStories);

  const [mutedStories, setMutedStories] = useState(true);
  const [fullScreenStories, setFullScreenStories] = useState(false);

  useEffect(() => {
    setMutedStories(window.localStorage.getItem("mutedStories") === "true");
    let existingFullScreenStories = window.localStorage.getItem("fullScreenStories");
    if (existingFullScreenStories) {
      setFullScreenStories(existingFullScreenStories === "true");
    } else {
      if (window.innerWidth < Constants.SMALL_BREAKPOINT_WIDTH) {
        setFullScreenStories(true);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("mutedStories", mutedStories.toString());
  }, [mutedStories]);

  useEffect(() => {
    window.localStorage.setItem("fullScreenStories", fullScreenStories.toString());
  }, [fullScreenStories]);

  useEffect(() => {
    if (temporalPause) {
      previousPauseState.current = pausedStories;
      setPausedStories(true);
      setTemporalPause(null);
    } else if (temporalPause === false) {
      setPausedStories(previousPauseState.current);
      setTemporalPause(null);
    }
  }, [temporalPause, pausedStories]);

  return (
    <SettingsContext.Provider
      value={{
        theme: resolvedTheme,
        setTheme: setTheme,
        pausedStories: pausedStories,
        setPausedStories: setPausedStories,
        setTemporalPause: setTemporalPause,
        mutedStories: mutedStories,
        setMutedStories: setMutedStories,
        fullScreenStories: fullScreenStories,
        setFullScreenStories: setFullScreenStories,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsContextProvider };
