import type { CSSProperties } from 'react';

/** ใส่ CSS custom property ผ่าน style prop แบบ type-safe */
export const cssVars = (vars: Record<string, string | number>): CSSProperties => vars as CSSProperties;

export const initials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'U';

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
