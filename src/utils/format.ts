import type { TourItem } from '../types';
import { isComingSoon } from './calendar';
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

/** ซ่อนตัวเลขราคา (ยังไม่เปิดราคา): ฿59,900 → ฿XX,XXX */
export const maskPrice = (text: string): string => text.replace(/\d/g, 'X');

/** ราคาที่จะแสดงของทัวร์: ทัวร์ที่กำลังจะเปิดขาย (status 'soon') แสดงเป็น ฿XX,XXX */
export const tourPriceText = (tour: TourItem, format: (baht: number) => string): string =>
  isComingSoon(tour) ? maskPrice(format(tour.price)) : format(tour.price);
