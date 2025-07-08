'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'default' | 'sunset' | 'monsoon';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('default');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-sunset', 'theme-monsoon');
    
    if (theme !== 'default') {
      root.classList.add(`theme-${theme}`);
    }

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
