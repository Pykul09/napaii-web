import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { CITIES, COUNTRIES, findCountry } from '../data/tours';
import { rememberHomeScroll, tourHref } from '../hooks/useTourRoute';
import { useI18n } from '../i18n';
import type { CountryCode, TourItem } from '../types';
import { discountPct } from '../utils/calendar';

/** ทัวร์ตรงกับคำค้นไหม — ค้นได้ทั้งไทยและอังกฤษ (ชื่อทัวร์ เส้นทาง ประเทศ เมือง คำค้น รหัสทัวร์) */
export function tourMatches(x: TourItem, query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const c = findCountry(x.country);
  const cityNames = (x.cities ?? []).flatMap((k) => (CITIES[k] ? [CITIES[k].name.en, CITIES[k].name.th] : []));
  return [x.title.en, x.title.th, x.route.en, x.route.th, c.name.en, c.name.th, x.keywords, x.category, x.code, ...cityNames]
    .join(' ')
    .toLowerCase()
    .includes(q);
}

interface Props {
  tours: TourItem[] | null;
  /** คำค้นที่ใช้กรองอยู่ตอนนี้ */
  value: string;
  onSearch: (query: string) => void;
  onPickCountry: (code: CountryCode) => void;
  onPickCity: (code: CountryCode, city: string) => void;
}

/**
 * ช่องค้นหาแบบใหญ่: คลิกแล้วเปิดแผงเลือกประเทศ/เมืองยอดฮิต, พิมพ์แล้วแนะนำผลลัพธ์ทันที,
 * กด "ค้นหา" (หรือ Enter) เพื่อกรองรายการทัวร์ตามคำที่พิมพ์
 */
