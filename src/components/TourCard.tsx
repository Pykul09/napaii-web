import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { findCountry } from '../data/tours';
import { useSavedTours } from '../hooks/useSavedTours';
import { rememberHomeScroll, tourHref } from '../hooks/useTourRoute';
import { useI18n } from '../i18n';
import type { TourItem } from '../types';
import { cssVars } from '../utils/format';
import { Poster, toneStyle } from './Poster';
import { HeartIcon } from './SavedTours';
import { Countdown } from './Countdown';
import { isSoldOut, nextDeparture } from '../utils/calendar';

const LOW_SEATS = 8;

interface Props {
  tour: TourItem;
  index: number;
  /** วันเดินทางที่จะโชว์บนการ์ด (ถ้าไม่ส่งจะใช้รอบถัดไปที่ยังไม่ผ่าน) */
  departure?: string;
  /** แสดงตัวนับถอยหลังปิดรับจองบนโปสเตอร์ */
  countdown?: boolean;
}

export function TourCard({ tour, index, departure, countdown = false }: Props) {
  const { t, loc, dateFull, price } = useI18n();
  const country = findCountry(tour.country);
  const { user, openAuth } = useAuth();
  const toast = useToast();
  const saved = useSavedTours();
  const isSaved = saved.has(tour.id);
  const name = loc(tour.title);
  const soldOut = isSoldOut(tour);
  const date = departure ?? nextDeparture(tour) ?? tour.departures[0];

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
    <div className={`card-w${tour.hot && !soldOut ? ' hot' : ''}`} style={cssVars({ '--d': index })}>
    {/* การ์ดเป็นลิงก์จริง → เปิดหน้ารายละเอียดทัวร์ (คลิกขวาเปิดแท็บใหม่ได้ คีย์บอร์ดกด Enter ได้) */}
    <a
      className={`card clickable${soldOut ? ' sold-out' : ''}`}
      href={tourHref(tour.id)}
      style={toneStyle(tour.variant, { '--d': index })}
      aria-label={`${name}${soldOut ? ` (${t('tour.soldOut')})` : ''} — ${t('detail.open')}`}
      onClick={rememberHomeScroll}
    >
      <div className="poster">
        <CardArt tour={tour} />
        <span className={`tag cat-${tour.category}`}>{t(`cat.${tour.category}`)}</span>
        <span className="cflag">
          {country.flag} {loc(country.name)}
        </span>
        {countdown && !soldOut && <Countdown departure={date} />}
        {soldOut && (
          <span className="so-stamp" aria-hidden="true">
            {t('tour.soldOut')}
          </span>
        )}
      </div>
      <div className="cb">
        <div className="dt" aria-label={t('tour.daysNights', { d: tour.days, n: tour.days - 1 })}>
          <span className="dn" aria-hidden="true">
            ☀ {t('tour.days', { d: tour.days })} · ☾ {t('tour.nights', { n: tour.days - 1 })}
          </span>
        </div>
        <h3>{loc(tour.title)}</h3>
        <div className="meta">⌖ {loc(tour.route)}</div>
        <div className="meta">{t('tour.nextDeparture', { date: dateFull(date) })}</div>
        {soldOut ? (
          <div className="meta seat">{t('tour.soldOutNote')}</div>
        ) : (
          tour.seatsLeft <= LOW_SEATS && <div className="meta seat">{t('tour.seats', { n: tour.seatsLeft })}</div>
        )}
        <div className="cf">
          <span className="tcode">
            <small>{t('tour.code')}</small>
            <b>{tour.code}</b>
          </span>
          <span className="pr">
            <small>{t('tour.from')}</small>
            <PriceTag text={price(tour.price)} />
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

/** รูปวิวจริงถ้ามี — ถ้าโหลดไม่ได้จะกลับไปใช้ลายโปสเตอร์ SVG */
function CardArt({ tour }: { tour: TourItem }) {
  const [failed, setFailed] = useState(false);
  if (!tour.cover || failed) return <Poster variant={tour.variant} />;
  return (
    <img
      className="poster-img"
      src={tour.cover.src}
      alt=""
      loading="lazy"
      decoding="async"
      title={`© ${tour.cover.author} · ${tour.cover.license}`}
      onError={() => setFailed(true)}
    />
  );
}

/** แยกสัญลักษณ์ ฿ ออกจากตัวเลข เพื่อให้ตัวเลขใหญ่และเด่นกว่า (ถ้าเป็น "ฟรี" จะแสดงทั้งข้อความ) */
export function PriceTag({ text }: { text: string }) {
  if (!text.startsWith('฿')) return <span className="pr-amt">{text}</span>;
  return (
    <span className="pr-val">
      <span className="pr-cur">฿</span>
      <span className="pr-amt">{text.slice(1)}</span>
    </span>
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