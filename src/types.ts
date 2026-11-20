export type ThemeMode = 'light' | 'dark';
export type AuthProvider = 'email' | 'google' | 'facebook' | 'apple';
export type SocialProvider = Exclude<AuthProvider, 'email'>;

export type Lang = 'en' | 'th';
/** ข้อความสองภาษา — ใช้กับเนื้อหาที่มาจากข้อมูล (ชื่อกิจกรรม สถานที่ ฯลฯ) */
export type Localized = Record<Lang, string>;

export type CategoryKey = 'culture' | 'nature' | 'food' | 'beach' | 'city' | 'adventure' | 'guide' | 'tips';

/** ประเทศปลายทางที่ใช้กรองทัวร์ */
export type CountryCode = 'jp' | 'kr' | 'tw' | 'vn' | 'cn' | 'sg' | 'id' | 'ch' | 'it';

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

export interface TourItem {
  id: string;
  title: Localized;
  country: CountryCode;
  /** เส้นทางเมืองที่ไป เช่น Tokyo – Hakone – Kyoto */
  route: Localized;
  category: CategoryKey;
  /** จำนวนวัน (จำนวนคืน = วัน - 1) */
  days: number;
  /** วันเดินทางที่เปิดขาย (YYYY-MM-DD) เรียงจากใกล้ไปไกล */
  departures: string[];
  /** ราคาเริ่มต้นต่อท่าน (บาท) */
  price: number;
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
}
