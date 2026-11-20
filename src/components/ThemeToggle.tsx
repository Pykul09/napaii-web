import { useI18n } from '../i18n';
import type { ThemeMode } from '../types';

interface Props {
  theme: ThemeMode;
  onChange: (theme: ThemeMode) => void;
}

export function ThemeToggle({ theme, onChange }: Props) {
  const { t } = useI18n();
  return (
    <div className="seg" role="group" aria-label={t('theme.label')}>
      <button type="button" className={theme === 'light' ? 'on' : ''} aria-pressed={theme === 'light'} aria-label={t('theme.light')} onClick={() => onChange('light')}>
        ☀
      </button>
      <button type="button" className={theme === 'dark' ? 'on' : ''} aria-pressed={theme === 'dark'} aria-label={t('theme.dark')} onClick={() => onChange('dark')}>
        ☾
      </button>
    </div>
  );
}
