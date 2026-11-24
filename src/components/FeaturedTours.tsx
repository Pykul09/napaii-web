import { useEffect, useMemo, useState } from 'react';
import { CITIES, COUNTRIES, findCountry } from '../data/tours';
import { useI18n } from '../i18n';
import { fetchFeaturedTours } from '../services/tours';
import type { CountryCode, TourItem } from '../types';
import { discountPct } from '../utils/calendar';
import { AdNativeCard } from './AdSlot';
import { Reveal } from './Reveal';
import { TourCard, TourSkeleton } from './TourCard';

type CountryFilter = 'all' | CountryCode;

const monthOf = (date: string): string => date.slice(0, 7);

export function FeaturedTours() {
  const { t, loc, monthYear, price } = useI18n();
  const [tours, setTours] = useState<TourItem[] | null>(null);
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState<CountryFilter>('all');
  const [city, setCity] = useState('all'); // 'all' หรือ key ใน CITIES
  const [month, setMonth] = useState(''); // '' = ทุกเดือน, ไม่งั้นเป็น YYYY-MM

  useEffect(() => {
    let alive = true;
    fetchFeaturedTours().then((data) => alive && setTours(data));
    return () => {
      alive = false;
    };
  }, []);

  const next = () => setTours((ts) => (ts && ts.length ? [...ts.slice(1), ts[0]] : ts));
  const prev = () => setTours((ts) => (ts && ts.length ? [ts[ts.length - 1], ...ts.slice(0, -1)] : ts));

  // เดือนที่มีทัวร์ออกเดินทาง (ใช้เป็นตัวเลือกในช่องเลือกเดือน)
  const months = useMemo(() => [...new Set((tours ?? []).flatMap((x) => x.departures.map(monthOf)))].sort(), [tours]);

  const inMonth = (x: TourItem, m: string): boolean => !m || x.departures.some((d) => monthOf(d) === m);

  // จำนวนทัวร์ของแต่ละประเทศ ในเดือนที่เลือก (แสดงเป็นตัวเลขบนปุ่ม)
  const counts = useMemo(() => {
    const m = new Map<CountryCode, number>();
    (tours ?? []).filter((x) => inMonth(x, month)).forEach((x) => m.set(x.country, (m.get(x.country) ?? 0) + 1));
    return m;
  }, [tours, month]);

  // เลือกเดือนแล้วแสดงเฉพาะประเทศที่มีทัวร์ในเดือนนั้น
  const countryChips = COUNTRIES.filter((c) => !month || (counts.get(c.code) ?? 0) > 0);
  const monthTotal = [...counts.values()].reduce((a, n) => a + n, 0);

  const onMonthChange = (next: string) => {
    setMonth(next);
    // ประเทศที่เลือกไว้ไม่มีทัวร์ในเดือนใหม่ → กลับไปทุกประเทศ
    if (country !== 'all' && !(tours ?? []).some((x) => x.country === country && inMonth(x, next))) setCountry('all');
  };

  // ประเทศที่มีโปรตอนนี้: ส่วนลดสูงสุด + จำนวนทัวร์ที่ลด เรียงจากลดมากไปน้อย
  const hot = useMemo(() => {
    const m = new Map<CountryCode, { max: number; count: number }>();
    (tours ?? []).forEach((x) => {
      const off = discountPct(x);
      if (!off) return;
      const cur = m.get(x.country) ?? { max: 0, count: 0 };
      m.set(x.country, { max: Math.max(cur.max, off), count: cur.count + 1 });
    });
    return [...m.entries()].sort((a, b) => b[1].max - a[1].max);
  }, [tours]);
  const hotSet = new Set(hot.map(([c]) => c));

  // เปลี่ยนประเทศ → ล้างตัวกรองเมือง
  useEffect(() => setCity('all'), [country]);

  // ข้อมูลรายเมือง (ตามเมืองหลักของแต่ละทัวร์) ของประเทศที่เลือก: จำนวนทัวร์ ราคาเริ่มต้น และส่วนลดสูงสุด (เรียงจากลดมากไปน้อย)
  const cityStats = useMemo(() => {
    if (country === 'all') return [];
    const m = new Map<string, { count: number; from: number; was?: number; off: number }>();
    (tours ?? [])
      .filter((x) => x.country === country)
      .forEach((x) => {
        const off = discountPct(x);
        // นับเฉพาะเมืองหลัก (เมืองแรก) — ทัวร์ที่ไปหลายเมืองจะไม่ซ้ำการ์ด
        (x.cities ?? []).slice(0, 1).forEach((c) => {
          const cur = m.get(c);
          const cheaper = !cur || x.price < cur.from;
          m.set(c, {
            count: (cur?.count ?? 0) + 1,
            from: cheaper ? x.price : cur!.from,
            was: cheaper ? (off ? x.originalPrice : undefined) : cur!.was,
            off: Math.max(cur?.off ?? 0, off),
          });
        });
      });
    return [...m.entries()].sort((a, b) => b[1].off - a[1].off || b[1].count - a[1].count);
  }, [tours, country]);
  // แสดงการ์ดเมื่อประเทศมีอย่างน้อย 2 เมือง และมีเมืองที่ลดราคา
  const cityDeals = cityStats.length >= 2 && cityStats.some(([, v]) => v.off > 0);

  // ค้นหาได้ทั้งไทยและอังกฤษ ไม่ว่าหน้าเว็บจะแสดงภาษาไหนอยู่ และใช้ร่วมกับตัวกรองประเทศ + เดือน
  const visible = useMemo(() => {
    const q = query.toLowerCase().trim();
    return (tours ?? []).filter((x) => {
      if (country !== 'all' && x.country !== country) return false;
      if (city !== 'all' && x.cities?.[0] !== city) return false;
      if (!inMonth(x, month)) return false;
      const c = findCountry(x.country);
      return [x.title.en, x.title.th, x.route.en, x.route.th, c.name.en, c.name.th, x.keywords, x.category, x.code].join(' ').toLowerCase().includes(q);
    });
  }, [tours, query, country, city, month]);

  return (
    <>
      <Reveal className="sh">
        <div>
          <h2>{t('featured.title')}</h2>
          <p>{t('featured.sub')}</p>
        </div>
        <div className="tools">
          <a className="va" href="#">
            {t('featured.viewAll')}
          </a>
          <span>
            <button type="button" className="ar" aria-label={t('featured.prev')} onClick={prev}>
              ‹
            </button>
            <button type="button" className="ar" aria-label={t('featured.next')} onClick={next}>
              ›
            </button>
          </span>
        </div>
      </Reveal>

      <div className="tbar">
        <input
          id="tour-search"
          className="q"
          aria-label={t('featured.searchLabel')}
          placeholder={t('featured.searchPlaceholder')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
       
        <label className="mq">
          <span aria-hidden="true">📅</span>
          <select aria-label={t('featured.monthLabel')} value={month} disabled={!tours} onChange={(e) => onMonthChange(e.target.value)}>
            <option value="">{t('featured.anyMonth')}</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {monthYear(`${m}-01`)}
              </option>
            ))}
          </select>
        </label>
      </div>

  
      <div className="chips countries" role="group" aria-label={t('featured.countries')}>
        <button type="button" className={`chip${country === 'all' ? ' on' : ''}`} aria-pressed={country === 'all'} onClick={() => setCountry('all')}>
          🌏 {t('country.all')}
          {tours && <i>{month ? monthTotal : tours.length}</i>}
        </button>
        {countryChips.map((c) => (
          <button
            key={c.code}
            type="button"
            className={`chip${country === c.code ? ' on' : ''}`}
            aria-pressed={country === c.code}
            onClick={() => setCountry(country === c.code ? 'all' : c.code)}
          >
            <span aria-hidden="true">{c.flag}</span> {loc(c.name)}
            {tours && <i>{counts.get(c.code) ?? 0}</i>}
            {hotSet.has(c.code) && (
              <span className="chip-hot" aria-label={t('promo.hotTitle')}>
                🔥
              </span>
            )}
          </button>
        ))}
      </div>

      {/* A: การ์ดดีลรายเมือง (เมื่อประเทศที่เลือกมีเมืองที่ลดราคา) */}
      {cityDeals && (
        <div className="city-cards">
          {cityStats.map(([key, v], i) => (
            <button
              key={key}
              type="button"
              className={`city-card${city === key ? ' on' : ''}${i === 0 && v.off > 0 ? ' cc-top' : ''}${v.off ? '' : ' plain'}`}
              aria-pressed={city === key}
              onClick={() => setCity(city === key ? 'all' : key)}
            >
              <span className="cc-head">
                <b>{CITIES[key] ? loc(CITIES[key].name) : key}</b>
                {v.off > 0 ? <span className="cc-off">{t('promo.pct', { n: v.off })}</span> : <small>{t('city.noDeal')}</small>}
              </span>
              <small className="cc-count">{t('city.tours', { n: v.count })}</small>
              <span className="cc-price">
                {price(v.from)}
                {v.was && <s>{price(v.was)}</s>}
              </span>
              {i === 0 && v.off > 0 && <span className="cc-best">🔥 {t('city.best')}</span>}
            </button>
          ))}
        </div>
      )}

      {tours && (
        <p className="rescount" aria-live="polite">
          {[
            t(visible.length === 1 ? 'featured.countOne' : 'featured.count', { n: visible.length }),
            month && `📅 ${monthYear(`${month}-01`)}`,
            country !== 'all' && `${findCountry(country).flag} ${loc(findCountry(country).name)}`,
          ]
            .filter(Boolean)
            .join(' · ')}
        </p>
      )}

      <div className="cards">
        {tours === null ? (
          Array.from({ length: 6 }, (_, i) => <TourSkeleton key={i} />)
        ) : visible.length ? (
          <>
            {visible.map((x, i) => (
              <TourCard key={x.id} tour={x} index={i} countdown departure={month ? x.departures.find((d) => monthOf(d) === month) : undefined} />
            ))}
            <AdNativeCard index={visible.length} />
          </>
        ) : (
          <p style={{ color: 'var(--mut)' }}>{t('featured.empty')}</p>
        )}
      </div>
    </>
  );
}