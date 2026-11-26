import type { CountryCode, Localized } from '../types';
import { storage } from './storage';

/** สกุลเงินของประเทศที่เรามีทัวร์ (เรียงตามลำดับประเทศใน COUNTRIES) */
export interface CurrencyInfo {
  code: string;
  country: CountryCode;
  symbol: string;
  name: Localized;
  /** ทศนิยมที่แสดง */
  digits: number;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'JPY', country: 'jp', symbol: '¥', name: { en: 'Japanese yen', th: 'เยนญี่ปุ่น' }, digits: 0 },
  { code: 'KRW', country: 'kr', symbol: '₩', name: { en: 'South Korean won', th: 'วอนเกาหลีใต้' }, digits: 0 },
  { code: 'TWD', country: 'tw', symbol: 'NT$', name: { en: 'New Taiwan dollar', th: 'ดอลลาร์ไต้หวัน' }, digits: 0 },
  { code: 'VND', country: 'vn', symbol: '₫', name: { en: 'Vietnamese dong', th: 'ดองเวียดนาม' }, digits: 0 },
  { code: 'CNY', country: 'cn', symbol: '¥', name: { en: 'Chinese yuan', th: 'หยวนจีน' }, digits: 2 },
  { code: 'SGD', country: 'sg', symbol: 'S$', name: { en: 'Singapore dollar', th: 'ดอลลาร์สิงคโปร์' }, digits: 2 },
  { code: 'IDR', country: 'id', symbol: 'Rp', name: { en: 'Indonesian rupiah', th: 'รูเปียห์อินโดนีเซีย' }, digits: 0 },
  { code: 'CHF', country: 'ch', symbol: 'CHF', name: { en: 'Swiss franc', th: 'ฟรังก์สวิส' }, digits: 2 },
  { code: 'EUR', country: 'it', symbol: '€', name: { en: 'Euro', th: 'ยูโร' }, digits: 2 },
];

export interface RateTable {
  /** 1 THB = rates[code] หน่วยของสกุลนั้น */
  rates: Record<string, number>;
  /** เวลาที่ผู้ให้บริการอัปเดตอัตรา (ms) */
  updatedAt: number;
  /** เวลาที่ผู้ให้บริการจะอัปเดตครั้งถัดไป (ms) — ก่อนเวลานี้ใช้แคชได้เลย */
  nextUpdateAt: number;
}

const CACHE_KEY = 'napaii.rates.thb';
/**
 * ExchangeRate-API (Open Access, ไม่ต้องใช้ key) — อัปเดตวันละครั้ง ต้องแสดงเครดิตบนหน้าเว็บ
 * เป็นอัตรากลาง ไม่ใช่อัตราซื้อขายจริงของธนาคาร
 * เมื่อมี backend แล้ว เปลี่ยน URL นี้ไปเรียกผ่าน backend ได้เลย (เช่นใช้ API ธปท.)
 */
const API_URL = 'https://open.er-api.com/v6/latest/THB';
export const RATES_SOURCE = { name: 'ExchangeRate-API', url: 'https://www.exchangerate-api.com' };

interface ApiResponse {
  result: string;
  time_last_update_unix: number;
  time_next_update_unix: number;
  rates: Record<string, number>;
}

/** ดึงอัตราแลกเปลี่ยน (ฐาน THB) — ใช้แคชใน localStorage จนถึงรอบอัปเดตถัดไป; โหลดไม่ได้จะคืนแคชเก่า (ถ้ามี) */
export async function fetchRates(force = false): Promise<RateTable> {
  const cached = storage.get<RateTable | null>(CACHE_KEY, null);
  if (!force && cached && Date.now() < cached.nextUpdateAt) return cached;
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ApiResponse;
    if (data.result !== 'success') throw new Error('Rates unavailable');
    const table: RateTable = {
      rates: Object.fromEntries(CURRENCIES.map((c) => [c.code, data.rates[c.code]]).filter(([, r]) => typeof r === 'number')),
      updatedAt: data.time_last_update_unix * 1000,
      nextUpdateAt: data.time_next_update_unix * 1000,
    };
    storage.set(CACHE_KEY, table);
    return table;
  } catch (err) {
    if (cached) return cached;
    throw err;
  }
}
