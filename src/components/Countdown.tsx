import { useNow } from '../hooks/useNow';
import { useI18n } from '../i18n';
import { bookingClosesAt } from '../utils/calendar';

/** แสดงตัวนับถอยหลังเมื่อเหลือไม่เกินกี่วัน */
const SHOW_WITHIN_DAYS = 30;
/** เหลือไม่เกินกี่วันถึงจะเป็นสีแดง (ด่วน) */
const URGENT_DAYS = 7;

const DAY = 86_400_000;
const pad = (n: number) => String(n).padStart(2, '0');

/** ป้ายนับถอยหลังจนถึงวันปิดรับจอง (วันเดินทาง) — แยกเป็นคอมโพเนนต์เพื่อให้ re-render แค่ป้ายทุกวินาที */
interface Props {
  departure: string;
  /** แสดงเมื่อเหลือไม่เกินกี่วัน (ไม่ใส่ = 30 วัน, ใส่ Infinity = แสดงเสมอ) */
  withinDays?: number;
  className?: string;
}

export function Countdown({ departure, withinDays = SHOW_WITHIN_DAYS, className = '' }: Props) {
  const { t } = useI18n();
  const left = bookingClosesAt(departure) - useNow();
  if (left <= 0 || left > withinDays * DAY) return null;

  const d = Math.floor(left / DAY);
  const h = Math.floor((left % DAY) / 3_600_000);
  const m = Math.floor((left % 3_600_000) / 60_000);
  const s = Math.floor((left % 60_000) / 1000);
  const clock = `${pad(h)}:${pad(m)}:${pad(s)}`;
  const urgent = left <= URGENT_DAYS * DAY;

  return (
    <span className={`cd${urgent ? ' urgent' : ''}${className ? ` ${className}` : ''}`} role="timer" aria-label={t('tour.countdownAria', { d, time: clock })}>
      <span aria-hidden="true">⏳</span>
      <span className="cd-lbl">{t('tour.closesIn')}</span>
      <b>
        {d > 0 && <>{t('tour.countdownDays', { d })} </>}
        <span className="cd-clock">{clock}</span>
      </b>
    </span>
  );
}
