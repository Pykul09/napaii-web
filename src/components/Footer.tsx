import type { ReactNode } from 'react';
import { COMPANY, type SocialKey } from '../data/company';
import { useI18n } from '../i18n';
import { LineIcon } from './LineIcon';

/** ไอคอนโซเชียล (ลายเส้นเรียบ ใช้สีตามตัวอักษร) */
const SOCIAL_ICONS: Record<SocialKey, ReactNode> = {
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21h3z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  line: <LineIcon />,
  tiktok: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.3 7.3 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
    </svg>
  ),
};

const SOCIAL_NAMES: Record<SocialKey, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  line: 'LINE',
  tiktok: 'TikTok',
  youtube: 'YouTube',
};

export function Footer() {
  const { t, loc } = useI18n();
  const socials = (Object.keys(COMPANY.social) as SocialKey[]).filter((k) => COMPANY.social[k]);

  return (
    <footer className="ft">
      <div className="ft-grid">
        {/* แบรนด์ + โซเชียล */}
        <div className="ft-col ft-brand">
          <a className="brand" href="#" aria-label="Napaii">
            Napaii<span>.</span>
          </a>
          <p>{t('footer.tagline')}</p>
          <div className="ft-social" aria-label={t('footer.follow')}>
            {socials.map((k) => (
              <a
                key={k}
                className={`ft-soc ft-soc-${k}`}
                href={COMPANY.social[k]}
                target={COMPANY.social[k] === '#' ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={SOCIAL_NAMES[k]}
                title={SOCIAL_NAMES[k]}
              >
                {SOCIAL_ICONS[k]}
              </a>
            ))}
          </div>
        </div>

        {/* ที่อยู่บริษัท */}
        <div className="ft-col">
          <h3>{t('footer.address')}</h3>
          <p className="ft-strong">{loc(COMPANY.name)}</p>
          <p>
            {COMPANY.mapUrl ? (
              <a href={COMPANY.mapUrl} target="_blank" rel="noopener noreferrer" className="footlink">
                {loc(COMPANY.address)}
              </a>
            ) : (
              loc(COMPANY.address)
            )}
          </p>
        </div>

        {/* ติดต่อ */}
        <div className="ft-col">
          <h3>{t('footer.contact')}</h3>
          <ul className="ft-contact">
            <li>
              <span aria-hidden="true">📞</span>
              <a href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`} className="footlink">
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <span aria-hidden="true">✉️</span>
              <a href={`mailto:${COMPANY.email}`} className="footlink">
                {COMPANY.email}
              </a>
            </li>
            <li>
              <span aria-hidden="true">🌐</span>
              <a href="https://napaii.com" className="footlink">
                napaii.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-bottom">
        <span>{t('footer.copy')}</span>
        <span>
          {t('footer.about')} · {t('footer.help')} · {t('footer.privacy')}
        </span>
      </div>
    </footer>
  );
}
