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
  line: <LineIcon />,
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3.8 7l8.2 6 8.2-6" />
    </svg>
  ),
};

const SOCIAL_NAMES: Record<SocialKey, string> = {
  facebook: 'Facebook',
  line: 'LINE',
  email: 'Email',
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
                target={COMPANY.social[k] === '#' || COMPANY.social[k].startsWith('mailto:') ? undefined : '_blank'}
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
