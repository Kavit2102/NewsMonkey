"use client";
import { useContext } from "react";
import { ThemeContext } from "../context/theme_context";

export const ClientWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return <div data-theme={theme}>{children}</div>;
};
