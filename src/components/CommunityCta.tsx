import { useCallback, useState } from 'react';
import { useI18n, type MessageKey } from '../i18n';
import { BookingDrawer, type TripRequest } from './BookingDrawer';
import { Reveal } from './Reveal';

const BENEFITS: MessageKey[] = ['cta.b1', 'cta.b2', 'cta.b3', 'cta.b4'];

const CHOICES: { kind: TripRequest; icon: string; title: MessageKey; desc: MessageKey }[] = [
  { kind: 'private', icon: '👨‍👩‍👧', title: 'cta.privateTitle', desc: 'cta.privateDesc' },
  { kind: 'group', icon: '👥', title: 'cta.groupTitle', desc: 'cta.groupDesc' },
];

/**
 * แบนเนอร์ "ให้เราออกแบบทริปส่วนตัวให้คุณ"
 * จุดเด่น 4 ข้อ + การ์ดเลือก "ทริปส่วนตัว" / "ทริปกลุ่ม" → เปิดแผงด้านข้างให้ติดต่อทาง LINE / Call Center
 */
export function CommunityCta() {
  const { t } = useI18n();
  const [request, setRequest] = useState<TripRequest | null>(null);
  const close = useCallback(() => setRequest(null), []);

  return (
    <Reveal as="section" className="cta" id="community">
      <div className="cta-text">
        <div className="ey">✨ {t('cta.eyebrow')}</div>
        <h2>{t('cta.title')}</h2>
        <p>{t('cta.body')}</p>
        <ul className="cta-benefits">
          {BENEFITS.map((k) => (
            <li key={k}>
              <span aria-hidden="true">✓</span> {t(k)}
            </li>
          ))}
        </ul>
      </div>

      <div className="cta-choices">
        {CHOICES.map((c) => (
          <button key={c.kind} type="button" className={`cta-card cta-${c.kind}`} aria-haspopup="dialog" onClick={() => setRequest(c.kind)}>
            <span className="cta-ic" aria-hidden="true">
              {c.icon}
            </span>
            <span className="cta-card-txt">
              <b>{t(c.title)}</b>
              <small>{t(c.desc)}</small>
            </span>
            <span className="cta-go">
              {t('cta.quote')} <i aria-hidden="true">→</i>
            </span>
          </button>
        ))}
      </div>

      <BookingDrawer request={request ?? 'private'} open={request !== null} onClose={close} />
    </Reveal>
  );
}
