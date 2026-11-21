import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useToast } from '../context/ToastContext';
import { isComingSoon } from '../utils/calendar';
import { tourPriceText } from '../utils/format';
import { useI18n } from '../i18n';
import type { TourItem } from '../types';
import { CALL_CENTER, LINE_ADD_FRIEND_URL } from '../utils/line';
import { LineIcon } from './LineIcon';

/** ประเภทคำขอเมื่อไม่ได้จองทัวร์ที่มีอยู่: ทริปส่วนตัว หรือ ทริปกลุ่ม */
export type TripRequest = 'private' | 'group';

interface Props {
  /** ทัวร์ที่จะจอง — ไม่ส่ง = โหมด "ขอทริปส่วนตัว/กลุ่ม" (ไม่มีสรุปทัวร์ และใช้ข้อความ LINE ตาม request) */
  tour?: TourItem;
  departure?: string;
  request?: TripRequest;
  open: boolean;
  onClose: () => void;
}

/** แผงที่เลื่อนออกมาจากด้านขวา: เลือกจองทาง LINE หรือโทร Call Center (ใช้ทั้งจองทัวร์ และขอทริปส่วนตัว) */
export function BookingDrawer({ tour, departure, request = 'private', open, onClose }: Props) {
  const { t, loc, dateRange, price } = useI18n();
  const toast = useToast();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const date = tour && departure ? dateRange(departure, tour.days) : '';
  /** ทัวร์ที่กำลังจะเปิดขาย → แผงนี้ใช้ "ฝากติดตาม" แทนการจอง */
  const soon = !!tour && isComingSoon(tour);

  // ทุกโหมด (จองทัวร์ / แจ้งเตือนเปิดจอง / ขอทริปส่วนตัว / ทริปกลุ่ม): เปิดลิงก์เพิ่มเพื่อน LINE OA ของ Napaii
  const bookLine = () => window.open(LINE_ADD_FRIEND_URL, '_blank', 'noopener,noreferrer');

  return createPortal(
    <div className={`bk-root${open ? ' show' : ''}`} aria-hidden={!open} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside className="bk-panel" role="dialog" aria-modal="true" aria-labelledby="bk-title">
        <div className="bk-head">
          <h2 id="bk-title">{t(tour ? (soon ? 'soon.notifyTitle' : 'booking.title') : request === 'group' ? 'groupTrip.title' : 'privateTrip.title')}</h2>
          <button type="button" className="bk-x" aria-label={t('auth.close')} onClick={onClose}>
            ×
          </button>
        </div>

        {/* สรุปทัวร์ที่กำลังจะจอง */}
        {tour && (
          <div className="bk-sum">
            {tour.cover && <img src={tour.cover.src} alt="" />}
            <div>
              <b>{loc(tour.title)}</b>
              <span>
                {t('tour.code')}: <code>{tour.code}</code>
              </span>
              <span>📅 {date}</span>
              <span className="bk-price">{tourPriceText(tour, price)}</span>
            </div>
          </div>
        )}

        <p className="bk-sub">{t(tour ? (soon ? 'soon.notifySub' : 'booking.sub') : request === 'group' ? 'groupTrip.sub' : 'privateTrip.sub')}</p>

        <button type="button" className="bk-opt bk-line" onClick={bookLine}>
          <span className="bk-ic">
            <LineIcon />
          </span>
          <span className="bk-txt">
            <b>{t('detail.bookLine')}</b>
            <small>{t('booking.lineAddSub')}</small>
          </span>
          <span aria-hidden="true">›</span>
        </button>

        {CALL_CENTER ? (
          <a className="bk-opt bk-call" href={`tel:${CALL_CENTER.replace(/[^\d+]/g, '')}`}>
            <span className="bk-ic">📞</span>
            <span className="bk-txt">
              <b>{t('booking.call')}</b>
              <small>{CALL_CENTER}</small>
            </span>
            <span aria-hidden="true">›</span>
          </a>
        ) : (
          <button type="button" className="bk-opt bk-call" onClick={() => toast(t('booking.callMissing'))}>
            <span className="bk-ic">📞</span>
            <span className="bk-txt">
              <b>{t('booking.call')}</b>
              <small>{t('booking.callSub')}</small>
            </span>
            <span aria-hidden="true">›</span>
          </button>
        )}

        {/* กล่องเตือนให้แจ้งรหัสทัวร์ — แทรกรหัสเป็นป้ายเด่นกลางประโยค (เฉพาะตอนจองทัวร์) */}
        {tour && (
          <p className="bk-note">
            <span className="bk-note-ic" aria-hidden="true">
              💡
            </span>
            <span>
              {t('booking.note', { code: tour.code })
                .split(tour.code)
                .flatMap((part, i) => (i === 0 ? [part] : [<b key={i}>{tour.code}</b>, part]))}
            </span>
          </p>
        )}
      </aside>
    </div>,
    document.body,
  );
}
