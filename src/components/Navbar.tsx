import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n';
import type { ThemeMode } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ProfileMenu } from './ProfileMenu';
import { ThemeToggle } from './ThemeToggle';

interface Props {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export function Navbar({ theme, onThemeChange }: Props) {
  const { user, openAuth } = useAuth();
  const { t } = useI18n();

  return (
    <header className="top">
      <a className="brand" href="#" aria-label="Napaii">
        Napaii<span>.</span>
      </a>
      <nav className="nav" aria-label={t('nav.main')}>
        <a href="#">{t('nav.home')}</a>
        <a href="#featured">{t('nav.tours')}</a>
        <a href="#upcoming">{t('nav.upcoming')}</a>
        <a href="#articles">{t('nav.articles')}</a>
      </nav>
      <LanguageSwitcher />
      <ThemeToggle theme={theme} onChange={onThemeChange} />
      {user ? (
        <ProfileMenu />
      ) : (
        <button type="button" className="btn sm" onClick={() => openAuth('signin')}>
          {t('auth.signIn')}
        </button>
      )}
    </header>
  );
}
