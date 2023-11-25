import React, { createContext, useContext, useState } from "react";

const PhraseStorageTracker = createContext();

export const PhraseStorageTrackerProvider = ({ children }) => {
  const [storageChange, setStorageChange] = useState(true);

  return (
    <PhraseStorageTracker.Provider value={{ storageChange, setStorageChange }}>
      {children}
    </PhraseStorageTracker.Provider>
  );
};

export const usePhraseStorageTracker = () => {
  return useContext(PhraseStorageTracker);
};
