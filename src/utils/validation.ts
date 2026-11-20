/** อายุขั้นต่ำที่สมัครได้ — ปรับตามนโยบายของ Napaii / กฎหมาย (PDPA) */
export const MIN_AGE = 13;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const pad = (n: number) => String(n).padStart(2, '0');

/** วันนี้ในรูป YYYY-MM-DD (เวลาท้องถิ่น) ใช้เป็น max ของช่องวันเกิด */
export function todayISO(now: Date = new Date()): string {
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** ตรวจว่าเป็นวันที่จริง (เช่น ไม่รับ 2000-02-31) ไม่ใช่วันในอนาคต และไม่เก่าเกิน 1900 */
export function isValidBirthDate(value: string, now: Date = new Date()): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(y, mo - 1, d);
  const real = date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d;
  return real && y >= 1900 && date.getTime() <= now.getTime();
}

/** คำนวณอายุเต็มปีจากวันเกิด (YYYY-MM-DD) */
export function calcAge(birthDate: string, now: Date = new Date()): number {
  const [y, mo, d] = birthDate.split('-').map(Number);
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < mo || (now.getMonth() + 1 === mo && now.getDate() < d)) age -= 1;
  return age;
}

/** ตัดช่องว่าง ขีด วงเล็บ ออก เช่น "081-234 5678" → "0812345678" */
export const normalizePhone = (raw: string): string => raw.replace(/[\s\-().]/g, '');

/** มือถือไทย (06/08/09 + 8 หลัก) หรือเบอร์ต่างประเทศรูปแบบ +รหัสประเทศ (8–15 หลัก) */
export function isValidPhone(raw: string): boolean {
  const p = normalizePhone(raw);
  return /^0[689]\d{8}$/.test(p) || /^\+\d{8,15}$/.test(p);
}

export const digitsOnly = (raw: string): string => raw.replace(/\D/g, '');

/** จัดรูปแบบขณะพิมพ์: 1-2345-67890-12-3 */
export function formatNationalId(raw: string): string {
  const d = digitsOnly(raw).slice(0, 13);
  const groups = [1, 4, 5, 2, 1];
  const parts: string[] = [];
  let i = 0;
  for (const size of groups) {
    if (i >= d.length) break;
    parts.push(d.slice(i, i + size));
    i += size;
  }
  return parts.join('-');
}

/** ตรวจเลขบัตรประชาชนไทย 13 หลักด้วย check digit (modulo 11) */
export function isValidThaiNationalId(raw: string): boolean {
  const d = digitsOnly(raw);
  if (!/^\d{13}$/.test(d)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(d[i]) * (13 - i);
  return (11 - (sum % 11)) % 10 === Number(d[12]);
}
