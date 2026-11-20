// localStorage แบบปลอดภัย: ถ้าถูกบล็อก (private mode ฯลฯ) จะ fallback เป็นหน่วยความจำ
const memory: Record<string, string> = {};

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return key in memory ? (JSON.parse(memory[key]) as T) : fallback;
    }
  },
  set(key: string, value: unknown): void {
    const raw = JSON.stringify(value);
    try {
      localStorage.setItem(key, raw);
    } catch {
      memory[key] = raw;
    }
  },
};
