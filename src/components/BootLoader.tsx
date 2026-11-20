import { useEffect, useRef, useState } from 'react';

/** หน้า loading แรกเข้า: โลโก้กะพริบ + แถบความคืบหน้า แล้วเฟดออก */
export function BootLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    const timers: number[] = [];
    let value = 0;
    const interval = window.setInterval(() => {
      value = Math.min(100, value + Math.random() * 16 + 7);
      setProgress(value);
      if (value >= 100) {
        window.clearInterval(interval);
        timers.push(
          window.setTimeout(() => {
            setHidden(true);
            doneRef.current();
            timers.push(window.setTimeout(() => setGone(true), 600));
          }, 250),
        );
      }
    }, 120);
    return () => {
      window.clearInterval(interval);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  if (gone) return null;
  return (
    <div className={`boot${hidden ? ' done' : ''}`} aria-hidden={hidden}>
      <div className="bl">
        <b>
          Napaii<i>.</i>
        </b>
        <div>
          <i style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
