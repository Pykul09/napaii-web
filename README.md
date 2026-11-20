# Napaii — Tours & Travel Packages

เว็บไซต์: **https://napaigun.com**

เว็บขายทัวร์ท่องเที่ยว โทนเทาสไตล์ Apple รองรับ **ภาษาไทย / English**, ธีมสว่าง/มืด, loading, animation, พื้นที่โฆษณา, Upcoming Events, Articles และระบบ login (Apple / Google / Facebook / อีเมล)

สร้างด้วย Vite + React 18 + TypeScript

## เริ่มใช้งาน

ต้องติดตั้ง [Node.js](https://nodejs.org) 18 ขึ้นไปก่อน

```bash
npm install
npm run dev        # เปิด http://localhost:5173
npm run build      # typecheck + build ไปที่ dist/
npm run preview    # ลองรันไฟล์ที่ build แล้ว
```

## ระบบสองภาษา (Localization)

ไม่ใช้ไลบรารีเพิ่ม — ทั้งหมดอยู่ใน `src/i18n/`

| ไฟล์ | หน้าที่ |
| --- | --- |
| `en.ts` | พจนานุกรมอังกฤษ (กำหนดคีย์ทั้งหมด) |
| `th.ts` | พจนานุกรมไทย — type บังคับให้มีคีย์ตรงกับ `en.ts` ถ้าขาดหรือเกิน `npm run typecheck` จะ error |
| `index.tsx` | `LanguageProvider` + `useI18n()` |

```tsx
const { t, loc, dateTime, price, lang, setLang } = useI18n();
t('hero.cta');                      // ข้อความตามภาษาปัจจุบัน
t('tour.booked', { n: 46 });        // "46 booked" / "จองแล้ว 46 คน"
loc(tour.title);                    // เนื้อหาจากข้อมูลสองภาษา { en, th }
dateRange('2026-12-18', 6);         // "Dec 18 – 23, 2026" / "18–23 ธ.ค. 2569"
price(0);                           // "Free" / "ฟรี"
```

- ภาษาเริ่มต้นดูจากเบราว์เซอร์ (`th*` → ไทย ที่เหลือ → อังกฤษ) และจำค่าที่ผู้ใช้เลือกไว้ใน localStorage (`napaii_lang`)
- เปลี่ยนภาษาแล้วอัปเดต `<html lang>`, `<title>` และ meta description อัตโนมัติ
- วันที่และเวลาใช้ `Intl.DateTimeFormat` เขตเวลา Asia/Bangkok จึงเก็บข้อมูลเป็น ISO 8601 ได้เลย
- ข้อมูลจาก backend (ชื่อทัวร์ เส้นทาง บทความ) ใช้รูปแบบ `{ en: '...', th: '...' }` ตาม type `Localized`
- ข้อความ error ของ login ส่งเป็นรหัส (`AuthError`) แล้วแปลที่ UI จึงเปลี่ยนภาษาได้ทันที

### เพิ่มข้อความใหม่
1. เพิ่มคีย์ใน `en.ts`
2. เพิ่มคีย์เดียวกันใน `th.ts`
3. เรียก `t('คีย์ใหม่')`

### เพิ่มภาษาใหม่ (เช่น จีน ญี่ปุ่น)
1. เพิ่มรหัสภาษาใน `Lang` (`src/types.ts`) เช่น `'zh'`
2. สร้าง `src/i18n/zh.ts` (type `Messages`) แล้วเพิ่มใน `DICTIONARIES` และ `LOCALES` (`index.tsx`)
3. เพิ่มปุ่มใน `components/LanguageSwitcher.tsx`
4. ข้อมูลที่เป็น `Localized` ต้องเติมภาษาใหม่ด้วย (type จะแจ้งเตือนจุดที่ขาด)

## โครงสร้าง

```
src/
  main.tsx              จุดเริ่มต้น + import CSS
  App.tsx               ประกอบหน้า + providers (Language > Toast > Auth)
  types.ts              type กลาง
  i18n/                 en.ts, th.ts, index.tsx
  components/           Navbar, Hero, FeaturedTours (+ตัวกรองประเทศ), UpcomingDepartures,
                        Articles, TourCard, TourPage, TourHero, AdSlot, CommunityCta, Footer, AuthModal,
                        ProfileMenu, ThemeToggle, LanguageSwitcher, BootLoader, Reveal, Poster
  context/              AuthContext, ToastContext
  hooks/                useTheme, useReminders
  services/             auth.ts, tours.ts, storage.ts   (เปลี่ยนเป็น API จริงที่นี่)
  data/tours.ts         ข้อมูลทัวร์/ประเทศ/บทความตัวอย่างสองภาษา
  styles/               tokens.css (สี/ธีม), base.css, sections.css, auth.css
```

## สิ่งที่ต้องทำเมื่อใช้งานจริง

### 1) ระบบ login จริง
`src/services/auth.ts` ตอนนี้เป็นเวอร์ชันสาธิต: บัญชีอีเมลเก็บใน localStorage และปุ่ม Apple/Google/Facebook ล็อกอินเป็น "Demo User" **ห้ามใช้กับผู้ใช้จริง**

เขียน class ใหม่ที่ `implements AuthService` แล้วสลับ `authService` (ให้ throw `AuthError` ด้วยรหัสเดิมเพื่อให้ข้อความแปลทำงานต่อ)

- **Social login:** ต้องมี Client ID / Secret และทำ OAuth 2.0 / OpenID Connect ฝั่ง backend
  - Google: Google Cloud Console → OAuth consent screen + credentials
  - Facebook: Meta for Developers → Facebook Login
  - Apple: Apple Developer → Sign in with Apple
  - ตั้ง redirect URI เป็นโดเมน `https://napaigun.com/...`
- หรือใช้บริการสำเร็จรูป เช่น Firebase Auth, Supabase Auth, Auth0, Clerk
- ใช้ session ผ่าน httpOnly cookie แทนการเก็บรหัสผ่านหรือ token ใน localStorage

### 2) ข้อมูลทัวร์จริง
แก้ `src/services/tours.ts` ให้เรียก API (ตั้ง `VITE_API_URL` ใน `.env` ดูตัวอย่างจาก `.env.example`)

### 3) โฆษณา
ทุก slot ใน `components/AdSlot.tsx` มี `data-ad-slot` ให้แทนด้วยโค้ดของระบบโฆษณา (เช่น Google Ad Manager)

### 4) รูปภาพ
โปสเตอร์เป็นลาย SVG ใน `components/Poster.tsx` เปลี่ยนเป็น `<img src>` รูปจริงได้ในจุดเดียว

### 5) ขึ้นโดเมน napaigun.com
- `npm run build` แล้วนำโฟลเดอร์ `dist/` ไปวางบนบริการโฮสต์ static เช่น Vercel, Netlify, Cloudflare Pages แล้วผูกโดเมน
- `index.html` ตั้ง canonical เป็น `https://napaigun.com/` แล้ว
- ถ้าต้องการให้ Google จัดทำดัชนีแยกตามภาษา ควรทำ URL แยก (เช่น `/th`, `/en`) ด้วย React Router และ `hreflang` ในขั้นถัดไป

## ไอเดียต่อยอด
- React Router: หน้ารายละเอียดทัวร์ บทความ โปรไฟล์ และ URL แยกตามภาษา
- TanStack Query สำหรับดึงข้อมูลและ cache
- Vitest + Testing Library

## ข้อมูลสมาชิกและข้อมูลส่วนบุคคล (PDPA)

ฟอร์มสมัครสมาชิกมี 2 ขั้นตอน: (1) ชื่อ อีเมล รหัสผ่าน (2) วันเกิด เบอร์โทร เพศ เลขบัตรประชาชน (ไม่บังคับ) พร้อมช่องยินยอมข้อกำหนดและการเก็บข้อมูลส่วนบุคคล

- **อายุ:** เก็บเป็นวันเกิดแล้วคำนวณอายุตอนแสดงผล (`calcAge`) ไม่ถามอายุซ้ำ อายุขั้นต่ำตั้งที่ `MIN_AGE` ใน `src/utils/validation.ts` (ค่าเริ่มต้น 13)
- **เบอร์โทร:** รับมือถือไทย (06/08/09) และเบอร์ต่างประเทศรูปแบบ `+รหัสประเทศ`
- **เลขบัตรประชาชน:** ตรวจรูปแบบ 13 หลักและ check digit ถ้ากรอก (`isValidThaiNationalId`)
- เวอร์ชันสาธิตเก็บเลขบัตรเพียง 4 หลักท้าย ใน localStorage ของเบราว์เซอร์

### เมื่อใช้งานจริง (สำคัญ)
- ส่งข้อมูลส่วนบุคคลไปที่ backend ผ่าน HTTPS เท่านั้น และ **ตรวจสอบซ้ำฝั่งเซิร์ฟเวอร์** (ห้ามเชื่อ validation ฝั่งหน้าเว็บอย่างเดียว)
- **เลขบัตรประชาชน:** เข้ารหัสก่อนเก็บ (เช่น AES-256 พร้อมจัดการคีย์ผ่าน KMS), จำกัดสิทธิ์การเข้าถึง, ไม่เขียนลง log, และเก็บเฉพาะเมื่อจำเป็น แนะนำให้ขอตอนจองอีเวนต์ที่ต้องใช้จริง (just-in-time) แทนการขอตอนสมัคร
- ตามพ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA) ควรมีนโยบายความเป็นส่วนตัวที่ระบุวัตถุประสงค์และระยะเวลาเก็บ, ให้ผู้ใช้ขอดู/แก้ไข/ลบข้อมูลได้ และบันทึกหลักฐานการให้ความยินยอม (เวลา + เวอร์ชันของนโยบาย)
- ผู้ใช้ที่ล็อกอินผ่าน Apple/Google/Facebook จะยังไม่มี `profile` ควรมีหน้าให้กรอกข้อมูลเพิ่มก่อนจองอีเวนต์
- ถ้าต้องยืนยันเบอร์โทร ให้ทำ OTP ผ่าน SMS ฝั่ง backend

