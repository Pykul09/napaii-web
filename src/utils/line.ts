/**
 * ⚠️ LINE ID ชั่วคราว (placeholder) — ใช้เมื่อยังไม่ได้ตั้ง VITE_LINE_OA_ID ใน .env
 * ต้องเปลี่ยนเป็น LINE Official Account ของบริษัทจริงก่อนเปิดเว็บ (ไม่งั้นลูกค้าอาจถูกพาไปบัญชีอื่น)
 */
export const DEFAULT_LINE_OA_ID = '@napaii';

/** LINE Official Account ID จาก .env (เช่น @napaii) — ถ้าไม่ตั้งจะใช้ DEFAULT_LINE_OA_ID */
export const LINE_OA_ID = import.meta.env.VITE_LINE_OA_ID?.trim() || DEFAULT_LINE_OA_ID;

/**
 * ลิงก์เปิดแชท LINE OA พร้อมพิมพ์ข้อความไว้ให้ (ผู้ใช้กดส่งเอง)
 * รูปแบบตามเอกสาร LINE: https://line.me/R/oaMessage/{LINE ID}/?{ข้อความ}
 */
export function lineOaMessageUrl(message: string): string | null {
  if (!LINE_OA_ID) return null;
  return `https://line.me/R/oaMessage/${encodeURIComponent(LINE_OA_ID)}/?${encodeURIComponent(message)}`;
}

/** เบอร์ Call Center จาก .env (เช่น 02-123-4567) — ไม่ใส่ = ปุ่มโทรจะแจ้งว่ายังไม่ได้ตั้งค่า */
export const CALL_CENTER = import.meta.env.VITE_CALL_CENTER?.trim() || '';
