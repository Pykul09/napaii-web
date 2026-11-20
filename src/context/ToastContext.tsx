import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

type ToastFn = (message: string) => void;

const ToastContext = createContext<ToastFn>(() => {});

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const toast = useCallback<ToastFn>((text) => {
    window.clearTimeout(timer.current);
    setMessage(text);
    setVisible(true);
    timer.current = window.setTimeout(() => setVisible(false), 2600);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className={`toast${visible ? ' show' : ''}`} role="status" aria-live="polite">
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = (): ToastFn => useContext(ToastContext);
