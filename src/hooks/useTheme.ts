import { useCallback, useEffect, useState } from 'react';
import { storage } from '../services/storage';
import type { ThemeMode } from '../types';

const KEY = 'theme';

function initialTheme(): ThemeMode {
  const saved = storage.get<ThemeMode | null>(KEY, null);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** สลับธีมสว่าง/มืด — เขียน data-theme ที่ <html> และจำค่าไว้ */
export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    storage.set(KEY, next);
  }, []);

  return { theme, setTheme };
}
