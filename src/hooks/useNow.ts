import { useSyncExternalStore } from 'react';

/** นาฬิกากลาง: ทุกคอมโพเนนต์ที่ใช้ useNow() ใช้ setInterval ตัวเดียวร่วมกัน */
const listeners = new Set<() => void>();
let now = Date.now();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  if (!timer) {
    now = Date.now();
    timer = setInterval(() => {
      now = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(fn);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

/** เวลาปัจจุบัน (ms) อัปเดตทุก 1 วินาที */
export const useNow = (): number => useSyncExternalStore(subscribe, () => now);
