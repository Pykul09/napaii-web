import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useI18n } from '../i18n';
import { sleep } from '../utils/format';
import { Reveal } from './Reveal';

export function CommunityCta() {
  const toast = useToast();
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    setLoading(true);
    await sleep(1200);
    setLoading(false);
    toast(t('toast.hostSoon'));
  };

  return (
    <Reveal as="section" className="cta" id="community">
      <div>
        <div className="ey">{t('cta.eyebrow')}</div>
        <h2>{t('cta.title')}</h2>
        <p>{t('cta.body')}</p>
      </div>
      <button type="button" className="btn" disabled={loading} onClick={onCreate}>
        {loading ? (
          <>
            <i className="sp" /> {t('cta.loading')}
          </>
        ) : (
          t('cta.button')
        )}
      </button>
    </Reveal>
  );
}
