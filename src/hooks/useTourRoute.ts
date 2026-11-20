import { useEffect, useState } from 'react';

/**
 * Router แบบ hash เบา ๆ ไม่ต้องติดตั้งไลบรารีเพิ่ม (ใช้ได้กับ GitHub Pages ทันที)
 *   #/tours/jp1  → หน้ารายละเอียดทัวร์ jp1
 *   อย่างอื่น     → หน้าแรก (รวมถึง #featured, #upcoming ที่ใช้เลื่อนในหน้าแรก)
 * ถ้าอยากได้ URL สวย /tours/jp1 ให้เปลี่ยนไปใช้ react-router-dom ภายหลัง — แก้ที่จุดนี้กับ App.tsx
 */
const TOUR_HASH = /^#\/tours\/([\w-]+)\/?$/;

export const tourHref = (id: string): string => `#/tours/${id}`;

const readId = (): string | null => TOUR_HASH.exec(window.location.hash)?.[1] ?? null;

/** คืนค่า id ของทัวร์ที่กำลังเปิดอยู่ หรือ null เมื่ออยู่หน้าแรก */
export function useTourRoute(): string | null {
  const [id, setId] = useState<string | null>(readId);
  useEffect(() => {
    const onChange = () => setId(readId());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return id;
}

let homeScrollY = 0;

/** จำตำแหน่งเลื่อนของหน้าแรกก่อนเข้าหน้าทัวร์ เพื่อกลับมาที่เดิม */
export function rememberHomeScroll(): void {
  if (!TOUR_HASH.test(window.location.hash)) homeScrollY = window.scrollY;
}
export const recalledHomeScroll = (): number => homeScrollY;
