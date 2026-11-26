import { useEffect, useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useI18n, type MessageKey } from '../i18n';
import type { AuthProvider } from '../types';
import { initials } from '../utils/format';
import { calcAge, isValidBirthDate, isValidPhone, normalizePhone, todayISO } from '../utils/validation';

/** แยกชื่อเต็มเป็น ชื่อ / นามสกุล (คำแรก = ชื่อ, ที่เหลือ = นามสกุล) */
const splitName = (full: string): [string, string] => {
  const parts = full.trim().split(/\s+/);
  return [parts[0] ?? '', parts.slice(1).join(' ')];
};

/** ไอคอนผู้ให้บริการ login */
function ProviderIcon({ provider }: { provider: AuthProvider }) {
  if (provider === 'apple') return <span aria-hidden="true"></span>;
  if (provider === 'google') return <b aria-hidden="true">G</b>;
  if (provider === 'facebook') return <b aria-hidden="true">f</b>;
  return <span aria-hidden="true">✉️</span>;
}

type Errors = Partial<Record<'firstName' | 'birthDate' | 'phone', MessageKey>>;

/** หน้าโปรไฟล์ (#/profile) — ดูและแก้ข้อมูลส่วนตัว ใช้ได้ทั้งบัญชีอีเมลและบัญชีที่ล็อกอินผ่าน Apple/Google/Facebook */
export function ProfilePage() {
  const { user, openAuth, updateProfile, signOut } = useAuth();
  const toast = useToast();
  const { t, dateFull } = useI18n();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({ firstName: '', lastName: '', birthDate: '', phone: '' });

  // เติมฟอร์มจากข้อมูลผู้ใช้ทุกครั้งที่เปิดโหมดแก้ไข / ผู้ใช้เปลี่ยน
  useEffect(() => {
    if (!user) return;
    const [firstName, lastName] = splitName(user.name);
    setForm({ firstName, lastName, birthDate: user.profile?.birthDate ?? '', phone: user.profile?.phone ?? '' });
    setErrors({});
  }, [user, editing]);

  useEffect(() => {
    const prev = document.title;
    document.title = `${t('profilePage.title')} — Napaii`;
    return () => {
      document.title = prev;
    };
  }, [t]);

  if (!user) {
    return (
      <main className="wrap pf pf-empty">
        <h1>{t('profilePage.title')}</h1>
        <p>{t('profilePage.signInFirst')}</p>
        <button type="button" className="btn" onClick={() => openAuth('signin')}>
          {t('auth.signIn')}
        </button>
      </main>
    );
  }

  const [firstName, lastName] = splitName(user.name);
  const birth = user.profile?.birthDate || '';
  const phone = user.profile?.phone || '';
  const social = user.provider !== 'email';
  const missing = !birth || !phone;

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.firstName.trim()) next.firstName = 'profilePage.err.firstName';
    if (form.birthDate && !isValidBirthDate(form.birthDate)) next.birthDate = 'profilePage.err.birthDate';
    if (form.phone && !isValidPhone(form.phone)) next.phone = 'profilePage.err.phone';
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaving(true);
    try {
      await updateProfile({ ...form, phone: form.phone ? normalizePhone(form.phone) : '' });
      toast(t('profilePage.saved'));
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const notSet = <span className="pf-none">{t('profilePage.notSet')}</span>;

  return (
    <main className="wrap pf">
      <a className="pf-back" href="#">
        ← {t('nav.home')}
      </a>

      {/* หัวโปรไฟล์: รูปย่อ ชื่อ และช่องทางที่ใช้ล็อกอิน */}
      <section className="pf-head">
        <span className="pf-avatar" aria-hidden="true">
          {initials(user.name)}
        </span>
        <div>
          <h1>{user.name}</h1>
          <span className={`pf-provider pf-${user.provider}`}>
            <ProviderIcon provider={user.provider} /> {t('profilePage.signedInWith', { provider: t(`provider.${user.provider}`) })}
          </span>
        </div>
      </section>

      {missing && !editing && (
        <p className="pf-hint">
          💡 {t('profilePage.completeHint')}{' '}
          <button type="button" className="pf-link" onClick={() => setEditing(true)}>
            {t('profilePage.completeNow')}
          </button>
        </p>
      )}

      <section className="pf-card">
        <div className="pf-card-head">
          <h2>{t('profilePage.personal')}</h2>
          {!editing && (
            <button type="button" className="btn ghost sm" onClick={() => setEditing(true)}>
              ✏️ {t('profilePage.edit')}
            </button>
          )}
        </div>

        {!editing ? (
          <dl className="pf-list">
            <div>
              <dt>{t('profilePage.firstName')}</dt>
              <dd>{firstName || notSet}</dd>
            </div>
            <div>
              <dt>{t('profilePage.lastName')}</dt>
              <dd>{lastName || notSet}</dd>
            </div>
            <div>
              <dt>{t('profilePage.birthDate')}</dt>
              <dd>{birth ? dateFull(birth) : notSet}</dd>
            </div>
            <div>
              <dt>{t('profilePage.age')}</dt>
              <dd>{birth ? t('profilePage.years', { n: calcAge(birth) }) : notSet}</dd>
            </div>
            <div>
              <dt>{t('profilePage.email')}</dt>
              <dd>
                {user.email}
                {social && <small className="pf-from">{t('profilePage.fromProvider', { provider: t(`provider.${user.provider}`) })}</small>}
              </dd>
            </div>
            <div>
              <dt>{t('profilePage.phone')}</dt>
              <dd>{phone || notSet}</dd>
            </div>
          </dl>
        ) : (
          <form className="pf-form" onSubmit={onSave} noValidate>
            <label>
              <span>{t('profilePage.firstName')} *</span>
              <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} autoComplete="given-name" aria-invalid={!!errors.firstName} />
              {errors.firstName && <small className="pf-err">{t(errors.firstName)}</small>}
            </label>
            <label>
              <span>{t('profilePage.lastName')}</span>
              <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} autoComplete="family-name" />
            </label>
            <label>
              <span>{t('profilePage.birthDate')}</span>
              <input type="date" max={todayISO()} value={form.birthDate} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} autoComplete="bday" aria-invalid={!!errors.birthDate} />
              <small className="pf-help">
                {form.birthDate && isValidBirthDate(form.birthDate) ? t('profilePage.ageIs', { n: calcAge(form.birthDate) }) : t('profilePage.optional')}
              </small>
              {errors.birthDate && <small className="pf-err">{t(errors.birthDate)}</small>}
            </label>
            <label>
              <span>{t('profilePage.email')}</span>
              <input value={user.email} readOnly disabled />
              <small className="pf-help">{social ? t('profilePage.emailFromProvider', { provider: t(`provider.${user.provider}`) }) : t('profilePage.emailLocked')}</small>
            </label>
            <label>
              <span>{t('profilePage.phone')}</span>
              <input type="tel" inputMode="tel" placeholder="0812345678" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" aria-invalid={!!errors.phone} />
              <small className="pf-help">{t('profilePage.optional')}</small>
              {errors.phone && <small className="pf-err">{t(errors.phone)}</small>}
            </label>
            <div className="pf-actions">
              <button type="submit" className="btn" disabled={saving}>
                {saving ? t('profilePage.saving') : t('profilePage.save')}
              </button>
              <button type="button" className="btn ghost" onClick={() => setEditing(false)} disabled={saving}>
                {t('profilePage.cancel')}
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="pf-card pf-more">
        <a className="pf-row" href="#featured">
          🌏 {t('profilePage.browse')} ›
        </a>
        <button
          type="button"
          className="pf-row pf-signout"
          onClick={() => {
            signOut();
            toast(t('toast.signedOut'));
            window.location.hash = '';
          }}
        >
          ↪ {t('profile.signOut')}
        </button>
      </section>
    </main>
  );
}
