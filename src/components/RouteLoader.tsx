import { useEffect, useRef, useState } from 'react';
import { usePageBusy } from '../hooks/usePageLoading';

/** แสดง loading อย่างน้อยเท่านี้ทุกครั้งที่เปลี่ยนหน้า (กันกะพริบเร็วเกินจนดูไม่ทัน) */
const MIN_MS = 600;

/**
 * หน้าจอ loading ทุกครั้งที่เข้าหน้าใหม่ (routeKey เปลี่ยน, ยกเว้นการย้อนกลับ) — หน้าตาเดียวกับ BootLoader
 * ค้างไว้จนครบ MIN_MS และหน้าปลายทางโหลดข้อมูลเสร็จ (usePageBusy) แล้วค่อยเฟดออก
 */
export function RouteLoader({ routeKey }: { routeKey: string }) {
  const busy = usePageBusy();
  const [phase, setPhase] = useState<'idle' | 'loading' | 'done'>('idle');
  const [minDone, setMinDone] = useState(true);
  const [progress, setProgress] = useState(0);
  /** ประวัติหน้าที่เข้ามา (เรียงตามลำดับ) — ใช้แยกว่าเป็นการ "ย้อนกลับ" หรือเข้าหน้าใหม่ */
  const history = useRef<string[]>([]);

  // เริ่ม loading เมื่อเข้าหน้าใหม่ — ไม่แสดงเมื่อ:
  //  • เปิดเว็บครั้งแรก (มี BootLoader อยู่แล้ว)
  //  • ย้อนกลับไปหน้าก่อนหน้า (ปุ่ม back / ลิงก์กลับ) เพราะหน้านั้นเคยโหลดไปแล้ว
  useEffect(() => {
    const stack = history.current;
    if (stack.length === 0) {
      stack.push(routeKey);
      return;
    }
    if (stack.length >= 2 && stack[stack.length - 2] === routeKey) {
      stack.pop();
      setPhase('idle');
      return;
    }
    stack.push(routeKey);
    setPhase('loading');
    setProgress(8);
    setMinDone(false);
    const timer = window.setTimeout(() => setMinDone(true), MIN_MS);
    return () => window.clearTimeout(timer);
  }, [routeKey]);

  // แถบความคืบหน้าวิ่งไปเรื่อย ๆ ถึง 90% ระหว่างรอ
  useEffect(() => {
    if (phase !== 'loading') return;
    const iv = window.setInterval(() => setProgress((p) => Math.min(90, p + Math.random() * 14 + 6)), 110);
    return () => window.clearInterval(iv);
  }, [phase]);

  // ครบเวลาและข้อมูลพร้อม → เต็ม 100% แล้วเฟดออก
  useEffect(() => {
    if (phase !== 'loading' || !minDone || busy) return;
    setProgress(100);
    const t1 = window.setTimeout(() => setPhase('done'), 200);
    const t2 = window.setTimeout(() => setPhase((p) => (p === 'done' ? 'idle' : p)), 700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [phase, minDone, busy]);

  if (phase === 'idle') return null;
  return (
    <div className={`boot route-loader${phase === 'done' ? ' done' : ''}`} role="status" aria-live="polite" aria-busy={phase === 'loading'}>
      <div className="bl">
        <b>
          Napaii<i>.</i>
        </b>
        <div>
          <i style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