## ทัวร์และตัวกรองประเทศ

ข้อมูลอยู่ที่ `src/data/tours.ts`

- **เพิ่ม/ลดประเทศ:** แก้รายการ `COUNTRIES` (แนะนำ 5–10 ประเทศ) และเพิ่มรหัสประเทศใน type `CountryCode` ที่ `src/types.ts` ปุ่มกรองบนหน้าแรกจะสร้างตามรายการนี้ พร้อมตัวเลขจำนวนทัวร์ และใช้ร่วมกับช่องค้นหาได้
- **เพิ่มทัวร์:** เพิ่มรายการใน `TOURS` โดยกำหนด `country` (รหัสประเทศ), `days`, `departures` (วันเดินทางแบบ `YYYY-MM-DD`), `price` (ต่อท่าน), `itinerary` (โปรแกรมรายวัน) ฯลฯ
- **รูปทัวร์:** ใส่ `images: ['/img/jp1-1.jpg', ...]` (3–4 ภาพ, วางไฟล์ใน `public/img/`) ถ้าไม่ใส่จะใช้ลายโปสเตอร์ SVG แทน

## หน้ารายละเอียดทัวร์

กดการ์ดใน **Featured Tours** จะไปที่ `#/tours/<id>` (เช่น `#/tours/jp1`) — router เบา ๆ อยู่ที่ `src/hooks/useTourRoute.ts`

- Hero รูปใหญ่สไลด์อัตโนมัติ + แถบรูปย่อ, โปรแกรมรายวัน, สิ่งที่รวมในแพ็กเกจ, เลือกวันเดินทางได้หลายรอบ
- Add to calendar: Google Calendar และไฟล์ `.ics` เป็นกิจกรรมทั้งวันตลอดช่วงทริป (`src/utils/calendar.ts`)
- Save tour: เก็บใน localStorage แยกตามผู้ใช้ (`napaii_saved_tours_<email>`) ต้องล็อกอินก่อน
- ปุ่ม Book this tour ยังเป็นตัวอย่าง ให้ต่อหน้าจอง/ชำระเงินที่ `onBook` ใน `src/components/TourPage.tsx` (ราคา วันเดินทางที่เลือก และข้อมูล `user.profile` พร้อมใช้)
- ราคา วันเดินทาง และโปรแกรมใน `tours.ts` เป็นข้อมูลตัวอย่างสำหรับทดสอบเท่านั้น
# napaii-web