export function SearchBox({ tours, value, onSearch, onPickCountry, onPickCity }: Props) {
  const { t, loc, price } = useI18n();
  const [draft, setDraft] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setDraft(value), [value]);

  // คลิกนอกกล่อง / กด Esc = ปิดแผง
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const list = tours ?? [];

  // ประเทศทั้งหมด พร้อมจำนวนทัวร์ และส่วนลดสูงสุด
  const countries = useMemo(
    () =>
      COUNTRIES.map((c) => {
        const ts = list.filter((x) => x.country === c.code);
        return { c, count: ts.length, off: Math.max(0, ...ts.map((x) => discountPct(x))) };
      }).filter((x) => x.count > 0),
    [list],
  );

  // เมืองที่มีโปร (เมืองหลักของทัวร์) — แสดงเป็น "เมืองยอดฮิต"
  const hotCities = useMemo(() => {
    const m = new Map<string, number>();
    list.forEach((x) => {
      const k = x.cities?.[0];
      const off = discountPct(x);
      if (k && off) m.set(k, Math.max(m.get(k) ?? 0, off));
    });
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [list]);

  // คำแนะนำระหว่างพิมพ์
  const q = draft.trim().toLowerCase();
  const sugCountries = q ? countries.filter(({ c }) => `${c.name.en} ${c.name.th}`.toLowerCase().includes(q)).slice(0, 3) : [];
  const sugCities = q
    ? Object.entries(CITIES)
        .filter(([, v]) => `${v.name.en} ${v.name.th}`.toLowerCase().includes(q))
        .filter(([k]) => list.some((x) => x.cities?.includes(k)))
        .slice(0, 4)
    : [];
  const sugTours = q ? list.filter((x) => tourMatches(x, q)) : [];

  const submit = (e?: FormEvent) => {
    e?.preventDefault();
    onSearch(draft.trim());
    setOpen(false);
    inputRef.current?.blur();
  };

  const pickCountry = (code: CountryCode) => {
    setDraft('');
    onSearch('');
    onPickCountry(code);
    setOpen(false);
  };
  // เมืองจากคำแนะนำ (อาจเป็นเมืองรองของทัวร์ เช่น เกียวโต) → เลือกประเทศ แล้วค้นด้วยชื่อเมือง
  const searchCity = (city: string) => {
    const info = CITIES[city];
    if (!info) return;
    const name = loc(info.name);
    setDraft(name);
    onPickCountry(info.country);
    onSearch(name);
    setOpen(false);
  };
  const pickCity = (city: string) => {
    const info = CITIES[city];
    if (!info) return;
    setDraft('');
    onSearch('');
    onPickCity(info.country, city);
    setOpen(false);
  };

  return (
    <div className={`sx${open ? ' open' : ''}`} ref={ref}>
      <form className="sx-bar" role="search" onSubmit={submit}>
        <span className="sx-ic" aria-hidden="true">
          ⌕
        </span>
        <input
          ref={inputRef}
          id="tour-search"
          type="search"
          aria-label={t('featured.searchLabel')}
          placeholder={t('search.placeholder')}
          value={draft}
          autoComplete="off"
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onChange={(e) => {
            setDraft(e.target.value);
            setOpen(true);
          }}
        />
        {draft && (
          <button
            type="button"
            className="sx-clear"
            aria-label={t('search.clear')}
            onClick={() => {
              setDraft('');
              onSearch('');
              inputRef.current?.focus();
            }}
          >
            ×
          </button>
        )}
        <button type="submit" className="btn sx-go">
          {t('search.button')}
        </button>
      </form>

      {open && (
        <div className="sx-panel" role="listbox" aria-label={t('featured.searchLabel')}>
          {!q ? (
            <>
              <p className="sx-h">🌏 {t('search.pickCountry')}</p>
              <div className="sx-countries">
                {countries.map(({ c, count, off }) => (
                  <button key={c.code} type="button" className="sx-country" onClick={() => pickCountry(c.code)}>
                    <span className="sx-flag" aria-hidden="true">
                      {c.flag}
                    </span>
                    <span className="sx-ct">
                      <b>{loc(c.name)}</b>
                      <small>{t('search.toursCount', { n: count })}</small>
                    </span>
                    {off > 0 && <span className="sx-off">{t('promo.pct', { n: off })}</span>}
                  </button>
                ))}
              </div>
              {hotCities.length > 0 && (
                <>
                  <p className="sx-h">🔥 {t('search.hotCities')}</p>
                  <div className="sx-cities">
                    {hotCities.map(([k, off]) => (
                      <button key={k} type="button" className="sx-city" onClick={() => pickCity(k)}>
                        {findCountry(CITIES[k].country).flag} {loc(CITIES[k].name)} <span className="sx-off">{t('promo.pct', { n: off })}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {sugCountries.length > 0 && (
                <div className="sx-group">
                  <p className="sx-h">{t('search.countries')}</p>
                  {sugCountries.map(({ c, count }) => (
                    <button key={c.code} type="button" className="sx-item" onClick={() => pickCountry(c.code)}>
                      <span aria-hidden="true">{c.flag}</span> {loc(c.name)} <small>{t('search.toursCount', { n: count })}</small>
                    </button>
                  ))}
                </div>
              )}
              {sugCities.length > 0 && (
                <div className="sx-group">
                  <p className="sx-h">{t('search.cities')}</p>
                  {sugCities.map(([k, v]) => (
                    <button key={k} type="button" className="sx-item" onClick={() => searchCity(k)}>
                      <span aria-hidden="true">📍</span> {loc(v.name)} <small>{loc(findCountry(v.country).name)}</small>
                    </button>
                  ))}
                </div>
              )}
              {sugTours.length > 0 && (
                <div className="sx-group">
                  <p className="sx-h">{t('search.tours')}</p>
                  {sugTours.slice(0, 5).map((x) => (
                    <a
                      key={x.id}
                      className="sx-item sx-tour"
                      href={tourHref(x.id)}
                      onClick={() => {
                        rememberHomeScroll();
                        setOpen(false);
                      }}
                    >
                      {x.cover ? <img src={x.cover.src} alt="" loading="lazy" /> : <span aria-hidden="true">✈</span>}
                      <span className="sx-tour-txt">
                        <b>{loc(x.title)}</b>
                        <small>
                          {x.code} · {findCountry(x.country).flag} {loc(findCountry(x.country).name)}
                        </small>
                      </span>
                      <span className="sx-tour-price">{price(x.price)}</span>
                    </a>
                  ))}
                </div>
              )}
              {sugCountries.length + sugCities.length + sugTours.length === 0 && <p className="sx-empty">{t('search.noMatch', { q: draft.trim() })}</p>}
              <button type="button" className="sx-all" onClick={() => submit()}>
                ⌕ {t('search.seeAll', { q: draft.trim(), n: sugTours.length })} ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
