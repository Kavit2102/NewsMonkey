"use client";
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const getInitialState = async () => {
  const ISSERVER = typeof window === "undefined";

  if (!ISSERVER) {
    const theme = (await localStorage.getItem("theme"))
      ? localStorage.getItem("theme")
      : localStorage.setItem("theme", "dark");
    return theme ? theme : "dark";
  }
};

export const ThemeWrapper = ({ children }) => {
  const [Theme, setTheme] = useState(getInitialState);

  return (
    <ThemeContext.Provider value={{ Theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
