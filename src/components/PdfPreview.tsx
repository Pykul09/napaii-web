import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { findCountry } from '../data/tours';
import { isComingSoon } from '../utils/calendar';
import { tourPriceText } from '../utils/format';
import { useI18n, type MessageKey } from '../i18n';
import type { TourItem } from '../types';

interface Props {
  tour: TourItem;
  /** รอบเดินทางที่เลือกอยู่ (ไฮไลต์ในเอกสาร) */
  departure: string;
  included: MessageKey[];
  open: boolean;
  onClose: () => void;
}

/**
 * Popup ตัวอย่างเอกสาร PDF (หน้า A4) ของทัวร์
 * ปุ่ม "ดาวน์โหลด PDF" เปิดหน้าต่างพิมพ์ของเบราว์เซอร์ → เลือก "บันทึกเป็น PDF"
 * ตอนพิมพ์จะพิมพ์เฉพาะแผ่นเอกสารใน popup นี้ (ดู .pdf-printing ใน sections.css)
 */
export function PdfPreview({ tour, departure, included, open, onClose }: Props) {
  const { t, loc, dateFull, dateRange, price } = useI18n();
  const country = findCountry(tour.country);
  const today = new Date().toISOString().slice(0, 10);

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

  const download = () => {
    const root = document.documentElement;
    root.classList.add('pdf-printing');
    const done = () => {
      root.classList.remove('pdf-printing');
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    window.print();
  };

  if (!open) return null;

  return createPortal(
    <div className="pdf-root" role="dialog" aria-modal="true" aria-labelledby="pdf-title" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pdf-bar">
        <b id="pdf-title">📄 {t('pdf.title')}</b>
        <span className="pdf-hint">{t('pdf.hint')}</span>
        <div className="pdf-bar-btns">
          <button type="button" className="btn sm" onClick={download}>
            ⬇ {t('detail.pdf')}
          </button>
          <button type="button" className="btn ghost sm" onClick={onClose}>
            {t('auth.close')}
          </button>
        </div>
      </div>

      <div className="pdf-scroll" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
        <article className="pdf-sheet">
          <header className="pdf-head">
            <span className="pdf-brand">
              Napaii<i>.</i>
            </span>
            <span className="pdf-meta">
              napaii.com · {t('detail.printed', { date: dateFull(today) })}
            </span>
          </header>

          {tour.cover && <img className="pdf-cover" src={tour.cover.src} alt="" />}

          <div className="pdf-titlerow">
            <div>
              <span className={`tag tag-inline cat-${tour.category}`}>{t(`cat.${tour.category}`)}</span>
              <h1>{loc(tour.title)}</h1>
              <p className="pdf-sub">
                {country.flag} {loc(country.name)} · {loc(tour.route)}
              </p>
            </div>
            <div className="pdf-code">
              <small>{t('tour.code')}</small>
              <b>{tour.code}</b>
            </div>
          </div>

          <dl className="pdf-facts">
            <div>
              <dt>{t('detail.departure')}</dt>
              <dd>{dateRange(departure, tour.days)}</dd>
            </div>
            <div>
              <dt>{t('tour.daysNights', { d: tour.days, n: tour.days - 1 })}</dt>
              <dd>
                ☀ {t('tour.days', { d: tour.days })} · ☾ {t('tour.nights', { n: tour.days - 1 })}
              </dd>
            </div>
            <div className="pdf-price">
              <dt>
                {t(isComingSoon(tour) ? 'upcoming.priceSoon' : 'detail.price')} · {t('detail.perPerson')}
              </dt>
              <dd>{tourPriceText(tour, price)}</dd>
            </div>
          </dl>

          <h2>{t('detail.about')}</h2>
          <p>{loc(tour.description)}</p>
          <ul>
            {tour.highlights.map((h) => (
              <li key={h.en}>{loc(h)}</li>
            ))}
          </ul>

          <h2>{t('detail.itinerary')}</h2>
          <ol className="pdf-itn">
            {tour.itinerary.map((d) => (
              <li key={d.day}>
                <b>{t('detail.day', { n: d.day })}</b>
                <span>{loc(d.text)}</span>
              </li>
            ))}
          </ol>

          <h2>{t('pdf.departures')}</h2>
          <ul className="pdf-deps">
            {tour.departures.map((d) => (
              <li key={d} className={d === departure ? 'on' : undefined}>
                {dateRange(d, tour.days)}
              </li>
            ))}
          </ul>

          <h2>{t('detail.included')}</h2>
          <ul>
            {included.map((k) => (
              <li key={k}>{t(k)}</li>
            ))}
          </ul>
          <p className="pdf-note">{t('detail.incNote')}</p>

          {tour.cover && (
            <p className="pdf-credit">
              Photo: {tour.cover.author} · {tour.cover.license} (Wikimedia Commons)
            </p>
          )}
        </article>
      </div>
    </div>,
    document.body,
  );
}
