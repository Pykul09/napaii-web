import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../services/storage';

/** ทัวร์ที่ผู้ใช้กด Save — เก็บแยกตามอีเมลผู้ใช้ (ต้องล็อกอินก่อน) */
export function useSavedTours() {
  const { user } = useAuth();
  const key = user ? `napaii_saved_tours_${user.email}` : null;
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(key ? storage.get<string[]>(key, []) : []);
  }, [key]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  /** คืนค่า true ถ้าบันทึกแล้ว, false ถ้าเอาออก */
  const toggle = useCallback(
    (id: string): boolean => {
      if (!key) return false;
      const on = !ids.includes(id);
      const next = on ? [...ids, id] : ids.filter((x) => x !== id);
      setIds(next);
      storage.set(key, next);
      return on;
    },
    [ids, key],
  );

  return { has, toggle };
}
