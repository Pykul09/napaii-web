import { ARTICLES, TOURS } from '../data/tours';
import type { Article, Departure, TourItem } from '../types';
import { sleep } from '../utils/format';

/**
 * จุดเดียวที่ต้องแก้เมื่อมี backend จริง ตัวอย่าง:
 *
 *   const res = await fetch(`${import.meta.env.VITE_API_URL}/tours`);
 *   if (!res.ok) throw new Error('Failed to load tours');
 *   return (await res.json()) as TourItem[];
 */
export async function fetchFeaturedTours(): Promise<TourItem[]> {
  await sleep(1600); // จำลองเวลาโหลด เพื่อโชว์ skeleton
  return TOURS;
}

/** ดึงทัวร์เดียวตาม id สำหรับหน้า #/tours/:id — คืน null ถ้าไม่พบ */
export async function fetchTourById(id: string): Promise<TourItem | null> {
  await sleep(250);
  return TOURS.find((t) => t.id === id) ?? null;
}

/** รอบออกเดินทางที่ใกล้ที่สุดของแต่ละทัวร์ เรียงตามวันที่ */
export async function fetchDepartures(): Promise<Departure[]> {
  await sleep(300);
  return TOURS.map((tour) => ({ tour, date: tour.departures[0] })).sort((a, b) => a.date.localeCompare(b.date));
}

export async function fetchArticles(): Promise<Article[]> {
  await sleep(300);
  return ARTICLES;
}

/** ดึงทัวร์หลายรายการตาม id (ใช้กับรายการที่บันทึกไว้) — id ที่ไม่พบจะไม่ถูกคืนมา */
export async function fetchToursByIds(ids: string[]): Promise<TourItem[]> {
  await sleep(150);
  return TOURS.filter((t) => ids.includes(t.id));
}
