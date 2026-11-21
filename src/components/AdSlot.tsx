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

/** พื้นที่โฆษณา 2 คอลัมน์ (ใต้ส่วนบทความ) — แต่ละช่องขนาดมาตรฐาน 300 × 250 ขยายเต็มคอลัมน์ */
export function AdDouble() {
  const { t } = useI18n();
  return (
    <Reveal as="div" className="ad2">
      {(['ad-double-left-300x250', 'ad-double-right-300x250'] as const).map((slot, i) => (
        <aside key={slot} className={`ad ad2-slot ad2-${i + 1}`} data-ad-slot={slot}>
          <span className="adl">{t('ad.advertisement')}</span>
          <b>{t(i === 0 ? 'ad.double.title1' : 'ad.double.title2')}</b>
          <span>{t('ad.double.sub')}</span>
          <button type="button" className="btn sm">
            {t('ad.leader.cta')}
          </button>
        </aside>
      ))}
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
