import React, { createContext, useState } from 'react';

// Create Context
export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  // State for theme
  const [theme, setTheme] = useState(false);

  // Function to toggle theme
  const changeTheme = () => {
    setTheme(!theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
