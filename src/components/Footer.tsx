import { useI18n } from '../i18n';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer>
      <span>{t('footer.copy')}</span>
      <span>
        {t('footer.about')} · {t('footer.help')} · {t('footer.privacy')} ·{' '}
        <a href="https://napaii.com" className="footlink">
        napaii.com
        </a>
      </span>
    </footer>
  );
}
