import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TOURS } from '../data/tours';
import { rememberHomeScroll, tourHref } from '../hooks/useTourRoute';
import { useI18n } from '../i18n';
import { articleViews, fetchArticles, recordArticleView } from '../services/tours';
import type { Article, TourItem } from '../types';
import { isSoldOut, nextDeparture } from '../utils/calendar';
import { cssVars } from '../utils/format';
import { BookingDrawer } from './BookingDrawer';
import { Poster, toneStyle } from './Poster';
import { PriceTag } from './TourCard';
import { Reveal } from './Reveal';

/** รูปย่อ 960px สำหรับการ์ด (รูปจาก Wikimedia เป็น URL thumbnail ที่เปลี่ยนขนาดได้) */
const small = (url: string): string => url.replace(/\/\d+px-/, '/960px-');

export function Articles() {
  const { t, loc, dateTime } = useI18n();
  const [articles, setArticles] = useState<Article[]>([]);
  const [reading, setReading] = useState<Article | null>(null);
  /** ยอดเข้าชมล่าสุดของแต่ละบทความ */
  const [views, setViews] = useState<Record<string, number>>({});
  const close = useCallback(() => setReading(null), []);

  const openArticle = (a: Article) => {
    setReading(a);
    recordArticleView(a).then((n) => setViews((v) => ({ ...v, [a.id]: n })));
  };

  useEffect(() => {
    let alive = true;
    fetchArticles().then((data) => {
      if (!alive) return;
      setArticles(data);
      setViews(Object.fromEntries(data.map((a) => [a.id, articleViews(a)])));
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Reveal className="sh" id="articles" style={cssVars({ marginTop: 56 })}>
        <div>
          <h2>{t('articles.title')}</h2>
          <p>{t('articles.sub')}</p>
        </div>
      </Reveal>
      <Reveal className="arts">
        {articles.map((a) => (
          <a
            key={a.id}
            className="art"
            href={`#article-${a.id}`}
            style={toneStyle(a.variant)}
            onClick={(e) => {
              e.preventDefault();
              openArticle(a);
            }}
          >
            <div className="poster">
              {a.cover ? <img className="poster-img" src={small(a.cover.src)} alt="" loading="lazy" decoding="async" /> : <Poster variant={a.variant} />}
            </div>
            <div className="cb">
              <div className="art-meta">
                {a.createdAt && (
                  <time dateTime={a.createdAt}>🕒 {dateTime(a.createdAt)}</time>
                )}
              </div>
              <h3>{loc(a.title)}</h3>
              <p>{loc(a.excerpt)}</p>
              <div className="by">
                <span className="art-views">👁 {t('article.views', { n: (views[a.id] ?? 0).toLocaleString() })}</span>
                <b>{t('article.readLink')}</b>
              </div>
            </div>
          </a>
        ))}
      </Reveal>
      <ArticleReader article={reading} views={reading ? views[reading.id] ?? 0 : 0} onClose={close} />
    </>
  );
}

/** Popup อ่านบทความเต็ม (ข้อมูล mock): เนื้อหา + เคล็ดลับ ด้านซ้าย / ข้อมูลสรุป + ทัวร์ที่เกี่ยวข้อง + ปุ่มจองทัวร์ ด้านขวา */
function ArticleReader({ article, views, onClose }: { article: Article | null; views: number; onClose: () => void }) {
  const { t, loc, dateTime, dateRange, price } = useI18n();
  const open = article !== null;
  const [bookOpen, setBookOpen] = useState(false);
  const closeBook = useCallback(() => setBookOpen(false), []);

  useEffect(() => {
    if (!open) {
      setBookOpen(false);
      return;
    }
    // Esc ปิดบทความ (ยกเว้นตอนแผงจองเปิดอยู่ — ให้แผงจองปิดก่อน)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && !document.querySelector('.bk-root.show') && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // สุ่มทัวร์ที่ยังจองได้ (ไม่เต็ม และมีรอบเดินทางเหลือ) ขึ้นมาแนะนำ — สุ่มใหม่ทุกครั้งที่เปิดบทความ
  const [tour, setTour] = useState<TourItem | undefined>(undefined);
  useEffect(() => {
    if (!article) return;
    const available = TOURS.filter((x) => !isSoldOut(x) && nextDeparture(x));
    setTour(available[Math.floor(Math.random() * available.length)]);
  }, [article]);

  if (!article) return null;
  const next = tour ? nextDeparture(tour) : null;
  const canBook = !!tour && !!next;

  return createPortal(
    <div className="overlay show ar-ov" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <article className="dlg ar-dlg" role="dialog" aria-modal="true" aria-labelledby="ar-title">
        <button type="button" className="x" aria-label={t('auth.close')} onClick={onClose}>
          ×
        </button>
        <div className="ar-cover" style={toneStyle(article.variant)}>
          {article.cover ? <img src={article.cover.src} alt="" /> : <Poster variant={article.variant} />}
          <div className="ar-cover-txt">
            <div className="art-meta">
              {article.createdAt && (
                <time dateTime={article.createdAt}>
                  🕒 {t('article.created')} {dateTime(article.createdAt)}
                </time>
              )}
              <span>👁 {t('article.views', { n: views.toLocaleString() })}</span>
            </div>
            <h2 id="ar-title">{loc(article.title)}</h2>
          </div>
        </div>

        <div className="ar-layout">
          {/* เนื้อหาบทความ */}
          <div className="ar-body">
            <p className="ar-lead">{loc(article.excerpt)}</p>
            {(article.body ?? []).map((para, i) => (
              <p key={i}>{loc(para)}</p>
            ))}

            {article.tips && article.tips.length > 0 && (
              <section className="ar-tips">
                <h3>💡 {t('article.tips')}</h3>
                <ul>
                  {article.tips.map((tip) => (
                    <li key={tip.en}>{loc(tip)}</li>
                  ))}
                </ul>
              </section>
            )}

            {article.cover && (
              <p className="ar-credit">
                Photo: {article.cover.author} · {article.cover.license} (Wikimedia Commons)
              </p>
            )}
          </div>

          {/* ด้านข้าง: ข้อมูลสรุป + ทัวร์ที่เกี่ยวข้อง */}
          <aside className="ar-side">
            {article.facts && article.facts.length > 0 && (
              <section className="ar-facts">
                <h3>{t('article.facts')}</h3>
                <dl>
                  {article.facts.map((f) => (
                    <div key={f.label.en}>
                      <dt>
                        <span aria-hidden="true">{f.icon}</span> {loc(f.label)}
                      </dt>
                      <dd>{loc(f.value)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {tour && (
              <section className="ar-trip">
                <small>{t('article.relatedTour')}</small>
                {tour.cover && <img src={small(tour.cover.src)} alt="" />}
                <b>{loc(tour.title)}</b>
                <ul>
                  <li>
                    🏷 {t('tour.code')} <code>{tour.code}</code>
                  </li>
                  <li>
                    ☀ {t('tour.days', { d: tour.days })} · ☾ {t('tour.nights', { n: tour.days - 1 })}
                  </li>
                  <li>⌖ {loc(tour.route)}</li>
                  {next && <li>📅 {dateRange(next, tour.days)}</li>}
                </ul>
                <div className="ar-trip-price">
                  <small>{t('tour.from')}</small>
                  <PriceTag text={price(tour.price)} />
                </div>
                <button type="button" className="btn ev-book ar-book" onClick={() => setBookOpen(true)} disabled={!canBook} aria-haspopup="dialog">
                  ✈ {t('article.bookTour')}
                </button>
                <a
                  className="btn ghost ar-view"
                  href={tourHref(tour.id)}
                  onClick={() => {
                    rememberHomeScroll();
                    onClose();
                  }}
                >
                  {t('article.viewTour')} ›
                </a>
              </section>
            )}
          </aside>
        </div>
      </article>
      {tour && next && <BookingDrawer tour={tour} departure={next} open={bookOpen} onClose={closeBook} />}
    </div>,
    document.body,
  );
}
