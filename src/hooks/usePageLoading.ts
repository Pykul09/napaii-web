import { useEffect, useSyncExternalStore } from 'react';

/**
 * สถานะ "หน้ากำลังโหลดข้อมูล" แบบรวมทั้งแอป
 * หน้าไหนกำลังดึงข้อมูลให้เรียก useReportLoading(true) — RouteLoader จะค้างหน้าจอ loading ไว้จนกว่าจะเสร็จ
 */
let count = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((fn) => fn());

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const usePageBusy = (): boolean => useSyncExternalStore(subscribe, () => count > 0);

export function useReportLoading(loading: boolean): void {
  useEffect(() => {
    if (!loading) return;
    count++;
    emit();
    return () => {
      count--;
      emit();
    };
  }, [loading]);
}
