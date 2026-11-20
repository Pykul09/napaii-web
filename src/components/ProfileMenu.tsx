import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useI18n } from '../i18n';
import { initials } from '../utils/format';

export function ProfileMenu() {
  const { user, signOut } = useAuth();
  const toast = useToast();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  if (!user) return null;

  return (
    <div className="pw" ref={ref}>
      <button type="button" className="av" aria-label={t('profile.open')} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {initials(user.name)}
      </button>
      <div className={`pm${open ? ' show' : ''}`}>
        <div className="uh">
          <b>{user.name}</b>
          <span>{user.email}</span>
          <br />
          <i className="pb2">{t(`provider.${user.provider}`)}</i>
        </div>
        <a href="#">{t('profile.profile')}</a>
        <a href="#">{t('profile.settings')}</a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            signOut();
            setOpen(false);
            toast(t('toast.signedOut'));
          }}
        >
          {t('profile.signOut')}
        </a>
      </div>
    </div>
  );
}
