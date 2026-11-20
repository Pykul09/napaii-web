import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { cssVars } from '../utils/format';
import { Reveal } from './Reveal';

/**
 * พื้นที่โฆษณา — แต่ละ slot มี data-ad-slot เพื่อให้ต่อกับระบบโฆษณาจริงได้
 * (เช่น Google Ad Manager) โดยแทนเนื้อหาในคอมโพเนนต์เหล่านี้
 */

export function AdLeaderboard() {
  const { t } = useI18n();
  return (
    <Reveal as="aside" className="ad lb" data-ad-slot="leaderboard-728x90">
      <div>
        <span className="adl">{t('ad.advertisement')}</span>
        <b>{t('ad.leader.title')}</b>
        <span>{t('ad.leader.sub')}</span>
      </div>
      <button type="button" className="btn">
        {t('ad.leader.cta')}
      </button>
    </Reveal>
  );
}

export function AdBanner() {
  const { t } = useI18n();
  return (
    <Reveal as="aside" className="ad bn" data-ad-slot="banner-970x250">
      <span className="adl">{t('ad.advertisement')}</span>
      <b>{t('ad.banner.title')}</b>
      <span>{t('ad.banner.sub')}</span>
    </Reveal>
  );
}

/** โฆษณาแบบ native ที่หน้าตาเหมือนการ์ดกิจกรรม */
export function AdNativeCard({ index }: { index: number }) {
  const { t } = useI18n();
  return (
    <aside className="card ad fd" style={cssVars({ '--d': index })} data-ad-slot="feed-native">
      <div>
        <span className="adl">{t('ad.sponsored')}</span>
        <b style={{ display: 'block', marginTop: 14 }}>{t('ad.native.title')}</b>
        <p>{t('ad.native.body')}</p>
      </div>
      <button type="button" className="btn">
        {t('ad.native.cta')}
      </button>
    </aside>
  );
}

/** กล่องโฆษณาลอยมุมขวาล่าง โผล่หลัง 6 วินาที ปิดได้ */
export function StickyAd() {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShow(true), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  if (closed) return null;
  return (
    <aside className={`sticky${show ? ' show' : ''}`} data-ad-slot="sticky-300x100">
      <button type="button" className="x" aria-label={t('ad.close')} onClick={() => setClosed(true)}>
        ×
      </button>
      <span className="adl">{t('ad.advertisement')}</span>
      <b>{t('ad.sticky.title')}</b>
      <span>{t('ad.sticky.sub')}</span>
    </aside>
  );
}
