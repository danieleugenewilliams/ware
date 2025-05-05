'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize with system theme
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Initial setup - run only once on client-side
  useEffect(() => {
    // Mark component as mounted
    setMounted(true);
    
    // Get stored theme preference or default to system
    const storedTheme = localStorage.getItem('ware-theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
    
    // Apply initial theme
    const root = document.documentElement;
    if (storedTheme === 'dark' || 
        (storedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (!mounted) return;

    // Save theme preference
    localStorage.setItem('ware-theme', theme);
    
    // Apply theme class
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      console.log('Dark theme applied');
    } else if (theme === 'light') {
      root.classList.remove('dark');
      console.log('Light theme applied');
    } else if (theme === 'system') {
      // For system theme, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        console.log('Dark theme applied (system)');
      } else {
        root.classList.remove('dark');
        console.log('Light theme applied (system)');
      }
    }
  }, [theme, mounted]);

  // Listen for system preference changes
  useEffect(() => {
    if (!mounted) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const root = document.documentElement;
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}