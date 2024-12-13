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
  pausedStories: null,
  setPausedStories: () => {},
  hasEverPlayedStories: null,
  setHasEverPlayedStories: () => {},
  setTemporalPause: () => {},
  mutedStories: null,
  setMutedStories: () => {},
  fullScreenStories: null,
  setFullScreenStories: () => {},
});

const SettingsContextProvider = ({children} : {children: React.ReactNode}) => {
  const { resolvedTheme, setTheme } = useTheme();
  
  const [pausedStories, setPausedStories] = useState(true);
  const [hasEverPlayedStories, setHasEverPlayedStories] = useState(false);
  
  const [temporalPause, setTemporalPause] = useState(null);
  
  const previousPauseState = useRef(pausedStories);

  const [mutedStories, setMutedStories] = useState(true);
  const [fullScreenStories, setFullScreenStories] = useState(false);

  useEffect(() => {
    setMutedStories(window.localStorage.getItem("mutedStories") === "true");
    setHasEverPlayedStories(window.localStorage.getItem("hasEverPlayedStories") === "true");

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
    if (!mutedStories) {
      window.localStorage.setItem("hasEverActivatedSound", "true");
    }
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

  useEffect(() => {
    if (!pausedStories) {
      setHasEverPlayedStories(true);
      window.localStorage.setItem("hasEverPlayedStories", "true");
    }
  }, [pausedStories]);

  return (
    <SettingsContext.Provider
      value={{
        theme: resolvedTheme,
        setTheme: setTheme,
        pausedStories: pausedStories,
        setPausedStories: setPausedStories,
        hasEverPlayedStories: hasEverPlayedStories,
        setHasEverPlayedStories: setHasEverPlayedStories,
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
