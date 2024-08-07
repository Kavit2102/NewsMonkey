"use client";
import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeWrapper = ({ children }) => {
  const [Theme, setTheme] = useState(localStorage.getItem("theme"));

  return (
    <ThemeContext.Provider value={{ Theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
