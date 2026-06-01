'use client';

import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const stored = window.localStorage.getItem('portfolio-theme');
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle('light', stored === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    window.localStorage.setItem('portfolio-theme', next);
    document.documentElement.classList.toggle('light', next === 'light');
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-300/40 hover:bg-slate-800/80"
    >
      {theme === 'dark' ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
