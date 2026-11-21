import { ARTICLES, SOON_TOURS, TOURS } from '../data/tours';
import type { Article, Departure, TourItem } from '../types';
import { sleep } from '../utils/format';
import { storage } from './storage';
import { nextDeparture } from '../utils/calendar';

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
  return [...TOURS, ...SOON_TOURS].find((t) => t.id === id) ?? null;
}

/** Departing Soon: ทัวร์ที่กำลังจะเปิดขาย (แยกจากทัวร์ที่ขายอยู่/เต็มแล้ว) — รอบที่ใกล้ที่สุดของแต่ละทัวร์ เรียงตามวันที่ */
export async function fetchDepartures(): Promise<Departure[]> {
  await sleep(300);
  return SOON_TOURS.map((tour) => ({ tour, date: nextDeparture(tour) ?? tour.departures[0] })).sort((a, b) => a.date.localeCompare(b.date));
}

export async function fetchArticles(): Promise<Article[]> {
  await sleep(300);
  return ARTICLES;
}

/** ดึงทัวร์หลายรายการตาม id (ใช้กับรายการที่บันทึกไว้) — id ที่ไม่พบจะไม่ถูกคืนมา */
export async function fetchToursByIds(ids: string[]): Promise<TourItem[]> {
  await sleep(150);
  return [...TOURS, ...SOON_TOURS].filter((t) => ids.includes(t.id));
}

/* ---------- จำนวนการเข้าชมบทความ ----------
 * เวอร์ชันสาธิต: นับเพิ่มจากค่าตั้งต้น (article.views) แล้วเก็บไว้ใน localStorage ของเบราว์เซอร์นี้
 * นับ 1 ครั้งต่อบทความต่อการเปิดเว็บ (session) เพื่อไม่ให้คนเดิมกดซ้ำแล้วยอดพุ่ง
 * ของจริง: ให้ backend นับ เช่น POST `${import.meta.env.VITE_API_URL}/articles/${id}/view` แล้วคืนยอดล่าสุด
 */
const VIEWS_KEY = 'napaii_article_views';
const SEEN_KEY = 'napaii_article_seen';

/** ยอดเข้าชมทั้งหมดของบทความ (ค่าตั้งต้น + ที่นับเพิ่มในเครื่องนี้) */
export function articleViews(article: Article): number {
  const extra = storage.get<Record<string, number>>(VIEWS_KEY, {})[article.id] ?? 0;
  return (article.views ?? 0) + extra;
}

function seenThisSession(id: string): boolean {
  try {
    const seen: string[] = JSON.parse(sessionStorage.getItem(SEEN_KEY) ?? '[]');
    if (seen.includes(id)) return true;
    sessionStorage.setItem(SEEN_KEY, JSON.stringify([...seen, id]));
  } catch {
    // sessionStorage ใช้ไม่ได้ (private mode ฯลฯ) → นับทุกครั้ง
  }
  return false;
}

/** บันทึกการเข้าชม 1 ครั้ง แล้วคืนยอดล่าสุด */
export async function recordArticleView(article: Article): Promise<number> {
  if (!seenThisSession(article.id)) {
    const all = storage.get<Record<string, number>>(VIEWS_KEY, {});
    storage.set(VIEWS_KEY, { ...all, [article.id]: (all[article.id] ?? 0) + 1 });
  }
  return articleViews(article);
}
