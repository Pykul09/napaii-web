import { useI18n } from '../i18n';
import type { Lang } from '../types';

const OPTIONS: { id: Lang; label: string; name: string }[] = [
  { id: 'th', label: 'TH', name: 'ภาษาไทย' },
  { id: 'en', label: 'EN', name: 'English' },
];

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="seg" role="group" aria-label={t('lang.label')}>
      {OPTIONS.map((o) => (
        <button key={o.id} type="button" lang={o.id} title={o.name} aria-label={o.name} aria-pressed={lang === o.id} className={lang === o.id ? 'on' : ''} onClick={() => setLang(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
