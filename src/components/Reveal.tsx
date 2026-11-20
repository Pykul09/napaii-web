import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

interface RevealProps {
  as?: 'div' | 'section' | 'aside';
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
}

/** ห่อ element ให้ค่อย ๆ โผล่ขึ้นเมื่อเลื่อนมาถึง (IntersectionObserver) */
export function Reveal({ as = 'div', className = '', children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(as, { ref, className: `rv ${className}`.trim(), ...rest }, children);
}
