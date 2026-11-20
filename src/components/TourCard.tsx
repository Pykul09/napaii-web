import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { findCountry } from '../data/tours';
import { useSavedTours } from '../hooks/useSavedTours';
import { rememberHomeScroll, tourHref } from '../hooks/useTourRoute';
import { useI18n } from '../i18n';
import type { TourItem } from '../types';
import { avatarStyle, isOverflowBadge } from '../utils/avatar';
import { cssVars } from '../utils/format';
import { Poster, toneStyle } from './Poster';
import { HeartIcon } from './SavedTours';

const LOW_SEATS = 8;

/** departure: วันเดินทางที่จะโชว์บนการ์ด (ถ้าไม่ส่งจะใช้รอบที่ใกล้ที่สุด) */
export function TourCard({ tour, index, departure }: { tour: TourItem; index: number; departure?: string }) {
  const { t, loc, dateFull, price } = useI18n();
  const country = findCountry(tour.country);
  const { user, openAuth } = useAuth();
  const toast = useToast();
  const saved = useSavedTours();
  const isSaved = saved.has(tour.id);
  const name = loc(tour.title);

  const onSave = () => {
    if (!user) {
      toast(t('detail.signInToSave'));
      openAuth('signin');
      return;
    }
    toast(t(saved.toggle(tour.id) ? 'detail.saved' : 'detail.unsaved'));
  };

  return (
    // ปุ่มบันทึกอยู่นอก <a> (ห้ามซ้อน interactive element) แล้ววางทับด้วย position: absolute
    <div className="card-w" style={cssVars({ '--d': index })}>
    {/* การ์ดเป็นลิงก์จริง → เปิดหน้ารายละเอียดทัวร์ (คลิกขวาเปิดแท็บใหม่ได้ คีย์บอร์ดกด Enter ได้) */}
    <a
      className="card clickable"
      href={tourHref(tour.id)}
      style={toneStyle(tour.variant, { '--d': index })}
      aria-label={`${name} — ${t('detail.open')}`}
      onClick={rememberHomeScroll}
    >
      <div className="poster">
        <Poster variant={tour.variant} />
        <span className="tag">{t(`cat.${tour.category}`)}</span>
        <span className="cflag">
          {country.flag} {loc(country.name)}
        </span>
      </div>
      <div className="cb">
        <div className="dt">{t('tour.daysNights', { d: tour.days, n: tour.days - 1 })}</div>
        <h3>{loc(tour.title)}</h3>
        <div className="meta">⌖ {loc(tour.route)}</div>
        <div className="meta">{t('tour.nextDeparture', { date: dateFull(departure ?? tour.departures[0]) })}</div>
        {tour.seatsLeft <= LOW_SEATS && <div className="meta seat">{t('tour.seats', { n: tour.seatsLeft })}</div>}
        <div className="cf">
          <div className="att">
            {tour.attendees.map((a) => {
              const more = isOverflowBadge(a);
              return (
                <span className={more ? 'mi more' : 'mi'} style={more ? undefined : avatarStyle(a)} key={a}>
                  {a}
                </span>
              );
            })}
            <span className="go">{t('tour.booked', { n: tour.booked })}</span>
          </div>
          <span className="pr">
            <small>{t('tour.from')}</small>
            {price(tour.price)}
          </span>
        </div>
      </div>
    </a>
    <button
      type="button"
      className={`sv-fab${isSaved ? ' on' : ''}`}
      aria-pressed={isSaved}
      aria-label={t(isSaved ? 'saved.unsaveAria' : 'saved.saveAria', { name })}
      onClick={onSave}
    >
      <HeartIcon filled={isSaved} />
    </button>
    </div>
  );
}

export function TourSkeleton() {
  return (
    <article className="card sk" aria-hidden="true">
      <div className="poster" />
      <div className="cb">
        <i style={{ width: '40%' }} />
        <i style={{ width: '80%', height: 18 }} />
        <i style={{ width: '60%' }} />
      </div>
    </article>
  );
}