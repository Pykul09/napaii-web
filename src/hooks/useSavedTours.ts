import { useCallback, useSyncExternalStore } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../services/storage';

/**
 * ทัวร์ที่ผู้ใช้กด Save — เก็บแยกตามอีเมลผู้ใช้ (ต้องล็อกอินก่อน)
 * ใช้ store กลางระดับโมดูล เพื่อให้ทุกคอมโพเนนต์ (Navbar, การ์ด, หน้าทัวร์) เห็นค่าเดียวกันทันที
 */
const PREFIX = 'napaii_saved_tours_';
const EMPTY: string[] = [];
const cache = new Map<string, string[]>();
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((fn) => fn());

function read(key: string): string[] {
  let v = cache.get(key);
  if (!v) {
    v = storage.get<string[]>(key, []);
    cache.set(key, v);
  }
  return v;
}

function write(key: string, next: string[]): void {
  cache.set(key, next);
  storage.set(key, next);
  emit();
}

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  // ซิงก์ข้ามแท็บ
  const onStorage = (e: StorageEvent) => {
    if (e.key?.startsWith(PREFIX)) {
      cache.delete(e.key);
      fn();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener('storage', onStorage);
  };
}

export function useSavedTours() {
  const { user } = useAuth();
  const key = user ? `${PREFIX}${user.email}` : null;
  const ids = useSyncExternalStore(subscribe, () => (key ? read(key) : EMPTY));

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  /** คืนค่า true ถ้าบันทึกแล้ว, false ถ้าเอาออก */
  const toggle = useCallback(
    (id: string): boolean => {
      if (!key) return false;
      const cur = read(key);
      const on = !cur.includes(id);
      write(key, on ? [...cur, id] : cur.filter((x) => x !== id));
      return on;
    },
    [key],
  );

  const remove = useCallback(
    (id: string) => {
      if (key) write(key, read(key).filter((x) => x !== id));
    },
    [key],
  );

  const removeMany = useCallback(
    (drop: string[]) => {
      if (key) write(key, read(key).filter((x) => !drop.includes(x)));
    },
    [key],
  );

  return { ids, has, toggle, remove, removeMany, enabled: key !== null };
}
