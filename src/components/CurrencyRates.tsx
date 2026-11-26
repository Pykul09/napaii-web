import { useEffect, useState } from 'react';
import { findCountry } from '../data/tours';
import { useI18n } from '../i18n';
import { CURRENCIES, RATES_SOURCE, fetchRates, type CurrencyInfo, type RateTable } from '../services/rates';
import { Reveal } from './Reveal';

const PRESETS = [1000, 5000, 10000, 50000];

const fmt = (n: number, digits: number): string =>
  n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** ตัวเลขอัตราต่อหน่วย: เลขน้อยมากให้ทศนิยมมากขึ้น (เช่น 1 ดอง = ฿0.0013) */
const fmtRate = (n: number): string =>
  n.toLocaleString('en-US', n < 1 ? { maximumSignificantDigits: 3 } : { minimumFractionDigits: n >= 1000 ? 0 : 2, maximumFractionDigits: n >= 1000 ? 0 : 2 });

/** อัตราแลกเปลี่ยน — ตัวแปลงเงิน + ตารางอัตราของทุกประเทศที่มีทัวร์ (วางก่อนส่วนบทความในหน้าแรก) */
export function CurrencyRates() {
  const { t, loc, dateTime } = useI18n();
  const [table, setTable] = useState<RateTable | null>(null);
  const [error, setError] = useState(false);
  const [cur, setCur] = useState<CurrencyInfo>(CURRENCIES[0]);
  const [amount, setAmount] = useState('10000');
  /** true = บาท → ต่างประเทศ, false = ต่างประเทศ → บาท */
  const [fromThb, setFromThb] = useState(true);

  const load = (force = false) => {
    setError(false);
    fetchRates(force)
      .then(setTable)
      .catch(() => setError(true));
  };
  useEffect(() => load(), []);

  const rate = table?.rates[cur.code];
  const value = Number(amount.replace(/,/g, '')) || 0;
  const result = rate ? (fromThb ? value * rate : value / rate) : 0;
  const flag = (c: CurrencyInfo) => findCountry(c.country).flag;
  const fromLabel = fromThb ? 'THB' : cur.code;
  const toLabel = fromThb ? cur.code : 'THB';
  const toSymbol = fromThb ? cur.symbol : '฿';
  const toDigits = fromThb ? cur.digits : 2;

  return (
    <>
      <Reveal className="sh" id="rates" style={{ marginTop: 56 }}>
        <div>
          <h2>{t('rates.title')}</h2>
          <p>{t('rates.sub')}</p>
        </div>
      </Reveal>

      <Reveal className="fx">
        <div className="fx-conv">
          <div className="chips fx-chips" role="radiogroup" aria-label={t('rates.pick')}>
            {CURRENCIES.map((c) => (
              <button key={c.code} type="button" role="radio" aria-checked={cur.code === c.code} className={`chip${cur.code === c.code ? ' on' : ''}`} onClick={() => setCur(c)}>
                <span aria-hidden="true">{flag(c)}</span> {c.code}
              </button>
            ))}
          </div>

          <div className="fx-row">
            <label className="fx-box">
              <small>{fromThb ? t('rates.thb') : `${loc(cur.name)} (${cur.code})`}</small>
              <span className="fx-in">
                <b aria-hidden="true">{fromThb ? '฿' : cur.symbol}</b>
                <input
                  inputMode="decimal"
                  value={amount}
                  aria-label={`${t('rates.amount')} (${fromLabel})`}
                  onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ''))}
                />
              </span>
            </label>
            <button type="button" className="fx-swap" aria-label={t('rates.swap')} title={t('rates.swap')} onClick={() => setFromThb((v) => !v)}>
              ⇄
            </button>
            <div className="fx-box out" aria-live="polite">
              <small>{fromThb ? `${loc(cur.name)} (${cur.code})` : t('rates.thb')}</small>
              <span className="fx-out">
                {error && !table ? '—' : !table ? <i className="fx-sk" /> : `${toSymbol} ${fmt(result, toDigits)}`}
              </span>
            </div>
          </div>

          <div className="fx-presets">
            {PRESETS.map((p) => (
              <button key={p} type="button" className={value === p ? 'on' : ''} onClick={() => setAmount(String(p))}>
                {fromThb ? '฿' : cur.symbol}
                {fmt(p, 0)}
              </button>
            ))}
          </div>

          <p className="fx-note">
            {rate && (
              <>
                <b>
                  1 {fromLabel} ≈ {fmtRate(fromThb ? rate : 1 / rate)} {toLabel}
                </b>
                {' · '}
              </>
            )}
            {table && t('rates.updated', { time: dateTime(new Date(table.updatedAt).toISOString()) })}
          </p>
        </div>

        <div className="fx-grid">
          {CURRENCIES.map((c) => {
            const r = table?.rates[c.code];
            return (
              <button key={c.code} type="button" className={`fx-tile${cur.code === c.code ? ' on' : ''}`} onClick={() => setCur(c)}>
                <span className="fx-th">
                  <span aria-hidden="true">{flag(c)}</span>
                  <b>{c.code}</b>
                  <small>{loc(c.name)}</small>
                </span>
                {r ? (
                  <>
                    <span className="fx-big">
                      {c.symbol} {fmtRate(r * 100)}
                      <small> / ฿100</small>
                    </span>
                    <small className="fx-inv">
                      1 {c.code} = ฿{fmtRate(1 / r)}
                    </small>
                  </>
                ) : (
                  <i className="fx-sk" />
                )}
              </button>
            );
          })}
        </div>
      </Reveal>

      {error && !table ? (
        <p className="fx-err">
          {t('rates.error')}{' '}
          <button type="button" onClick={() => load(true)}>
            {t('rates.retry')}
          </button>
        </p>
      ) : (
        <p className="fx-disc">
          {t('rates.disclaimer')}{' '}
          <a href={RATES_SOURCE.url} target="_blank" rel="noopener noreferrer">
            {t('rates.source', { name: RATES_SOURCE.name })}
          </a>
        </p>
      )}
    </>
  );
}
