import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import { COMPANY } from '../data/company';
import { useI18n } from '../i18n';
import { LINE_OA_ID } from '../utils/line';
import { LineIcon } from './LineIcon';

/** ลิงก์เพิ่มเพื่อน LINE OA (สแกน QR หรือกดเปิดในมือถือ) */
const LINE_ADD_URL = LINE_OA_ID ? `https://line.me/R/ti/p/${encodeURIComponent(LINE_OA_ID)}` : '';

/**
 * ปุ่มติดต่อลอยมุมขวาล่าง (แทนโฆษณาลอยเดิม)
 * กดแล้วเปิดการ์ด: QR code เพิ่มเพื่อน LINE + ปุ่มเปิด LINE + ปุ่มโทร Call Center
 */
export function ContactFab() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // สร้าง QR จากลิงก์เพิ่มเพื่อน (สร้างครั้งเดียวตอนเปิดครั้งแรก)
  useEffect(() => {
    if (!open || qr || !LINE_ADD_URL) return;
    QRCode.toDataURL(LINE_ADD_URL, { width: 320, margin: 1, errorCorrectionLevel: 'H', color: { dark: '#111111', light: '#ffffff' } })
      .then(setQr)
      .catch(() => setQr(''));
  }, [open, qr]);

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
          {LINE_ADD_URL ? (
            qr ? <img src={qr} alt={t('contact.qrAlt')} width={160} height={160} /> : <span className="cfab-qr-wait" />
          ) : (
            <span className="cfab-qr-missing">{t('contact.qrMissing')}</span>
          )}
          <span className="cfab-qr-logo" aria-hidden="true">
            <LineIcon />
          </span>
        </div>
        <p className="cfab-scan">{t('contact.scan')}</p>
        {LINE_OA_ID && <p className="cfab-id">{LINE_OA_ID}</p>}

        <a
          className={`cfab-btn cfab-line${LINE_ADD_URL ? '' : ' disabled'}`}
          href={LINE_ADD_URL || undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!LINE_ADD_URL}
        >
          <LineIcon /> {t('contact.addLine')}
        </a>
        <a className="cfab-btn cfab-call" href={`tel:${COMPANY.phone.replace(/[^\d+]/g, '')}`}>
          📞 {t('contact.call')} · {COMPANY.phone}
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
