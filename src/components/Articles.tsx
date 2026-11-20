import { useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';
import { useI18n } from '../i18n';
import { fetchArticles } from '../services/tours';
import type { Article } from '../types';
import { cssVars } from '../utils/format';
import { Poster, toneStyle } from './Poster';
import { Reveal } from './Reveal';

export function Articles() {
  const toast = useToast();
  const { t, loc } = useI18n();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    let alive = true;
    fetchArticles().then((data) => alive && setArticles(data));
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
        <a className="va" href="#">
          {t('articles.more')}
        </a>
      </Reveal>
      <Reveal className="arts">
        {articles.map((a) => (
          <a
            key={a.id}
            className="art"
            href="#"
            style={toneStyle(a.variant)}
            onClick={(e) => {
              e.preventDefault();
              toast(t('toast.articleSoon'));
            }}
          >
            <div className="poster">
              <Poster variant={a.variant} />
              <span className="tag">{t(`cat.${a.category}`)}</span>
            </div>
            <div className="cb">
              <div className="dt">{t('article.read', { n: a.readMinutes })}</div>
              <h3>{loc(a.title)}</h3>
              <p>{loc(a.excerpt)}</p>
              <div className="by">
                <span>{loc(a.author)}</span>
                <b>{t('article.readLink')}</b>
              </div>
            </div>
          </a>
        ))}
      </Reveal>
    </>
  );
}
