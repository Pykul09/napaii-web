import { useEffect, useRef, useState } from 'react';
import { COMPANY } from '../data/company';
import { useI18n } from '../i18n';
import { LINE_ADD_FRIEND_URL, LINE_QR_IMAGE } from '../utils/line';
import { LineIcon } from './LineIcon';

/** ลิงก์เพิ่มเพื่อน LINE OA (สแกน QR หรือกดเปิดในมือถือ) */
const LINE_ADD_URL = LINE_ADD_FRIEND_URL;

/**
 * ปุ่มติดต่อลอยมุมขวาล่าง (แทนโฆษณาลอยเดิม)
 * กดแล้วเปิดการ์ด: QR code เพิ่มเพื่อน LINE (รูปทางการ) + ปุ่มเปิด LINE + โทร + อีเมล
 */
export function ContactFab() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // คลิกนอกการ์ด / กด Esc = ปิด
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`cfab${open ? ' open' : ''}`} ref={ref}>
      <div className="cfab-card" role="dialog" aria-label={t('contact.title')} aria-hidden={!open}>
        <div className="cfab-head">
          <b>{t('contact.title')}</b>
          <button type="button" className="cfab-x" aria-label={t('auth.close')} onClick={() => setOpen(false)}>
            ×
          </button>
        </div>

        <div className="cfab-qr">
          <img src={LINE_QR_IMAGE} alt={t('contact.qrAlt')} width={160} height={160} loading="lazy" />
        </div>
        <p className="cfab-scan">{t('contact.scan')}</p>

        <a className="cfab-btn cfab-line" href={LINE_ADD_URL} target="_blank" rel="noopener noreferrer">
          <LineIcon /> {t('contact.addLine')}
        </a>
        <a className="cfab-btn cfab-call" href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`}>
          📞 {t('contact.call')} · {COMPANY.phone}
        </a>
        <a className="cfab-btn cfab-call cfab-mail" href={`mailto:${COMPANY.email}`}>
          ✉️ {COMPANY.email}
        </a>
      </div>

      <button type="button" className="cfab-fab" aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen((o) => !o)}>
        {open ? (
          <span aria-hidden="true">×</span>
        ) : (
          <>
            <span className="cfab-fab-ic" aria-hidden="true">
              <LineIcon />
            </span>
            {t('contact.fab')}
          </>
        )}
      </button>
    </div>
  );
}
