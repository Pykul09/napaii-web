import { useLayoutEffect, useRef, useState } from 'react';
import { Articles } from './components/Articles';
import { AdBanner, AdDouble, AdLeaderboard } from './components/AdSlot';
import { AuthModal } from './components/AuthModal';
import { BootLoader } from './components/BootLoader';
import { CommunityCta } from './components/CommunityCta';
import { ContactFab } from './components/ContactFab';
import { FeaturedTours } from './components/FeaturedTours';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { RouteLoader } from './components/RouteLoader';
import { TourPage } from './components/TourPage';
import { UpcomingDepartures } from './components/UpcomingDepartures';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { recalledHomeScroll, useTourRoute } from './hooks/useTourRoute';
import { useTheme } from './hooks/useTheme';
import { LanguageProvider } from './i18n';

export default function App() {
  const { theme, setTheme } = useTheme();
  const [ready, setReady] = useState(false);
  const tourId = useTourRoute();
  const wasTour = useRef(false);

  // เปลี่ยนหน้า: เข้าหน้าทัวร์ → เลื่อนขึ้นบน / กลับหน้าแรก → ไปหัวข้อที่กด หรือกลับตำแหน่งเดิม
  useLayoutEffect(() => {
    if (tourId) {
      window.scrollTo(0, 0);
    } else if (wasTour.current) {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) target.scrollIntoView();
      else window.scrollTo(0, recalledHomeScroll());
    }
    wasTour.current = tourId !== null;
  }, [tourId]);

  return (
    <LanguageProvider>
      <ToastProvider>
        <AuthProvider>
          <div className={`app${ready ? ' ready' : ''}`}>
            <BootLoader onDone={() => setReady(true)} />
            {/* loading ทุกครั้งที่เปลี่ยนหน้า (หน้าแรก ↔ หน้าทัวร์ / ทัวร์ → ทัวร์) */}
            <RouteLoader routeKey={tourId ?? 'home'} />
            <Navbar theme={theme} onThemeChange={setTheme} />
            {/* หน้าแรกคงไว้ใน DOM (แค่ซ่อน) เพื่อให้กลับมาแล้วคำค้นหา/ตำแหน่งเลื่อนยังอยู่ ไม่ต้องโหลดใหม่ */}
            <div hidden={tourId !== null}>
              <Hero />
              <main className="wrap" id="featured">
                <AdLeaderboard />
                <FeaturedTours />
                <CommunityCta />
                <UpcomingDepartures />
                <AdBanner />
                <Articles />
                <AdDouble />
              </main>
            </div>
            {tourId !== null && <TourPage key={tourId} id={tourId} />}
            <Footer />
            {/* ปุ่มติดต่อลอยมุมขวาล่าง (LINE QR + Call Center) — แทนโฆษณาลอยเดิม */}
            <ContactFab />
            <AuthModal />
          </div>
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  );
}
