import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const themes = {
  dark: {
    name: 'Dark Theme',
    primary: '#1a1a2e',
    secondary: '#262641',
    accent: '#00d4ff',
    accentBg: '#64c8ff',
    text: '#e5e7eb',
    border: 'rgba(100, 200, 255, 0.3)',
    bg: 'linear-gradient(135deg, #0a0a14 0%, #1a1a2e 100%)',
  },
  ocean: {
    name: 'Ocean Theme',
    primary: '#0f172a',
    secondary: '#1e3a5f',
    accent: '#06b6d4',
    accentBg: '#0891b2',
    text: '#e0f2fe',
    border: 'rgba(6, 182, 212, 0.3)',
    bg: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
  },
  forest: {
    name: 'Forest Theme',
    primary: '#0f6b4b',
    secondary: '#1a8659',
    accent: '#10b981',
    accentBg: '#34d399',
    text: '#d1fae5',
    border: 'rgba(16, 185, 129, 0.3)',
    bg: 'linear-gradient(135deg, #064e3b 0%, #0f6b4b 100%)',
  },
  sunset: {
    name: 'Sunset Theme',
    primary: '#7c2d12',
    secondary: '#92400e',
    accent: '#f97316',
    accentBg: '#fb923c',
    text: '#fed7aa',
    border: 'rgba(249, 115, 22, 0.3)',
    bg: 'linear-gradient(135deg, #431407 0%, #7c2d12 100%)',
  },
  midnight: {
    name: 'Midnight Theme',
    primary: '#1e1b4b',
    secondary: '#312e81',
    accent: '#818cf8',
    accentBg: '#a5b4fc',
    text: '#e0e7ff',
    border: 'rgba(129, 140, 248, 0.3)',
    bg: 'linear-gradient(135deg, #0f0c27 0%, #1e1b4b 100%)',
  },
  berry: {
    name: 'Berry Theme',
    primary: '#581c87',
    secondary: '#7e22ce',
    accent: '#d946ef',
    accentBg: '#f472b6',
    text: '#fce7f3',
    border: 'rgba(217, 70, 239, 0.3)',
    bg: 'linear-gradient(135deg, #2d1245 0%, #581c87 100%)',
  },
  blackWhite: {
    name: 'Black & White',
    primary: '#000000',
    secondary: '#333333',
    accent: '#ffffff',
    accentBg: '#f0f0f0',
    text: '#ffffff',
    border: 'rgba(255, 255, 255, 0.2)',
    bg: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
  },
  windowBlue: {
    name: 'Windows Blue',
    primary: '#e8f4f8',
    secondary: '#d0e7f0',
    accent: '#0078d4',
    accentBg: '#0078d4',
    text: '#1a1a1a',
    border: 'rgba(0, 120, 212, 0.2)',
    bg: 'linear-gradient(135deg, #ffffff 0%, #e8f4f8 100%)',
  },
  corporateBlue: {
    name: 'Corporate Blue',
    primary: '#003d7a',
    secondary: '#1a4d8f',
    accent: '#0066cc',
    accentBg: '#3399ff',
    text: '#e6f0ff',
    border: 'rgba(0, 102, 204, 0.3)',
    bg: 'linear-gradient(135deg, #001a4d 0%, #003d7a 100%)',
  },
  lightMode: {
    name: 'Light Mode',
    primary: '#f5f5f5',
    secondary: '#eeeeee',
    accent: '#2196f3',
    accentBg: '#64b5f6',
    text: '#212121',
    border: 'rgba(33, 150, 243, 0.2)',
    bg: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
  },
  corporateGray: {
    name: 'Corporate Gray',
    primary: '#2a2a2a',
    secondary: '#404040',
    accent: '#666666',
    accentBg: '#999999',
    text: '#e0e0e0',
    border: 'rgba(102, 102, 102, 0.3)',
    bg: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  },
};

export function ThemeProvider({ children }) {
  // Determine initial theme synchronously (before render)
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('appTheme');
    return (savedTheme && themes[savedTheme]) ? savedTheme : 'corporateGray';
  };

  const applyTheme = (theme) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent-bg', theme.accentBg);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--border', theme.border);
    root.style.setProperty('--bg', theme.bg);
    
    // Apply background directly to body for immediate visibility
    document.body.style.background = theme.bg;
    document.body.style.color = theme.text;
  };

  const initialTheme = getInitialTheme();
  // Apply theme immediately before state initialization
  applyTheme(themes[initialTheme]);
  
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const [themeData, setThemeData] = useState(themes[initialTheme]);

  // Ensure theme is applied on theme changes
  useEffect(() => {
    applyTheme(themes[currentTheme]);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      setThemeData(themes[themeName]);
      applyTheme(themes[themeName]);
      localStorage.setItem('appTheme', themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      themeData,
      changeTheme,
      allThemes: themes,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
