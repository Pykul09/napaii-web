export type ThemeMode = 'light' | 'dark';
export type AuthProvider = 'email' | 'google' | 'facebook' | 'apple';
export type SocialProvider = Exclude<AuthProvider, 'email'>;

export type Lang = 'en' | 'th';
/** ข้อความสองภาษา — ใช้กับเนื้อหาที่มาจากข้อมูล (ชื่อกิจกรรม สถานที่ ฯลฯ) */
export type Localized = Record<Lang, string>;

export type CategoryKey = 'culture' | 'nature' | 'food' | 'beach' | 'city' | 'adventure' | 'guide' | 'tips';

/** ประเทศปลายทางที่ใช้กรองทัวร์ */
export type CountryCode = 'jp' | 'kr' | 'tw' | 'vn' | 'cn' | 'sg' | 'id' | 'ch' | 'it';

export interface City {
  country: CountryCode;
  name: Localized;
}

export interface Country {
  code: CountryCode;
  flag: string;
  name: Localized;
}

export type Gender = 'male' | 'female' | 'other' | 'undisclosed';

/** ข้อมูลที่ผู้ใช้กรอกตอนสมัคร (ก่อนส่งให้ backend) */
export interface ProfileInput {
  /** YYYY-MM-DD — เก็บวันเกิดอย่างเดียว แล้วคำนวณอายุตอนแสดงผล (ไม่ถามอายุซ้ำ) */
  birthDate: string;
  /** เบอร์ที่ normalize แล้ว เช่น 0812345678 หรือ +66812345678 */
  phone: string;
  gender: Gender;
  /** เลขบัตรประชาชน 13 หลัก (ไม่บังคับ) — ห้ามเก็บ/log เป็นข้อความธรรมดาในระบบจริง */
  nationalId?: string;
}

/** ข้อมูลโปรไฟล์ที่เก็บแล้ว — เลขบัตรเก็บเฉพาะ 4 หลักท้ายในเวอร์ชันสาธิต */
export interface Profile {
  birthDate: string;
  phone: string;
  gender: Gender;
  nationalIdLast4?: string;
}

export interface User {
  name: string;
  email: string;
  provider: AuthProvider;
  /** ยังไม่มีสำหรับผู้ใช้ที่ล็อกอินผ่านโซเชียล — ต้องให้กรอกก่อนจองอีเวนต์ */
  profile?: Profile;
}

/** รายการโปรแกรมรายวัน day = "1" หรือช่วงวัน เช่น "4-5" */
export interface ItineraryDay {
  day: string;
  text: Localized;
}

/** รูปถ่ายพร้อมเครดิต (สำหรับรูปสัญญาอนุญาต CC ที่ต้องให้เครดิตผู้ถ่าย) */
export interface TourPhoto {
  src: string;
  /** รูปขนาดใหญ่สำหรับ hero เต็มจอ (ถ้าไม่มีใช้ src) */
  large?: string;
  author: string;
  license: string;
  /** หน้าต้นฉบับของรูป */
  page: string;
}

/** สถานะการขายของทัวร์: 'soon' = กำลังจะเปิดขาย (ยังไม่เปิดราคา/ยังจองไม่ได้) */
export type TourStatus = 'onsale' | 'soon';

export interface TourItem {
  id: string;
  /** ไม่ใส่ = 'onsale' (เปิดขายแล้ว) */
  status?: TourStatus;
  /** รหัสทัวร์ 5 หลัก (รหัสประเทศ 2 ตัว + เลข 3 หลัก) เช่น JP001 — ใช้อ้างอิงตอนลูกค้าติดต่อ */
  code: string;
  title: Localized;
  country: CountryCode;
  /** เมืองที่ไป (key ใน CITIES เช่น 'tokyo') — เมืองแรก = เมืองหลัก ใช้จัดกลุ่มการ์ดดีลรายเมือง */
  cities?: string[];
  /** เส้นทางเมืองที่ไป เช่น Tokyo – Hakone – Kyoto */
  route: Localized;
  category: CategoryKey;
  /** จำนวนวัน (จำนวนคืน = วัน - 1) */
  days: number;
  /** วันเดินทางที่เปิดขาย (YYYY-MM-DD) เรียงจากใกล้ไปไกล */
  departures: string[];
  /** ราคาเริ่มต้นต่อท่าน (บาท) */
  price: number;
  /** ราคาเดิมก่อนลด (บาท) — ใส่เฉพาะทัวร์ที่มีโปรจริง ต้องเป็นราคาที่เคยขายจริง */
  originalPrice?: number;
  /** วันสุดท้ายของโปร (YYYY-MM-DD) — เลยวันนี้แล้วจะไม่แสดงส่วนลด */
  promoEnds?: string;
  seatsLeft: number;
  /** จำนวนผู้จองแล้ว และตัวย่อชื่อสำหรับแสดงอวาตาร์ */
  booked: number;
  attendees: string[];
  /** คำค้นเพิ่มเติม (ใส่ได้ทั้งไทยและอังกฤษ) */
  keywords: string;
  /** เลือกลายโปสเตอร์ SVG (0-4) — แทนด้วยรูปจริงได้ภายหลัง */
  variant: number;
  /** รูปจริงของทัวร์ 3–4 ภาพ (ถ้ามี) — ถ้าไม่ใส่จะสร้างลายโปสเตอร์ SVG 4 แบบแทน */
  images?: string[];
  /** ทัวร์ขายดี — แสดงป้าย 🔥 HOT กะพริบบนการ์ด */
  hot?: boolean;
  /** รูปวิวหลักบนการ์ด (ถ้าไม่มีจะใช้ลายโปสเตอร์ SVG) */
  cover?: TourPhoto;
  /** รูปเพิ่มเติมของทัวร์ (แสดงใน hero หน้ารายละเอียดต่อจาก cover) */
  gallery?: TourPhoto[];
  description: Localized;
  highlights: Localized[];
  itinerary: ItineraryDay[];
}

/** รอบออกเดินทางที่ใกล้ที่สุดของแต่ละทัวร์ (ใช้ในส่วน Departing soon) */
export interface Departure {
  tour: TourItem;
  date: string;
}

export interface Article {
  id: string;
  category: CategoryKey;
  title: Localized;
  excerpt: Localized;
  author: Localized;
  readMinutes: number;
  variant: number;
  /** วันเวลาที่สร้างบทความ (ISO 8601 พร้อมโซนเวลา เช่น 2026-11-18T09:30:00+07:00) */
  createdAt?: string;
  /** จำนวนการเข้าชมตั้งต้นจากระบบ (ข้อมูล mock — ของจริงให้ backend ส่งมา) */
  views?: number;
  /** รูปหน้าปก (ไม่มี = ลายโปสเตอร์ SVG) */
  cover?: TourPhoto;
  /** เนื้อหาบทความ — แต่ละรายการคือ 1 ย่อหน้า */
  body?: Localized[];
  /** ทัวร์ที่เกี่ยวข้อง (แสดงปุ่ม "ดูทัวร์" ท้ายบทความ) */
  tourId?: string;
  /** ข้อมูลสรุปสั้น ๆ (แสดงในกล่องด้านข้าง) เช่น ช่วงเวลาที่ดีที่สุด งบประมาณ */
  facts?: ArticleFact[];
  /** เคล็ดลับ/สิ่งที่ควรรู้ (แสดงเป็นกล่องไฮไลต์ท้ายบทความ) */
  tips?: Localized[];
}

export interface ArticleFact {
  icon: string;
  label: Localized;
  value: Localized;
}
