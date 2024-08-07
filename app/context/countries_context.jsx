"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";

// Create a context
export const CountriesContext = createContext();

// Custom hook for localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    const fetchStoredValue = async () => {
      try {
        const item = await localStorage.getItem(key);
        setStoredValue(item || initialValue);
      } catch (error) {
        console.log("Error accessing local storage:", error);
      }
    };

    fetchStoredValue();
  }, [key, initialValue]);

  const setValue = useCallback(
    async (value) => {
      try {
        await localStorage.setItem(key, value);
        setStoredValue(value);
      } catch (error) {
        console.error("Error setting value in local storage:", error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
};

// Wrapper component
export const CountriesWrapper = ({ children }) => {
  const [country, setCountry] = useLocalStorage("code", "in");

  return (
    <CountriesContext.Provider value={{ country, changeCountry: setCountry }}>
      {children}
    </CountriesContext.Provider>
  );
};
