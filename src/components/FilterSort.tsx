import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import type { TourItem } from '../types';
import { discountPct, isSoldOut, nextDeparture } from '../utils/calendar';

export type SortKey = 'recommended' | 'priceAsc' | 'priceDesc' | 'nearest' | 'bestDeal';
export const SORT_KEYS: SortKey[] = ['recommended', 'priceAsc', 'priceDesc', 'nearest', 'bestDeal'];

export type DurationKey = 'all' | 'short' | 'mid' | 'long';
export const DURATION_KEYS: DurationKey[] = ['all', 'short', 'mid', 'long'];

export interface TourFilters {
  promo: boolean;
  available: boolean;
  hot: boolean;
  duration: DurationKey;
}
export const NO_FILTERS: TourFilters = { promo: false, available: false, hot: false, duration: 'all' };

/** ทัวร์ผ่านตัวกรองใน panel หรือไม่ (ไม่รวมเดือน/ประเทศ/คำค้น ที่กรองแยกอยู่แล้ว) */
export function passesFilters(x: TourItem, f: TourFilters): boolean {
  if (f.promo && !discountPct(x)) return false;
  if (f.available && isSoldOut(x)) return false;
  if (f.hot && !x.hot) return false;
  if (f.duration === 'short' && x.days > 4) return false;
  if (f.duration === 'mid' && (x.days < 5 || x.days > 6)) return false;
  if (f.duration === 'long' && x.days < 7) return false;
  return true;
}

/** เรียงทัวร์ — ทัวร์ที่เต็มแล้วไปท้ายสุดเสมอเมื่อเลือกการเรียงแบบอื่นที่ไม่ใช่ "แนะนำ" */
export function sortTours(list: TourItem[], key: SortKey, dateOf: (x: TourItem) => string): TourItem[] {
  if (key === 'recommended') return list;
  const cmp: Record<Exclude<SortKey, 'recommended'>, (a: TourItem, b: TourItem) => number> = {
    priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price,
    nearest: (a, b) => dateOf(a).localeCompare(dateOf(b)),
    bestDeal: (a, b) =>
      discountPct(b) - discountPct(a) || (b.originalPrice ?? b.price) - b.price - ((a.originalPrice ?? a.price) - a.price) || a.price - b.price,
  };
  return [...list].sort((a, b) => Number(isSoldOut(a)) - Number(isSoldOut(b)) || cmp[key](a, b));
}

export const defaultDate = (x: TourItem): string => nextDeparture(x) ?? x.departures[0] ?? '';

interface Props {
  sort: SortKey;
  onSort: (k: SortKey) => void;
  filters: TourFilters;
  onFilters: (f: TourFilters) => void;
  month: string;
  months: string[];
  onMonth: (m: string) => void;
  disabled?: boolean;
}

export function FilterSort({ sort, onSort, filters, onFilters, month, months, onMonth, disabled }: Props) {
  const { t, monthYear } = useI18n();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  const active =
    Number(sort !== 'recommended') + Number(filters.promo) + Number(filters.available) + Number(filters.hot) + Number(filters.duration !== 'all') + Number(!!month);

  // ปิดเมื่อคลิกนอก panel หรือกด Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => wrap.current && !wrap.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const set = <K extends keyof TourFilters>(k: K, v: TourFilters[K]) => onFilters({ ...filters, [k]: v });
  const reset = () => {
    onSort('recommended');
    onFilters(NO_FILTERS);
    onMonth('');
  };

  return (
    <div className="fs" ref={wrap}>
      <button
        type="button"
        className={`fs-btn${active ? ' on' : ''}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 5h18l-7 8.5V19l-4 2v-7.5L3 5z" />
        </svg>
        {t('fs.button')}
        {active > 0 && <span className="fs-n">{active}</span>}
      </button>

      {open && (
        <div className="fs-panel" role="dialog" aria-label={t('fs.button')}>
          <div className="fs-h">
            <b>{t('fs.sort')}</b>
            <button type="button" className="fs-x" aria-label={t('fs.close')} onClick={() => setOpen(false)}>
              ×
            </button>
          </div>
          <div className="fs-sort" role="radiogroup" aria-label={t('fs.sort')}>
            {SORT_KEYS.map((k) => (
              <button key={k} type="button" role="radio" aria-checked={sort === k} className={sort === k ? 'on' : ''} onClick={() => onSort(k)}>
                {t(`fs.sort.${k}`)}
              </button>
            ))}
          </div>

          <hr />
          <b className="fs-t">{t('fs.filters')}</b>
          {(['promo', 'available', 'hot'] as const).map((k) => (
            <label key={k} className="fs-ck">
              <input type="checkbox" checked={filters[k]} onChange={(e) => set(k, e.target.checked)} />
              <span>{t(`fs.f.${k}`)}</span>
            </label>
          ))}

          <b className="fs-t sm">{t('fs.duration')}</b>
          <div className="fs-pills">
            {DURATION_KEYS.map((k) => (
              <button key={k} type="button" aria-pressed={filters.duration === k} className={filters.duration === k ? 'on' : ''} onClick={() => set('duration', k)}>
                {t(`fs.d.${k}`)}
              </button>
            ))}
          </div>

          <b className="fs-t sm">{t('featured.monthLabel')}</b>
          <label className="mq fs-month">
            <span aria-hidden="true">📅</span>
            <select aria-label={t('featured.monthLabel')} value={month} onChange={(e) => onMonth(e.target.value)}>
              <option value="">{t('featured.anyMonth')}</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {monthYear(`${m}-01`)}
                </option>
              ))}
            </select>
          </label>

          <div className="fs-foot">
            <button type="button" className="fs-reset" disabled={!active} onClick={reset}>
              {t('fs.reset')}
            </button>
            <button type="button" className="btn" onClick={() => setOpen(false)}>
              {t('fs.done')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
