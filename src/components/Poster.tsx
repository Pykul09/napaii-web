import type { CSSProperties, ReactNode } from 'react';
import { cssVars } from '../utils/format';

/** โทนสีเทาของแต่ละลายโปสเตอร์ [เริ่ม, จบ] */
export const TONE: [string, string][] = [
  ['#d4d4d9', '#9a9aa1'],
  ['#cfcfd5', '#7d7d85'],
  ['#dcdce0', '#a8a8ae'],
  ['#c8c8ce', '#85858c'],
  ['#d9d9de', '#8b8b93'],
];

export const toneStyle = (variant: number, extra: Record<string, string | number> = {}): CSSProperties => {
  const [a, b] = TONE[variant % TONE.length];
  return cssVars({ '--a': a, '--b': b, ...extra });
};

const NODES: [number, number][] = [[70, 70], [180, 40], [300, 80], [120, 165], [250, 175], [340, 150]];

const ART: (() => ReactNode)[] = [
  () =>
    Array.from({ length: 24 }, (_, i) => (
      <rect key={i} x={30 + (i % 6) * 58} y={22 + Math.floor(i / 6) * 46} width="48" height="36" rx="9" fill="#fff" opacity={0.22 + ((i * 7) % 5) * 0.12} />
    )),
  () =>
    Array.from({ length: 7 }, (_, i) => (
      <circle key={i} cx="200" cy="250" r={36 + i * 32} fill="none" stroke="#fff" strokeWidth="3" opacity={0.7 - i * 0.09} />
    )),
  () => (
    <>
      <circle cx="120" cy="110" r="80" fill="#fff" opacity=".34" />
      <circle cx="235" cy="95" r="60" fill="#fff" opacity=".26" />
      <circle cx="300" cy="165" r="70" fill="#fff" opacity=".2" />
    </>
  ),
  () => (
    <>
      {NODES.map((n, i) => (
        <line key={`l${i}`} x1={n[0]} y1={n[1]} x2={NODES[(i + 2) % 6][0]} y2={NODES[(i + 2) % 6][1]} stroke="#fff" strokeWidth="2" opacity=".5" />
      ))}
      {NODES.map((n, i) => (
        <circle key={`c${i}`} cx={n[0]} cy={n[1]} r="11" fill="#fff" opacity=".85" />
      ))}
    </>
  ),
  () =>
    Array.from({ length: 15 }, (_, i) => {
      const h = 20 + ((i * 37) % 9) * 14;
      return <rect key={i} x={20 + i * 25} y={190 - h} width="14" height={h} rx="7" fill="#fff" opacity=".55" />;
    }),
];

export function Poster({ variant }: { variant: number }) {
  return (
    <svg viewBox="0 0 400 190" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {ART[variant % ART.length]()}
    </svg>
  );
}
