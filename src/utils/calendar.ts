import type { Lang, TourItem } from '../types';

/** 2026-12-18 → 20261218 */
const ymd = (iso: string): string => iso.replace(/-/g, '');

const addDays = (iso: string, n: number): string => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

/** วันสุดท้ายของทริป (นับรวมวันเดินทาง) */
export const lastDay = (departure: string, days: number): string => addDays(departure, days - 1);

function fields(tour: TourItem, departure: string, lang: Lang) {
  return {
    title: `✈ ${tour.title[lang]}`,
    details: `${tour.description[lang]}\n\n${tour.route[lang]}\nhttps://napaii.com`,
    // ปฏิทินแบบทั้งวัน: วันสิ้นสุดต้องเป็นวันถัดไป (exclusive)
    start: ymd(departure),
    end: ymd(addDays(departure, tour.days)),
  };
}

/** ลิงก์เพิ่มลง Google Calendar (เปิดแท็บใหม่) — เป็นกิจกรรมทั้งวันตลอดช่วงทริป */
export function googleCalendarUrl(tour: TourItem, departure: string, lang: Lang): string {
  const f = fields(tour, departure, lang);
  const q = new URLSearchParams({ action: 'TEMPLATE', text: f.title, dates: `${f.start}/${f.end}`, details: f.details, location: tour.route[lang] });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

const esc = (s: string): string => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\;');

/** เนื้อไฟล์ .ics (iCalendar) — เปิดได้ใน Apple Calendar, Outlook และอื่น ๆ */
export function buildIcs(tour: TourItem, departure: string, lang: Lang): string {
  const f = fields(tour, departure, lang);
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//napaii//tours//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${tour.id}-${f.start}@napaii.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${f.start}`,
    `DTEND;VALUE=DATE:${f.end}`,
    `SUMMARY:${esc(f.title)}`,
    `DESCRIPTION:${esc(f.details)}`,
    `LOCATION:${esc(tour.route[lang])}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/** ดาวน์โหลดไฟล์ .ics */
export function downloadIcs(tour: TourItem, departure: string, lang: Lang): void {
  const blob = new Blob([buildIcs(tour, departure, lang)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `napaii-${tour.id}-${ymd(departure)}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** วันนี้ตามเวลาไทย (YYYY-MM-DD) */
export const todayBangkok = (): string => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' });

/** รอบเดินทางถัดไปที่ยังไม่ผ่าน — null ถ้าทุกรอบผ่านไปแล้ว (ทัวร์หมดเวลา) */
export const nextDeparture = (tour: TourItem, today = todayBangkok()): string | null =>
  [...tour.departures].sort().find((d) => d >= today) ?? null;

export const isTourExpired = (tour: TourItem, today = todayBangkok()): boolean => nextDeparture(tour, today) === null;

/** เวลาปิดรับจองของรอบเดินทาง = 00:00 น. เวลาไทยของวันเดินทาง (ms) */
export const bookingClosesAt = (departure: string): number => Date.parse(`${departure}T00:00:00+07:00`);


/** ทัวร์เต็ม (ไม่เหลือที่นั่ง) */
export const isSoldOut = (tour: TourItem): boolean => tour.seatsLeft <= 0;

/** ทัวร์ที่กำลังจะเปิดขาย — ยังไม่เปิดราคาและยังจองไม่ได้ */
export const isComingSoon = (tour: TourItem): boolean => tour.status === 'soon';
