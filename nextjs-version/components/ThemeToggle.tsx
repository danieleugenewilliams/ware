'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  
  // Access the theme context directly
  const { theme, setTheme } = useTheme();
  
  // When component mounts, we can safely use client-side features
  useEffect(() => {
    setMounted(true);
    
    // Log theme state for debugging
    console.log('Current theme:', theme);
  }, [theme]);

  // Handle theme changes when the select value changes
  const handleThemeChange = (value: string) => {
    console.log('Changing theme to:', value);
    setTheme(value as 'light' | 'dark' | 'system');
  };

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return <div className="h-9 w-28" />; // Placeholder with same dimensions
  }

  return (
    <div className="flex items-center space-x-2">
      <select
        value={theme}
        onChange={(e) => handleThemeChange(e.target.value)}
        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Select theme"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
      {/* Icon based on current theme */}
      <span className="text-gray-800 dark:text-gray-200">
        {theme === 'dark' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        )}
        {theme === 'light' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        )}
        {theme === 'system' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="3" rx="2"></rect>
            <line x1="8" x2="16" y1="21" y2="21"></line>
            <line x1="12" x2="12" y1="17" y2="21"></line>
          </svg>
        )}
      </span>
    </div>
  );
}