import type { Localized } from '../types';
import { CALL_CENTER, LINE_OA_ID } from '../utils/line';

/**
 * ข้อมูลติดต่อบริษัท (แสดงใน Footer)
 * ⚠️ ค่าด้านล่างเป็นข้อมูลตัวอย่าง (placeholder) — แก้เป็นข้อมูลจริงของบริษัทก่อนเปิดใช้งาน
 *    เบอร์โทรและ LINE ดึงจาก .env (VITE_CALL_CENTER, VITE_LINE_OA_ID) ถ้าตั้งไว้
 *    ช่องโซเชียลที่เว้นว่าง ('') จะไม่แสดงไอคอน
 */
export const COMPANY = {
  /** ชื่อบริษัท (ตัวอย่าง) */
  name: { en: 'Napaii Co., Ltd.', th: 'บริษัท Napaii จำกัด' } as Localized,
  /** ที่อยู่ (ตัวอย่าง) */
  address: {
    en: '99/9 Example Building, 10th Floor, Sukhumvit Road, Khlong Toei, Bangkok 10110',
    th: '99/9 อาคารตัวอย่าง ชั้น 10 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
  } as Localized,
  /** เลขที่ใบอนุญาตประกอบธุรกิจนำเที่ยว (ตัวอย่าง) */
  license: '11/00000',
  phone: CALL_CENTER || '02-000-0000',
  email: 'contact@napaii.com',
  /** ลิงก์ Google Maps ของที่อยู่ ('' = ไม่ทำลิงก์) */
  mapUrl: '',
  social: {
    facebook: '#',
    instagram: '#',
    line: LINE_OA_ID ? `https://line.me/R/ti/p/${encodeURIComponent(LINE_OA_ID)}` : '#',
    tiktok: '#',
    youtube: '#',
  },
};

export type SocialKey = keyof typeof COMPANY.social;
