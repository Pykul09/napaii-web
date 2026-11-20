import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n';
import { cssVars } from '../utils/format';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t, lang } = useI18n();

  // parallax เบา ๆ ของก้อนเทาด้านหลังตอนเลื่อนหน้า
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

  return (
    <section className="hero" ref={ref}>
      <i className="orb a" />
      <i className="orb b" />
      <i className="orb c" />
      <div className="hc">
        <div className="ey">{t('hero.eyebrow')}</div>
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
        <button type="button" className="btn" onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}>
          {t('hero.cta')}
        </button>
      </div>
    </section>
  );
}
