/** LINE Official Account ของ Napaii (ใช้เมื่อไม่ได้ตั้ง VITE_LINE_OA_ID ใน .env) */
export const DEFAULT_LINE_OA_ID = '@442feylf';

/** ลิงก์เพิ่มเพื่อน LINE OA (ลิงก์ทางการจาก LINE Official Account Manager) */
export const LINE_ADD_FRIEND_URL = 'https://line.me/R/ti/p/@442feylf?oat_content=url&ts=11220144';

/** รูป QR code เพิ่มเพื่อน LINE (ไฟล์ทางการ อยู่ใน public/images) */
export const LINE_QR_IMAGE = `${import.meta.env.BASE_URL}images/line-qr.png`;

export const LINE_OA_ID = import.meta.env.VITE_LINE_OA_ID?.trim() || DEFAULT_LINE_OA_ID;

/**
 * ลิงก์เปิดแชท LINE OA พร้อมพิมพ์ข้อความไว้ให้ (ผู้ใช้กดส่งเอง)
 * รูปแบบตามเอกสาร LINE: https://line.me/R/oaMessage/{LINE ID}/?{ข้อความ}
 */
export function lineOaMessageUrl(message: string, lineId: string = LINE_OA_ID): string | null {
  if (!lineId) return null;
  return `https://line.me/R/oaMessage/${encodeURIComponent(lineId)}/?${encodeURIComponent(message)}`;
}

/** เบอร์ Call Center จาก .env (เช่น 02-123-4567) — ไม่ใส่ = ปุ่มโทรจะแจ้งว่ายังไม่ได้ตั้งค่า */
export const CALL_CENTER = import.meta.env.VITE_CALL_CENTER?.trim() || '';
