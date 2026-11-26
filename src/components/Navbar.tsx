import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useI18n, type MessageKey } from '../i18n';
import type { ThemeMode } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ProfileMenu } from './ProfileMenu';
import { SavedTours } from './SavedTours';
import { ThemeToggle } from './ThemeToggle';

type NavKey = 'home' | 'tours' | 'upcoming' | 'rates' | 'articles';

const NAV: { key: NavKey; href: string; label: MessageKey }[] = [
  { key: 'home', href: '#', label: 'nav.home' },
  { key: 'tours', href: '#featured', label: 'nav.tours' },
  { key: 'upcoming', href: '#upcoming', label: 'nav.upcoming' },
  { key: 'rates', href: '#rates', label: 'nav.rates' },
  { key: 'articles', href: '#articles', label: 'nav.articles' },
];

/** เมนูที่กำลังเลือก ตาม hash ของ URL (หน้าทัวร์ #/tours/... นับเป็นเมนู Tours) */
function navFromHash(hash: string): NavKey {
  if (hash === '#featured' || hash.startsWith('#/tours/')) return 'tours';
  if (hash === '#upcoming') return 'upcoming';
  if (hash === '#rates') return 'rates';
  if (hash === '#articles') return 'articles';
  return 'home';
}

/** ส่วนในหน้าแรกที่ใช้ไฮไลต์เมนูตามการเลื่อน (เรียงจากบนลงล่าง) */
const SECTIONS: { key: NavKey; id: string }[] = [
  { key: 'tours', id: 'featured' },
  { key: 'upcoming', id: 'upcoming' },
  { key: 'rates', id: 'rates' },
  { key: 'articles', id: 'articles' },
];
/** ระยะจากขอบบนจอที่ถือว่า "เข้าถึงส่วนนั้นแล้ว" (เผื่อความสูง navbar) */
const SPY_OFFSET = 140;

/** ส่วนที่กำลังดูอยู่ ตามตำแหน่งเลื่อนหน้าจอ */
function navFromScroll(): NavKey {
  // เลื่อนจนสุดหน้าแล้ว → ส่วนสุดท้าย (กรณีส่วนท้ายสั้นจนขอบบนไม่ถึงเส้น)
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    const last = [...SECTIONS].reverse().find((x) => document.getElementById(x.id));
    if (last) return last.key;
  }
  let current: NavKey = 'home';
  for (const sec of SECTIONS) {
    const el = document.getElementById(sec.id);
    if (el && el.getBoundingClientRect().top <= SPY_OFFSET) current = sec.key;
  }
  return current;
}

/** เมนูที่ไฮไลต์: หน้าทัวร์ = Tours, หน้าแรก = ตามส่วนที่เลื่อนไปถึง (อัปเดตทั้งตอนคลิกและตอนเลื่อน) */
function useActiveNav(): NavKey | null {
  const [key, setKey] = useState<NavKey | null>(() => (window.location.hash === '#/profile' ? null : navFromHash(window.location.hash)));
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hash = window.location.hash;
        setKey(hash.startsWith('#/tours/') ? 'tours' : hash === '#/profile' ? null : navFromScroll());
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('hashchange', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('hashchange', update);
    };
  }, []);
  return key;
}

interface Props {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export function Navbar({ theme, onThemeChange }: Props) {
  const { user, openAuth } = useAuth();
  const { t } = useI18n();
  const active = useActiveNav();

  return (
    <header className="top">
      <a className="brand" href="#" aria-label="Napaii">
        Napaii<span>.</span>
      </a>
      <nav className="nav" aria-label={t('nav.main')}>
        {NAV.map((n) => (
          <a key={n.key} href={n.href} className={active === n.key ? 'on' : undefined} aria-current={active === n.key ? 'page' : undefined}>
            {t(n.label)}
          </a>
        ))}
      </nav>
      <LanguageSwitcher />
      <ThemeToggle theme={theme} onChange={onThemeChange} />
      <SavedTours />
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
