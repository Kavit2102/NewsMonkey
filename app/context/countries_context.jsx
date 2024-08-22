"use client";

import React, { createContext, useState } from "react";

export const CountriesContext = createContext();

const getInitialState = () => {
  const ISSERVER = typeof window === "undefined";

  if (!ISSERVER) {
    // Access localStorage
    const country = localStorage.getItem("country-code");
    return country ? country : "in";
  }
};

export const CountriesWrapper = ({ children }) => {
  const [country, setCountry] = useState(getInitialState);

  return (
    <CountriesContext.Provider value={{ country, setCountry }}>
      {children}
    </CountriesContext.Provider>
  );
};
