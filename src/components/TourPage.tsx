import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { findCountry } from '../data/tours';
import { useReportLoading } from '../hooks/usePageLoading';
import { useSavedTours } from '../hooks/useSavedTours';
import { useI18n, type MessageKey } from '../i18n';
import { fetchFeaturedTours, fetchTourById } from '../services/tours';
import type { TourItem } from '../types';
import { downloadIcs, googleCalendarUrl, isComingSoon, isSoldOut } from '../utils/calendar';
import { tourPriceText } from '../utils/format';
import { Countdown } from './Countdown';
import { BookingDrawer } from './BookingDrawer';
import { PdfPreview } from './PdfPreview';
import { PriceTag, TourCard } from './TourCard';
import { TourHero } from './TourHero';

const INCLUDED: MessageKey[] = ['detail.inc1', 'detail.inc2', 'detail.inc3', 'detail.inc4', 'detail.inc5'];
const SEATS_NOTICE = 10;
const todayIso = new Date().toISOString().slice(0, 10);

/** หน้ารายละเอียดทัวร์ — เปิดจาก #/tours/:id */
export function TourPage({ id }: { id: string }) {
  const { t, lang, loc, dateRange, dateFull, price } = useI18n();
  const toast = useToast();
  const { user, openAuth } = useAuth();
  const saved = useSavedTours();
  const [tour, setTour] = useState<TourItem | null | undefined>(undefined); // undefined = กำลังโหลด
  const [others, setOthers] = useState<TourItem[]>([]);
  const [departure, setDeparture] = useState('');
  const [calOpen, setCalOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const closeBook = useCallback(() => setBookOpen(false), []);
  // บอก RouteLoader ว่ายังโหลดข้อมูลทัวร์อยู่ → ค้างหน้าจอ loading ไว้จนเสร็จ
  useReportLoading(tour === undefined);
  const closePdf = useCallback(() => setPdfOpen(false), []);

  useEffect(() => {
    let alive = true;
    setTour(undefined);
    setCalOpen(false);
    setPdfOpen(false);
    setBookOpen(false);
    fetchTourById(id).then((x) => {
      if (!alive) return;
      setTour(x);
      setDeparture(x?.departures[0] ?? '');
    });
    // แนะนำทัวร์อื่น: ประเทศเดียวกันก่อน
    fetchFeaturedTours().then((all) => {
      if (!alive) return;
      const here = all.find((x) => x.id === id)?.country;
      const rest = all.filter((x) => x.id !== id).sort((a, b) => Number(b.country === here) - Number(a.country === here));
      setOthers(rest.slice(0, 3));
    });
    return () => {
      alive = false;
    };
  }, [id]);

  // ชื่อแท็บเบราว์เซอร์ตามทัวร์ (คืนค่าเดิมเมื่อออกจากหน้า)
  useEffect(() => {
    if (!tour) return;
    const prev = document.title;
    document.title = `${loc(tour.title)} — Napaii`;
    return () => {
      document.title = prev;
    };
  }, [tour, loc]);

  if (tour === undefined) {
    return (
      <div aria-busy="true">
        <div className="evh sk" aria-label={t('detail.loading')} />
      </div>
    );
  }

  if (tour === null) {
    return (
      <main className="wrap evp evp-empty">
        <h1>{t('detail.notFound')}</h1>
        <p>{t('detail.notFoundSub')}</p>
        <a className="btn" href="#featured">
          ← {t('detail.back')}
        </a>
      </main>
    );
  }

  const country = findCountry(tour.country);
  const soon = isComingSoon(tour);
  const isSaved = saved.has(tour.id);

  const onSave = () => {
    if (!user) {
      toast(t('detail.signInToSave'));
      openAuth('signin');
      return;
    }
    toast(t(saved.toggle(tour.id) ? 'detail.saved' : 'detail.unsaved'));
  };

  // ปุ่มจอง: เปิดแผงด้านข้างให้เลือก จองทาง LINE หรือ โทร Call Center
  const onBook = () => setBookOpen(true);

  return (
    <>
      <TourHero tour={tour} />
      <main className="wrap evp">
        {/* หัวเอกสารสำหรับ PDF (แสดงเฉพาะตอนพิมพ์) */}
        <p className="print-brand">Napaii · napaii.com · {t('detail.printed', { date: dateFull(todayIso) })}</p>
        <div className="evp-grid">
          <article className="evp-main">
            <dl className="ev-facts">
              <div className="fact-dep">
                <dt>📅 {t('detail.departure')}</dt>
                <dd>
                  {dateRange(departure, tour.days)}
                  <span className="dn" aria-label={t('tour.daysNights', { d: tour.days, n: tour.days - 1 })}>
                    ☀ {t('tour.days', { d: tour.days })} · ☾ {t('tour.nights', { n: tour.days - 1 })}
                  </span>
                </dd>
              </div>
              <div className="fact-route">
                <dt>⌖ {t('detail.route')}</dt>
                <dd>
                  {loc(tour.route)}
                  <small>
                    {country.flag} {loc(country.name)}
                  </small>
                </dd>
              </div>
            </dl>

            <h2>{t('detail.about')}</h2>
            <p className="ev-desc">{loc(tour.description)}</p>
            <ul className="ev-hl">
              {tour.highlights.map((h) => (
                <li key={h.en}>{loc(h)}</li>
              ))}
            </ul>

            <h2>{t('detail.itinerary')}</h2>
            <ol className="itn">
              {tour.itinerary.map((d) => (
                <li key={d.day}>
                  <b>{t('detail.day', { n: d.day })}</b>
                  <span>{loc(d.text)}</span>
                </li>
              ))}
            </ol>

            <h2>{t('detail.included')}</h2>
            <ul className="ev-hl">
              {INCLUDED.map((k) => (
                <li key={k}>{t(k)}</li>
              ))}
            </ul>
            <p className="ev-free">{t('detail.incNote')}</p>

          </article>

          <aside className="evp-side">
            <div className="ev-code">
              <span>{t('tour.code')}</span>
              <b>{tour.code}</b>
            </div>
            <div className={`ev-price${soon ? ' rp-soon' : ''}`}>
              <span>{t(soon ? 'upcoming.priceSoon' : 'detail.price')}</span>
              <strong>
                <PriceTag text={tourPriceText(tour, price)} />
              </strong>
            </div>
            <div className="ev-sub">
              <p className="ev-free">{t('detail.perPerson')}</p>
              {soon ? (
                <p className="seat-note soon-note">🔔 {t('soon.badge')}</p>
              ) : isSoldOut(tour) ? (
                <p className="seat-note">{t('tour.soldOutNote')}</p>
              ) : (
                tour.seatsLeft <= SEATS_NOTICE && <p className="seat-note">{t('tour.seats', { n: tour.seatsLeft })}</p>
              )}
            </div>

            {soon && <p className="soon-info">{t('soon.info')}</p>}
            {!soon && !isSoldOut(tour) && departure && <Countdown departure={departure} className="cd-detail" />}

            <h3 className="dep-h">{t('detail.pickDate')}</h3>
            <div className="dep-list" role="group" aria-label={t('detail.pickDate')}>
              {tour.departures.map((d) => (
                <button type="button" key={d} className={`dep${d === departure ? ' on' : ''}`} aria-pressed={d === departure} onClick={() => setDeparture(d)}>
                  {dateRange(d, tour.days)}
                </button>
              ))}
            </div>

            <div className="ev-actions">
              {soon ? (
                // ทัวร์ที่กำลังจะเปิดขาย: ยังจองไม่ได้ → ให้ลูกค้าฝากติดตาม (เปิดแผง LINE / Call Center)
                <button type="button" className="btn ev-buy ev-notify" onClick={onBook} aria-haspopup="dialog">
                  🔔 {t('soon.notify')}
                </button>
              ) : (
                <button type="button" className="btn ev-buy ev-book" onClick={onBook} aria-haspopup="dialog" disabled={isSoldOut(tour)}>
                  {isSoldOut(tour) ? (
                    t('tour.soldOut')
                  ) : (
                    <>
                      <span aria-hidden="true">✈</span> {t('detail.bookNow')}
                    </>
                  )}
                </button>
              )}
              <button type="button" className={`btn ghost${isSaved ? ' on' : ''}`} aria-pressed={isSaved} onClick={onSave}>
                {isSaved ? '★' : '☆'} {t(isSaved ? 'detail.savedBtn' : 'detail.save')}
              </button>
              <div className="cal">
                <button type="button" className="btn ghost" aria-haspopup="menu" aria-expanded={calOpen} onClick={() => setCalOpen((o) => !o)}>
                  📅 {t('detail.addCalendar')}
                </button>
                {calOpen && (
                  <div className="cal-menu" role="menu">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        window.open(googleCalendarUrl(tour, departure, lang), '_blank', 'noopener,noreferrer');
                        setCalOpen(false);
                      }}
                    >
                      {t('detail.cal.google')}
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        downloadIcs(tour, departure, lang);
                        toast(t('detail.icsDownloaded'));
                        setCalOpen(false);
                      }}
                    >
                      {t('detail.cal.ics')}
                    </button>
                  </div>
                )}
              </div>
              {/* PDF: เปิดตัวอย่างก่อน แล้วกดดาวน์โหลด (หน้าต่างพิมพ์ → "บันทึกเป็น PDF") */}
              <button type="button" className="btn ghost" onClick={() => setPdfOpen(true)}>
                📄 {t('detail.previewPdf')}
              </button>
            </div>
          </aside>
        </div>

        {others.length > 0 && (
          <section className="evp-more">
            <h2>{t('detail.more')}</h2>
            <div className="cards">
              {others.map((x, i) => (
                <TourCard key={x.id} tour={x} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>
      <BookingDrawer tour={tour} departure={departure} open={bookOpen} onClose={closeBook} />
      <PdfPreview tour={tour} departure={departure} included={INCLUDED} open={pdfOpen} onClose={closePdf} />
    </>
  );
}
