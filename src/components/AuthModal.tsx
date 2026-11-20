import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useAuth, type AuthMode } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useI18n, type MessageKey } from '../i18n';
import { AuthError } from '../services/auth';
import type { Gender, SocialProvider } from '../types';
import {
  calcAge,
  digitsOnly,
  EMAIL_RE,
  formatNationalId,
  isValidBirthDate,
  isValidPhone,
  isValidThaiNationalId,
  MIN_AGE,
  normalizePhone,
  todayISO,
} from '../utils/validation';

const GENDERS: Gender[] = ['male', 'female', 'other', 'undisclosed'];

type FieldKey = 'name' | 'email' | 'password' | 'birthDate' | 'phone' | 'gender' | 'nationalId';
type FieldErrors = Partial<Record<FieldKey, MessageKey>>;

function strength(pw: string): number {
  const score = Number(pw.length >= 8) + Number(/[a-z]/.test(pw) && /[A-Z]/.test(pw)) + Number(/\d/.test(pw)) + Number(/[^A-Za-z0-9]/.test(pw));
  return score * 25;
}

export function AuthModal() {
  const { modal, closeAuth, setAuthMode, signIn, signUp, social } = useAuth();
  const toast = useToast();
  const { t } = useI18n();
  const { open, mode } = modal;
  const signup = mode === 'signup';

  // สมัครสมาชิกแบ่งเป็น 2 ขั้น: 1 = บัญชี, 2 = ข้อมูลส่วนตัว
  const [step, setStep] = useState<1 | 2>(1);
  const profileStep = signup && step === 2;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [nationalId, setNationalId] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePdpa, setAgreePdpa] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  // เก็บเป็น "คีย์ข้อความ" ไม่ใช่ข้อความ เพื่อให้เปลี่ยนภาษาแล้วข้อความเปลี่ยนตามทันที
  const [formError, setFormError] = useState<MessageKey | null>(null);
  const [busy, setBusy] = useState<'form' | SocialProvider | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const birthRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<Element | null>(null);

  const resetForm = () => {
    setStep(1);
    setName('');
    setEmail('');
    setPassword('');
    setBirthDate('');
    setPhone('');
    setGender('');
    setNationalId('');
    setAgreeTerms(false);
    setAgreePdpa(false);
    setShowPw(false);
    setErrors({});
    setFormError(null);
  };

  // เปิด: จำ element ที่โฟกัสอยู่ แล้วโฟกัสช่องแรก / ปิด: รีเซ็ตฟอร์มและคืนโฟกัส
  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement;
      const timer = window.setTimeout(() => (signup ? nameRef : emailRef).current?.focus(), 350);
      return () => window.clearTimeout(timer);
    }
    resetForm();
    (lastFocus.current as HTMLElement | null)?.focus?.();
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // เข้าขั้นที่ 2 แล้วโฟกัสช่องวันเกิด
  useEffect(() => {
    if (profileStep) birthRef.current?.focus();
  }, [profileStep]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeAuth();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeAuth]);

  const switchMode = (next: AuthMode) => {
    setAuthMode(next);
    setStep(1);
    setErrors({});
    setFormError(null);
  };

  const errorKey = (err: unknown): MessageKey => (err instanceof AuthError ? (`auth.err.${err.code}` as MessageKey) : 'auth.err.generic');

  const onSocial = async (provider: SocialProvider) => {
    setFormError(null);
    setBusy(provider);
    try {
      await social(provider);
      closeAuth();
      toast(t('auth.socialDemo', { provider: t(`provider.${provider}`) }));
    } catch (err) {
      setFormError(errorKey(err));
    } finally {
      setBusy(null);
    }
  };

  const validateAccount = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!EMAIL_RE.test(email.trim())) errs.email = 'auth.err.email';
    if (signup) {
      if (name.trim().length < 2) errs.name = 'auth.err.name';
      if (password.length < 8) errs.password = 'auth.err.passwordShort';
    } else if (!password) {
      errs.password = 'auth.err.passwordEmpty';
    }
    return errs;
  };

  const validateProfile = (): FieldErrors => {
    const errs: FieldErrors = {};
    if (!isValidBirthDate(birthDate)) errs.birthDate = 'auth.err.birthDate';
    else if (calcAge(birthDate) < MIN_AGE) errs.birthDate = 'auth.err.minAge';
    if (!isValidPhone(phone)) errs.phone = 'auth.err.phone';
    if (!gender) errs.gender = 'auth.err.gender';
    // เลขบัตรไม่บังคับ — แต่ถ้ากรอกต้องถูกต้อง
    if (digitsOnly(nationalId).length > 0 && !isValidThaiNationalId(nationalId)) errs.nationalId = 'auth.err.nationalId';
    return errs;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // สมัคร ขั้นที่ 1 → ไปขั้นที่ 2
    if (signup && step === 1) {
      const errs = validateAccount();
      setErrors(errs);
      if (!Object.keys(errs).length) setStep(2);
      return;
    }

    // เข้าสู่ระบบ
    if (!signup) {
      const errs = validateAccount();
      setErrors(errs);
      if (Object.keys(errs).length) return;
      setBusy('form');
      try {
        const user = await signIn({ email: email.trim(), password });
        closeAuth();
        toast(t('auth.welcomeBack', { name: user.name.split(' ')[0] }));
      } catch (err) {
        setFormError(errorKey(err));
      } finally {
        setBusy(null);
      }
      return;
    }

    // สมัคร ขั้นที่ 2 → ส่งข้อมูลทั้งหมด
    const errs = validateProfile();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (!agreeTerms) return setFormError('auth.err.terms');
    if (!agreePdpa) return setFormError('auth.err.pdpa');

    setBusy('form');
    try {
      const id = digitsOnly(nationalId);
      const user = await signUp({
        name: name.trim(),
        email: email.trim(),
        password,
        profile: { birthDate, phone: normalizePhone(phone), gender: gender as Gender, nationalId: id || undefined },
      });
      closeAuth();
      toast(t('auth.welcomeNew', { name: user.name.split(' ')[0] }));
    } catch (err) {
      if (err instanceof AuthError && err.code === 'EMAIL_TAKEN') setStep(1); // กลับไปแก้อีเมล
      setFormError(errorKey(err));
    } finally {
      setBusy(null);
    }
  };

  const disabled = busy !== null;
  const age = isValidBirthDate(birthDate) ? calcAge(birthDate) : null;

  const title = profileStep ? t('auth.step2.title') : t(`auth.title.${mode}` as MessageKey);
  const sub = profileStep ? t('auth.step2.sub') : t(`auth.sub.${mode}` as MessageKey);
  const submitLabel = !signup ? t('auth.submit.signin') : step === 1 ? t('auth.next') : t('auth.submit.signup');

  const fieldErr = (key: FieldKey) => errors[key] && t(errors[key] as MessageKey, { n: MIN_AGE });

  return (
    <div className={`overlay${open ? ' show' : ''}`} onMouseDown={(e) => e.target === e.currentTarget && closeAuth()}>
      <div className="dlg" role="dialog" aria-modal="true" aria-labelledby="auth-title" aria-hidden={!open}>
        <button type="button" className="x" aria-label={t('auth.close')} onClick={closeAuth}>
          ×
        </button>
        <h2 id="auth-title">{title}</h2>
        <p className="sub">{sub}</p>

        {signup && (
          <>
            <div className="steps" aria-hidden="true">
              <i className="on" />
              <i className={step === 2 ? 'on' : ''} />
            </div>
            <p className="step-label">{t('auth.step', { n: step })}</p>
          </>
        )}

        {!profileStep && (
          <>
            <div className="soc">
              <button type="button" className="sb ap" disabled={disabled} onClick={() => onSocial('apple')}>
                {busy === 'apple' ? (
                  <i className="sp" />
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6 0 0-2.5-1-2.5-3.9zM14.2 5.8c.6-.8 1.1-1.8.9-2.8-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.7-.9 2.7 1 .1 2-.5 2.6-1.3z" />
                  </svg>
                )}
                {t('auth.continueApple')}
              </button>
              <button type="button" className="sb" disabled={disabled} onClick={() => onSocial('google')}>
                {busy === 'google' ? <i className="sp" /> : <b>G</b>}
                {t('auth.continueGoogle')}
              </button>
              <button type="button" className="sb" disabled={disabled} onClick={() => onSocial('facebook')}>
                {busy === 'facebook' ? <i className="sp" /> : <b>f</b>}
                {t('auth.continueFacebook')}
              </button>
            </div>

            <div className="or">{t('auth.or')}</div>

            <div className="tabs">
              <button type="button" className={!signup ? 'on' : ''} onClick={() => switchMode('signin')}>
                {t('auth.tab.signin')}
              </button>
              <button type="button" className={signup ? 'on' : ''} onClick={() => switchMode('signup')}>
                {t('auth.tab.signup')}
              </button>
            </div>
          </>
        )}

        <form onSubmit={onSubmit} noValidate>
          {formError && (
            <div className="fe" role="alert">
              {t(formError)}
            </div>
          )}

          {!profileStep && (
            <>
              {signup && (
                <label className={`fl${errors.name ? ' err' : ''}`}>
                  <span>{t('auth.name')}</span>
                  <input ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder={t('auth.namePh')} />
                  <small>{fieldErr('name')}</small>
                </label>
              )}
              <label className={`fl${errors.email ? ' err' : ''}`}>
                <span>{t('auth.email')}</span>
                <input ref={emailRef} type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder={t('auth.emailPh')} />
                <small>{fieldErr('email')}</small>
              </label>
              <label className={`fl${errors.password ? ' err' : ''}`}>
                <span>{t('auth.password')}</span>
                <div className="pwr">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={signup ? 'new-password' : 'current-password'}
                    placeholder={t('auth.passwordPh')}
                  />
                  <button type="button" onClick={() => setShowPw((s) => !s)}>
                    {showPw ? t('auth.hide') : t('auth.show')}
                  </button>
                </div>
                <small>{fieldErr('password')}</small>
              </label>
              {signup ? (
                <div className="meter">
                  <i style={{ width: `${strength(password)}%` }} />
                </div>
              ) : (
                <div className="fr">
                  <button type="button" className="lnk" onClick={() => toast(t('toast.resetSent'))}>
                    {t('auth.forgot')}
                  </button>
                </div>
              )}
            </>
          )}

          {profileStep && (
            <>
              <label className={`fl${errors.birthDate ? ' err' : ''}`}>
                <span>{t('auth.birthDate')}</span>
                <input ref={birthRef} type="date" value={birthDate} min="1900-01-01" max={todayISO()} onChange={(e) => setBirthDate(e.target.value)} autoComplete="bday" />
                {age !== null && !errors.birthDate && <p className="age">{t('auth.age', { n: age })}</p>}
                <small>{fieldErr('birthDate')}</small>
              </label>
              <label className={`fl${errors.phone ? ' err' : ''}`}>
                <span>{t('auth.phone')}</span>
                <input type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" placeholder={t('auth.phonePh')} />
                <small>{fieldErr('phone')}</small>
              </label>
              <label className={`fl${errors.gender ? ' err' : ''}`}>
                <span>{t('auth.gender')}</span>
                <select value={gender} onChange={(e) => setGender(e.target.value as Gender | '')}>
                  <option value="">{t('auth.genderPh')}</option>
                  {GENDERS.map((g) => (
                    <option key={g} value={g}>
                      {t(`gender.${g}`)}
                    </option>
                  ))}
                </select>
                <small>{fieldErr('gender')}</small>
              </label>
              <label className={`fl${errors.nationalId ? ' err' : ''}`}>
                <span>{t('auth.nationalId')}</span>
                <input
                  inputMode="numeric"
                  value={nationalId}
                  onChange={(e) => setNationalId(formatNationalId(e.target.value))}
                  autoComplete="off"
                  placeholder={t('auth.nationalIdPh')}
                />
                <p className="hint">{t('auth.nationalIdHint')}</p>
                <small>{fieldErr('nationalId')}</small>
              </label>
              <label className="chk">
                <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                <span>{t('auth.terms')}</span>
              </label>
              <label className="chk">
                <input type="checkbox" checked={agreePdpa} onChange={(e) => setAgreePdpa(e.target.checked)} />
                <span>{t('auth.pdpa')}</span>
              </label>
            </>
          )}

          <div className={profileStep ? 'btnrow' : undefined}>
            {profileStep && (
              <button type="button" className="btn ghost go2" disabled={disabled} onClick={() => setStep(1)}>
                {t('auth.back')}
              </button>
            )}
            <button type="submit" className="btn go2" disabled={disabled}>
              {busy === 'form' ? (
                <>
                  <i className="sp" /> {t('auth.wait')}
                </>
              ) : (
                submitLabel
              )}
            </button>
          </div>
        </form>
        <p className="note">{t('auth.note')}</p>
      </div>
    </div>
  );
}
