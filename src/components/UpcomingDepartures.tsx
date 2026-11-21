import { useEffect, useState } from 'react';
import { COUNTRIES } from '../data/tours';
import { rememberHomeScroll, tourHref } from '../hooks/useTourRoute';
import { useI18n } from '../i18n';
import { fetchDepartures } from '../services/tours';
import type { CountryCode, Departure } from '../types';
import { cssVars, maskPrice } from '../utils/format';
import { toneStyle } from './Poster';
import { PriceTag } from './TourCard';
import { Reveal } from './Reveal';

type Filter = CountryCode | 'all';

/** ส่วน "ทัวร์ใกล้ออกเดินทาง" — ทัวร์ที่กำลังจะเปิดขาย กรองตามประเทศได้ (แบบเดียวกับทัวร์แนะนำ) */
/** สีกล่องวันที่ = สีประจำเดือน (ตามอัญมณีประจำเดือนเกิด) */
const MONTH_COLORS: [string, string][] = [
  ['#b4232f', '#7f1d1d'], // ม.ค. โกเมน (Garnet) — แดงเข้ม
  ['#9b59b6', '#6b2d8c'], // ก.พ. อเมทิสต์ (Amethyst) — ม่วง
  ['#4fb3d9', '#1f7fa8'], // มี.ค. อความารีน (Aquamarine) — ฟ้าน้ำทะเล
  ['#a7b4c2', '#6b7a8c'], // เม.ย. เพชร (Diamond) — ขาวเงิน
  ['#1fa463', '#0b6b3a'], // พ.ค. มรกต (Emerald) — เขียว
  ['#b07cc6', '#7a4a93'], // มิ.ย. มุก/อเล็กซานไดรต์ (Pearl/Alexandrite) — ม่วงอ่อน
  ['#e0115f', '#9b0c40'], // ก.ค. ทับทิม (Ruby) — แดงทับทิม
  ['#9acd32', '#5f8a14'], // ส.ค. เพอริดอต (Peridot) — เขียวมะนาว
  ['#1f4fbf', '#0f2c7a'], // ก.ย. ไพลิน (Sapphire) — น้ำเงิน
  ['#f472b6', '#be3f86'], // ต.ค. โอปอล/ทัวร์มาลีน (Opal/Tourmaline) — ชมพู
  ['#f0a020', '#c06a0a'], // พ.ย. บุษราคัม (Topaz) — เหลืองทอง
  ['#30b5c8', '#16808f'], // ธ.ค. เทอร์ควอยซ์ (Turquoise) — ฟ้าเขียว
];
const monthColor = (iso: string) => {
  const [a, b] = MONTH_COLORS[Number(iso.slice(5, 7)) - 1] ?? MONTH_COLORS[0];
  return { background: `linear-gradient(160deg, ${a}, ${b})`, boxShadow: `0 6px 16px ${a}55` };
};

export function UpcomingDepartures() {
  const { t, loc, month, day, price } = useI18n();
  const [items, setItems] = useState<Departure[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchDepartures().then((data) => alive && setItems(data));
    return () => {
      alive = false;
    };
  }, []);

  const list = items.filter((d) => filter === 'all' || d.tour.country === filter);
  // จำนวนทัวร์ต่อประเทศ — แสดงเฉพาะประเทศที่มีทัวร์ในส่วนนี้
  const counts = new Map<CountryCode, number>();
  items.forEach((d) => counts.set(d.tour.country, (counts.get(d.tour.country) ?? 0) + 1));
  const countryChips = COUNTRIES.filter((c) => counts.has(c.code));
  const pick = (f: Filter) => {
    setFilter(f);
    setAnimate(true);
  };

  return (
    <>
      <Reveal className="sh" id="upcoming" style={cssVars({ marginTop: 56 })}>
        <div>
          <h2>{t('upcoming.title')}</h2>
          <p>{t('upcoming.sub')}</p>
        </div>
      </Reveal>
      <Reveal className="chips countries">
        <button type="button" className={`chip${filter === 'all' ? ' on' : ''}`} aria-pressed={filter === 'all'} onClick={() => pick('all')}>
          🌏 {t('country.all')}
          {items.length > 0 && <i>{items.length}</i>}
        </button>
        {countryChips.map((c) => (
          <button
            key={c.code}
            type="button"
            className={`chip${filter === c.code ? ' on' : ''}`}
            aria-pressed={filter === c.code}
            onClick={() => pick(filter === c.code ? 'all' : c.code)}
          >
            <span aria-hidden="true">{c.flag}</span> {loc(c.name)}
            <i>{counts.get(c.code)}</i>
          </button>
        ))}
      </Reveal>
      <Reveal className="ul">
        <div key={filter}>
          {list.length ? (
            list.map(({ tour, date }, i) => (
              // ทั้งแถวเป็นลิงก์ → กดตรงไหนของแถวก็เข้าหน้าทัวร์ได้ (ไม่ต้องเล็งปุ่ม "ดูทัวร์")
              <a
                className={`row row-link${animate ? ' anim' : ''}`}
                key={tour.id}
                href={tourHref(tour.id)}
                onClick={rememberHomeScroll}
                aria-label={`${loc(tour.title)} — ${t('upcoming.view')}`}
                style={toneStyle(tour.variant, { '--d': i })}
              >
                <div className="dbox" style={monthColor(date)}>
                  <small>{month(date)}</small>
                  <b>{day(date)}</b>
                </div>
                <div className="ri">
                  <h3>{loc(tour.title)}</h3>
                  <div className="ri-meta">
                    <span className="dn" aria-label={t('tour.daysNights', { d: tour.days, n: tour.days - 1 })}>
                      ☀ {t('tour.days', { d: tour.days })} · ☾ {t('tour.nights', { n: tour.days - 1 })}
                    </span>
                    <span className="ri-route">⌖ {loc(tour.route)}</span>
                  </div>
                </div>
                {/* ยังไม่เปิดราคา — แสดงเป็น ฿XX,XXX (จำนวนหลักเท่าราคาจริง) */}
                <div className="rp rp-soon" aria-label={t('upcoming.priceSoon')}>
                  <small>{t('upcoming.priceSoon')}</small>
                  <PriceTag text={maskPrice(price(tour.price))} />
                </div>
                <span className="rm" aria-hidden="true">
                  {t('upcoming.view')}
                </span>
              </a>
            ))
          ) : (
            <p style={{ padding: 24, color: 'var(--mut)' }}>{t('upcoming.empty')}</p>
          )}
        </div>
      </Reveal>
    </>
  );
}
