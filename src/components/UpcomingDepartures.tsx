import { useEffect, useState } from 'react';
import { DEPARTURE_FILTERS } from '../data/tours';
import { rememberHomeScroll, tourHref } from '../hooks/useTourRoute';
import { useI18n } from '../i18n';
import { fetchDepartures } from '../services/tours';
import type { Departure } from '../types';
import { cssVars } from '../utils/format';
import { toneStyle } from './Poster';
import { Reveal } from './Reveal';

type Filter = (typeof DEPARTURE_FILTERS)[number];

/** ส่วน "ทัวร์ใกล้ออกเดินทาง" — รอบออกเดินทางที่ใกล้ที่สุดของแต่ละทัวร์ กรองตามประเภททริปได้ */
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

  const list = items.filter((d) => filter === 'all' || d.tour.category === filter);
  const filterLabel = (f: Filter) => (f === 'all' ? t('filter.all') : t(`cat.${f}`));

  return (
    <>
      <Reveal className="sh" id="upcoming" style={cssVars({ marginTop: 56 })}>
        <div>
          <h2>{t('upcoming.title')}</h2>
          <p>{t('upcoming.sub')}</p>
        </div>
      </Reveal>
      <Reveal className="chips">
        {DEPARTURE_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`chip${filter === f ? ' on' : ''}`}
            onClick={() => {
              setFilter(f);
              setAnimate(true);
            }}
          >
            {filterLabel(f)}
          </button>
        ))}
      </Reveal>
      <Reveal className="ul">
        <div key={filter}>
          {list.length ? (
            list.map(({ tour, date }, i) => (
              <div className={`row${animate ? ' anim' : ''}`} key={tour.id} style={toneStyle(tour.variant, { '--d': i })}>
                <div className="dbox">
                  <small>{month(date)}</small>
                  <b>{day(date)}</b>
                </div>
                <div className="ri">
                  <h3>{loc(tour.title)}</h3>
                  <span>
                    {t('tour.daysNights', { d: tour.days, n: tour.days - 1 })} · ⌖ {loc(tour.route)}
                  </span>
                </div>
                <span className="tag tag-inline">{t(`cat.${tour.category}`)}</span>
                <div className="rp">
                  {t('tour.from')} {price(tour.price)}
                </div>
                <a className="rm" href={tourHref(tour.id)} onClick={rememberHomeScroll}>
                  {t('upcoming.view')}
                </a>
              </div>
            ))
          ) : (
            <p style={{ padding: 24, color: 'var(--mut)' }}>{t('upcoming.empty')}</p>
          )}
        </div>
      </Reveal>
    </>
  );
}
