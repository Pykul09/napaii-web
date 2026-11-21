import { useEffect, useState } from 'react';
import { findCountry } from '../data/tours';
import { useI18n } from '../i18n';
import type { TourItem, TourPhoto } from '../types';
import { Poster, toneStyle } from './Poster';

interface Slide {
  src?: string;
  /** รูปย่อสำหรับแถบ thumbnail (เล็กกว่า src) */
  thumb?: string;
  credit?: string;
  variant: number;
}

/** รูปย่อ 960px จาก URL thumbnail ของ Wikimedia (รูปอื่นคืนค่าเดิม) */
const smaller = (url: string): string => url.replace(/\/\d+px-/, '/960px-');

const AUTOPLAY_MS = 5500;
const POSTER_STYLES = 5;

/** รูปของทัวร์: cover + gallery (รูปจริง) → images → ลายโปสเตอร์ 4 แบบจาก variant */
export function tourSlides(tour: TourItem): Slide[] {
  const photos = [tour.cover, ...(tour.gallery ?? [])].filter((p): p is TourPhoto => !!p);
  if (photos.length) {
    return photos.slice(0, 4).map((p) => {
      const src = p.large ?? p.src;
      return { src, thumb: smaller(src), credit: `© ${p.author} · ${p.license}`, variant: tour.variant };
    });
  }
  if (tour.images?.length) return tour.images.slice(0, 4).map((src) => ({ src, variant: tour.variant }));
  return Array.from({ length: 4 }, (_, i) => ({ variant: (tour.variant + i) % POSTER_STYLES }));
}

function SlideArt({ slide, thumb = false }: { slide: Slide; thumb?: boolean }) {
  const src = thumb ? (slide.thumb ?? slide.src) : slide.src;
  return src ? <img src={src} alt="" title={slide.credit} loading={thumb ? 'lazy' : undefined} decoding="async" /> : <Poster variant={slide.variant} />;
}

/** Hero เต็มความกว้าง: รูปพื้นหลังใหญ่สไลด์อัตโนมัติ + ชื่อทัวร์/ประเทศ/เส้นทางซ้อนทับ + แถบรูปย่อ */
export function TourHero({ tour }: { tour: TourItem }) {
  const { t, loc } = useI18n();
  const country = findCountry(tour.country);
  const slides = tourSlides(tour);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // เลื่อนรูปอัตโนมัติ (หยุดเมื่อเมาส์อยู่บน hero หรือผู้ใช้ตั้งค่าลดการเคลื่อนไหว)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduce || slides.length < 2) return;
    const timer = window.setTimeout(() => setIdx((i) => (i + 1) % slides.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [idx, paused, slides.length]);

  const go = (n: number) => setIdx((n + slides.length) % slides.length);

  return (
    <>
      <section className="evh" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel" aria-label={t('detail.photos')}>
        {slides.map((s, i) => (
          <div className={`evh-slide${i === idx ? ' on' : ''}`} style={s.src ? undefined : toneStyle(s.variant)} aria-hidden={i !== idx} key={i}>
            <SlideArt slide={s} />
          </div>
        ))}
        <div className="evh-shade" />

        <div className="evh-in">
          <a className="evh-back" href="#featured">
            ← {t('detail.back')}
          </a>
          <div className="evh-txt">
            <span className={`tag tag-inline cat-${tour.category}`}>{t(`cat.${tour.category}`)}</span>
            <h1>{loc(tour.title)}</h1>
            <p>
              {country.flag} {loc(country.name)} · {loc(tour.route)} · {t('tour.daysNights', { d: tour.days, n: tour.days - 1 })}
            </p>
          </div>
        </div>

        {slides.length > 1 && (
          <div className="evh-ctl">
            <button type="button" className="ar" aria-label={t('detail.prevPhoto')} onClick={() => go(idx - 1)}>
              ‹
            </button>
            <button type="button" className="ar" aria-label={t('detail.nextPhoto')} onClick={() => go(idx + 1)}>
              ›
            </button>
          </div>
        )}
      </section>

      {slides.length > 1 && (
        <div className="wrap evg" role="group" aria-label={t('detail.photos')}>
          {slides.map((s, i) => (
            <button
              type="button"
              className={`evg-t${i === idx ? ' on' : ''}`}
              style={s.src ? undefined : toneStyle(s.variant)}
              aria-label={t('detail.photoOf', { n: i + 1, m: slides.length })}
              aria-current={i === idx}
              onClick={() => setIdx(i)}
              key={i}
            >
              <SlideArt slide={s} thumb />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
