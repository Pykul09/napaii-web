import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { findCountry } from '../data/tours';
import { useSavedTours } from '../hooks/useSavedTours';
import { rememberHomeScroll, tourHref } from '../hooks/useTourRoute';
import { useI18n } from '../i18n';
import { fetchToursByIds } from '../services/tours';
import type { TourItem } from '../types';
import { nextDeparture, todayBangkok } from '../utils/calendar';
import { Poster, toneStyle } from './Poster';

interface Row {
  id: string;
  tour: TourItem | null;
  next: string | null;
}

/** ปุ่มบันทึกบน Navbar + popup แสดงรายการทัวร์ที่บันทึกไว้ */
export function SavedTours() {
  const { user, openAuth } = useAuth();
  const toast = useToast();
  const { t, loc, dateFull, price } = useI18n();
  const saved = useSavedTours();
  const [open, setOpen] = useState(false);
  const [tours, setTours] = useState<TourItem[] | null>(null);

  // โหลดข้อมูลทัวร์เมื่อเปิด popup หรือรายการเปลี่ยน
  useEffect(() => {
    if (!open) return;
    let alive = true;
    fetchToursByIds(saved.ids).then((x) => alive && setTours(x));
    return () => {
      alive = false;
    };
  }, [open, saved.ids]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // ออกจากระบบแล้วปิด popup
  useEffect(() => {
    if (!user) setOpen(false);
  }, [user]);

  const onOpen = () => {
    if (!user) {
      toast(t('detail.signInToSave'));
      openAuth('signin');
      return;
    }
    setOpen(true);
  };

  const today = todayBangkok();
  const rows: Row[] = saved.ids
    .map((id) => {
      const tour = tours?.find((x) => x.id === id) ?? null;
      return { id, tour, next: tour ? nextDeparture(tour, today) : null };
    })
    // ทัวร์ที่ยังเปิดอยู่ขึ้นก่อน (เรียงตามวันเดินทาง) ที่หมดเวลาไปไว้ท้าย
    .sort((a, b) => {
      if (!a.next || !b.next) return Number(!a.next) - Number(!b.next);
      return a.next.localeCompare(b.next);
    });
  const expiredIds = tours ? rows.filter((r) => !r.next).map((r) => r.id) : [];
  const count = saved.ids.length;

  const remove = (id: string) => {
    saved.remove(id);
    toast(t('detail.unsaved'));
  };

  return (
    <>
      <button
        type="button"
        className="sv-btn"
        aria-label={count ? `${t('saved.open')} (${count})` : t('saved.open')}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={onOpen}
      >
        <HeartIcon filled={count > 0} />
        {count > 0 && <span className="sv-count">{count > 99 ? '99+' : count}</span>}
      </button>

      {/* portal ไปที่ body — .top ใช้ backdrop-filter ซึ่งทำให้ position: fixed อิงกับ header แทน viewport */}
      {createPortal(
      <div className={`overlay${open ? ' show' : ''}`} onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
        <div className="dlg sv-dlg" role="dialog" aria-modal="true" aria-labelledby="saved-title" aria-hidden={!open}>
          <button type="button" className="x" aria-label={t('auth.close')} onClick={() => setOpen(false)}>
            ×
          </button>
          <h2 id="saved-title">{t('saved.title')}</h2>
          <p className="sub">{t('saved.sub')}</p>

          {count === 0 ? (
            <div className="sv-empty">
              <p>{t('saved.empty')}</p>
              <a className="btn sm" href="#featured" onClick={() => setOpen(false)}>
                {t('saved.browse')}
              </a>
            </div>
          ) : tours === null ? (
            <ul className="sv-list" aria-busy="true">
              {saved.ids.map((id) => (
                <li className="sv-item sk" key={id}>
                  <div className="sv-thumb" />
                  <div className="sv-body">
                    <i style={{ width: '70%' }} />
                    <i style={{ width: '45%' }} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <ul className="sv-list">
                {rows.map(({ id, tour, next }) => {
                  const expired = !next;
                  const name = tour ? loc(tour.title) : id;
                  const country = tour ? findCountry(tour.country) : null;
                  const body = (
                    <>
                      <div className="sv-thumb" style={tour ? toneStyle(tour.variant) : undefined}>
                        {tour && <Poster variant={tour.variant} />}
                      </div>
                      <div className="sv-body">
                        <b>{tour ? name : t('saved.unavailable')}</b>
                        {tour && country && (
                          <span className="sv-meta">
                            {country.flag} {loc(tour.route)}
                          </span>
                        )}
                        <span className="sv-meta">
                          {expired ? (
                            <em className="sv-badge">{t('saved.expired')}</em>
                          ) : (
                            <>
                              {t('saved.next', { date: dateFull(next) })}
                              {tour && <strong> · {price(tour.price)}</strong>}
                            </>
                          )}
                        </span>
                      </div>
                    </>
                  );
                  return (
                    <li className={`sv-item${expired ? ' expired' : ''}`} key={id}>
                      {expired || !tour ? (
                        <div className="sv-link" aria-disabled="true">
                          {body}
                        </div>
                      ) : (
                        <a
                          className="sv-link"
                          href={tourHref(id)}
                          onClick={() => {
                            rememberHomeScroll();
                            setOpen(false);
                          }}
                        >
                          {body}
                        </a>
                      )}
                      <button type="button" className="sv-rm" aria-label={t('saved.removeAria', { name })} title={t('saved.remove')} onClick={() => remove(id)}>
                        <TrashIcon />
                      </button>
                    </li>
                  );
                })}
              </ul>
              {expiredIds.length > 0 && (
                <button type="button" className="btn ghost sm sv-clear" onClick={() => saved.removeMany(expiredIds)}>
                  {t('saved.clearExpired', { n: expiredIds.length })}
                </button>
              )}
            </>
          )}
        </div>
      </div>,
        document.body,
      )}
    </>
  );
}

export function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-9.3-9.4C1.5 7.8 3.6 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.4 0 5.5 3.3 4.3 6.6-1.8 4.8-9.3 9.4-9.3 9.4z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
    </svg>
  );
}
