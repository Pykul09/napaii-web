import { useEffect, useRef, useState } from 'react';
import { TOUR_PHOTOS } from '../data/photos';
import { useI18n } from '../i18n';
import type { Localized, TourPhoto } from '../types';
import { cssVars } from '../utils/format';

/** รูปพื้นหลัง hero (สไลด์อัตโนมัติ) — ใช้รูปขนาดใหญ่จากทัวร์ที่มีอยู่ */
const SLIDES: { photo?: TourPhoto; place: Localized }[] = [
  { photo: TOUR_PHOTOS.jp1, place: { en: 'Mt. Fuji · Japan', th: 'ภูเขาไฟฟูจิ · ญี่ปุ่น' } },
  { photo: TOUR_PHOTOS.it1, place: { en: 'Venice · Italy', th: 'เวนิส · อิตาลี' } },
  { photo: TOUR_PHOTOS.ch1, place: { en: 'Lauterbrunnen · Switzerland', th: 'เลาเทอร์บรุนเนิน · สวิตเซอร์แลนด์' } },
  { photo: TOUR_PHOTOS.vn1, place: { en: 'Ha Long Bay · Vietnam', th: 'อ่าวฮาลอง · เวียดนาม' } },
  { photo: TOUR_PHOTOS.sg1, place: { en: 'Marina Bay · Singapore', th: 'มารีน่าเบย์ · สิงคโปร์' } },
  { photo: TOUR_PHOTOS.id1, place: { en: 'Bali · Indonesia', th: 'บาหลี · อินโดนีเซีย' } },
];
const SLIDE_MS = 6000;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang, loc } = useI18n();
  const [idx, setIdx] = useState(0);
  const slides = SLIDES.filter((s) => s.photo);

  // parallax เบา ๆ ของรูปพื้นหลังตอนเลื่อนหน้า
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ref.current?.style.setProperty('--y', `${window.scrollY * 0.18}px`);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // สไลด์รูปอัตโนมัติ (หยุดถ้าผู้ใช้ตั้งค่าลดการเคลื่อนไหว)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || slides.length < 2) return;
    const timer = window.setTimeout(() => setIdx((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [idx, slides.length]);

  const current = slides[idx];

  return (
    <section className="hero hero-photo" ref={ref}>
      <div className="hero-bg" aria-hidden="true">
        {slides.map((s, i) => (
          <img
            key={s.photo!.src}
            className={i === idx ? 'on' : undefined}
            src={s.photo!.large ?? s.photo!.src}
            alt=""
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            title={`© ${s.photo!.author} · ${s.photo!.license}`}
          />
        ))}
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="hc">
        <div className="ey">
          <span className="hero-brand">Napaii.com</span> {t('hero.eyebrow')}
        </div>
        {/* key={lang}: เล่นแอนิเมชันหัวข้อใหม่เมื่อสลับภาษา */}
        <h1 key={lang}>
          <span className="ln">
            <span style={cssVars({ '--i': 0 })}>{t('hero.line1')}</span>
          </span>
          <span className="ln">
            <span style={cssVars({ '--i': 1 })}>{t('hero.line2')}</span>
          </span>
        </h1>
        <p>{t('hero.sub')}</p>
        <div className="hero-actions">
          <button type="button" className="btn" onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}>
            {t('hero.cta')}
          </button>
          <span className="hero-site">🌐 {t('hero.site')}</span>
        </div>
      </div>

      {current && (
        <div className="hero-place">
          <span>📍 {loc(current.place)}</span>
          <div className="hero-dots" role="group" aria-label={t('detail.photos')}>
            {slides.map((s, i) => (
              <button
                key={s.photo!.src}
                type="button"
                className={i === idx ? 'on' : undefined}
                aria-label={loc(s.place)}
                aria-current={i === idx}
                onClick={() => setIdx(i)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
