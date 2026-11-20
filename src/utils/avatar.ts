import type { CSSProperties } from 'react';
import { cssVars } from './format';

/** ป้าย "+8" ไม่ใช่คน — แสดงเป็นสีกลาง ๆ */
export const isOverflowBadge = (label: string): boolean => /^\+\d+$/.test(label);

/**
 * สุ่มสีของแต่ละคนจากอักษรย่อ (pseudo-random แบบคงที่)
 * - คนเดิมได้สีเดิมทุกครั้ง ไม่กะพริบเปลี่ยนสีเมื่อ re-render หรือสลับภาษา
 * - ใช้ golden angle (137.5°) กระจายเฉดสี ให้อักษรใกล้เคียงกันได้สีต่างกันชัด
 * - ความสว่างค่อนต่ำ ตัวอักษรขาวจึงอ่านชัดทั้งธีมสว่างและมืด
 */
export function avatarStyle(label: string): CSSProperties {
  let hash = 0;
  for (const ch of label) hash = (hash * 31 + (ch.codePointAt(0) ?? 0)) >>> 0;
  const hue = Math.round((hash * 137.508) % 360);
  return cssVars({
    '--c1': `hsl(${hue} 68% 58%)`,
    '--c2': `hsl(${(hue + 28) % 360} 62% 42%)`,
  });
}
