"use client";

import { useTheme } from "next-themes";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import * as Constants from "@/misc/Constants";

interface TSettingsContext {
  theme: string | null;
  setTheme: (theme: string) => void;
  pausedStories: boolean | null;
  setPausedStories: (paused: boolean) => void;
  hasEverPlayedStories: boolean | null;
  setHasEverPlayedStories: (hasPlayed: boolean) => void;
  setTemporalPause: React.Dispatch<SetStateAction<boolean | null>>;
  mutedStories: boolean | null;
  setMutedStories: (muted: boolean) => void;
  fullScreenStories: boolean | null;
  setFullScreenStories: (fullScreen: boolean) => void;
}

const SettingsContext = createContext<TSettingsContext>({} as TSettingsContext);

const SettingsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme, setTheme } = useTheme();

  const [pausedStories, setPausedStories] = useState(true);
  const [hasEverPlayedStories, setHasEverPlayedStories] = useState(false);

  const [temporalPause, setTemporalPause] = useState(null as boolean | null);

  const previousPauseState = useRef(pausedStories);

  const [mutedStories, setMutedStories] = useState(true);
  const [fullScreenStories, setFullScreenStories] = useState(false);

  useEffect(() => {
    setMutedStories(window.localStorage.getItem("mutedStories") === "true");
    setHasEverPlayedStories(window.localStorage.getItem("hasEverPlayedStories") === "true");

    const existingFullScreenStories = window.localStorage.getItem("fullScreenStories");
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
        theme: resolvedTheme || null,
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
