import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [useDark, setDark] = useState(false);
  const toggle = () => setDark((v) => !v);

  return (
    <ThemeContext.Provider value={{ useDark, setDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
