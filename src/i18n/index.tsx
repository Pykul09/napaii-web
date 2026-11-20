import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { storage } from '../services/storage';
import type { Lang, Localized } from '../types';
import { en, type MessageKey } from './en';
import { th } from './th';

export type { MessageKey } from './en';

const DICTIONARIES: Record<Lang, Record<MessageKey, string>> = { en, th };
const LOCALES: Record<Lang, string> = { en: 'en-US', th: 'th-TH' };
const STORAGE_KEY = 'napaii_lang';
const TIME_ZONE = 'Asia/Bangkok';

export type TParams = Record<string, string | number>;

interface I18nValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** แปลข้อความตามคีย์ รองรับตัวแปร {name} */
  t: (key: MessageKey, params?: TParams) => string;
  /** เลือกข้อความภาษาปัจจุบันจากข้อมูลสองภาษา */
  loc: (value: Localized) => string;
  /** วันที่เต็ม: "Dec 18, 2026" / "18 ธ.ค. 2569" (รับ YYYY-MM-DD) */
  dateFull: (iso: string) => string;
  /** ช่วงวันที่ของทริป: "Dec 18 – 23, 2026" / "18–23 ธ.ค. 2569" */
  dateRange: (startIso: string, days: number) => string;
  month: (iso: string) => string;
  day: (iso: string) => string;
  /** 0 → "Free"/"ฟรี", อื่น ๆ → "฿890" */
  price: (baht: number) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

function initialLang(): Lang {
  const saved = storage.get<Lang | null>(STORAGE_KEY, null);
  if (saved === 'en' || saved === 'th') return saved;
  return navigator.language?.toLowerCase().startsWith('th') ? 'th' : 'en';
}

const fmt = (lang: Lang, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(LOCALES[lang], { timeZone: TIME_ZONE, ...options });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    storage.set(STORAGE_KEY, next);
  }, []);

  // อัปเดต <html lang>, <title> และ meta description ตามภาษา
  useEffect(() => {
    const dict = DICTIONARIES[lang];
    document.documentElement.lang = lang;
    document.title = dict['meta.title'];
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict['meta.description']);
  }, [lang]);

  const value = useMemo<I18nValue>(() => {
    const dict = DICTIONARIES[lang];
    const t: I18nValue['t'] = (key, params) => {
      const template = dict[key] ?? en[key];
      return params ? template.replace(/\{(\w+)\}/g, (_, name: string) => String(params[name] ?? `{${name}}`)) : template;
    };
    const monthFmt = fmt(lang, { month: 'short' });
    const dayFmt = fmt(lang, { day: '2-digit' });
    const fullFmt = fmt(lang, { year: 'numeric', month: 'short', day: 'numeric' });
    const at = (iso: string) => new Date(iso);
    return {
      lang,
      setLang,
      t,
      loc: (v) => v[lang],
      dateFull: (iso) => fullFmt.format(at(iso)),
      dateRange: (iso, days) => {
        const end = at(iso);
        end.setUTCDate(end.getUTCDate() + days - 1);
        return fullFmt.formatRange(at(iso), end);
      },
      month: (iso) => monthFmt.format(at(iso)),
      day: (iso) => dayFmt.format(at(iso)),
      price: (baht) => (baht === 0 ? t('common.free') : `฿${baht.toLocaleString(LOCALES[lang])}`),
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>');
  return ctx;
}
