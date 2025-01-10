"use client";

import { createContext, useState } from 'react';

const StatsContext = createContext({
  numberFormat: 'percentage',
  sortBy: 'date',
  viewType: 'table',
  updatePreferences: () => {}
});

export const StatsProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    numberFormat: 'percentage',
    sortBy: 'date',
    viewType: 'table'
  });
  const updatePreferences = (newPreferences) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };
  return (
    <StatsContext.Provider value={{ ...preferences, updatePreferences }}>
      {children}
    </StatsContext.Provider>
  );
};

export default StatsContext;