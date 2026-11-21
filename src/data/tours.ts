import type { Article, Country, ItineraryDay, Localized, TourItem } from '../types';
import { SOON_GALLERY, SOON_PHOTOS, TOUR_GALLERY, TOUR_PHOTOS } from './photos';

// ข้อมูลตัวอย่าง (สองภาษา) — ในระบบจริงให้ดึงผ่าน src/services/tours.ts
// ราคา/วันเดินทาง/โปรแกรมเป็นตัวอย่างสำหรับทดสอบหน้าเว็บเท่านั้น

const L = (en: string, th: string): Localized => ({ en, th });
const D = (day: string, en: string, th: string): ItineraryDay => ({ day, text: L(en, th) });

/** ประเทศที่ใช้กรอง (ปรับเพิ่ม/ลดได้ 5–10 ประเทศ) */
export const COUNTRIES: Country[] = [
  { code: 'jp', flag: '🇯🇵', name: L('Japan', 'ญี่ปุ่น') },
  { code: 'kr', flag: '🇰🇷', name: L('South Korea', 'เกาหลีใต้') },
  { code: 'tw', flag: '🇹🇼', name: L('Taiwan', 'ไต้หวัน') },
  { code: 'vn', flag: '🇻🇳', name: L('Vietnam', 'เวียดนาม') },
  { code: 'cn', flag: '🇨🇳', name: L('China', 'จีน') },
  { code: 'sg', flag: '🇸🇬', name: L('Singapore', 'สิงคโปร์') },
  { code: 'id', flag: '🇮🇩', name: L('Indonesia', 'อินโดนีเซีย') },
  { code: 'ch', flag: '🇨🇭', name: L('Switzerland', 'สวิตเซอร์แลนด์') },
  { code: 'it', flag: '🇮🇹', name: L('Italy', 'อิตาลี') },
];

const TOUR_DATA: TourItem[] = [
  {
    id: 'jp1', hot: true, code: 'JP001', country: 'jp', category: 'culture', days: 6, price: 59900, seatsLeft: 8, booked: 46, attendees: ['AM', 'PK', '+12'], variant: 0,
    departures: ['2026-12-18', '2027-01-22', '2027-02-26'],
    title: L('Tokyo · Kyoto · Osaka Classic', 'โตเกียว เกียวโต โอซาก้า สุดคลาสสิก'),
    route: L('Tokyo – Hakone – Kyoto – Osaka', 'โตเกียว – ฮาโกเน่ – เกียวโต – โอซาก้า'),
    keywords: 'japan tokyo kyoto osaka fuji ญี่ปุ่น โตเกียว เกียวโต โอซาก้า ฟูจิ',
    description: L(
      "Six days across Japan's greatest hits: neon Tokyo, Mt. Fuji views from Hakone, Kyoto's temples and Osaka street food, with a Thai-speaking guide throughout.",
      'หกวันกับไฮไลต์ที่สุดของญี่ปุ่น ตั้งแต่โตเกียวยามค่ำ วิวภูเขาไฟฟูจิที่ฮาโกเน่ วัดสวยในเกียวโต ไปจนถึงสตรีทฟู้ดโอซาก้า พร้อมไกด์ภาษาไทยตลอดทริป',
    ),
    highlights: [
      L('Shinkansen bullet train Tokyo to Kyoto', 'นั่งรถไฟชินคันเซ็นจากโตเกียวไปเกียวโต'),
      L('Fushimi Inari and Kiyomizu-dera', 'ศาลเจ้าฟูชิมิอินาริและวัดคิโยมิสึ'),
      L('Osaka street-food night', 'ชิมสตรีทฟู้ดยามค่ำที่โอซาก้า'),
    ],
    itinerary: [
      D('1', 'Fly Bangkok to Tokyo, check in and evening stroll in Shinjuku.', 'เดินทางจากกรุงเทพฯ ไปโตเกียว เช็กอินและเดินเล่นยามค่ำที่ชินจูกุ'),
      D('2', 'Asakusa, Tokyo Skytree, Shibuya crossing and Harajuku.', 'อาซากุสะ โตเกียวสกายทรี สี่แยกชิบูย่า และฮาราจุกุ'),
      D('3', 'Hakone: Lake Ashi cruise, ropeway and onsen stay.', 'ฮาโกเน่ ล่องเรือทะเลสาบอาชิ กระเช้าลอยฟ้า และพักออนเซ็น'),
      D('4', 'Shinkansen to Kyoto, Fushimi Inari, Gion district.', 'ชินคันเซ็นสู่เกียวโต ศาลเจ้าฟูชิมิอินาริ ย่านกิอง'),
      D('5', 'Nara deer park, then Osaka Dotonbori food walk.', 'สวนกวางนารา แล้วเดินชิมอาหารที่โดทงโบริ โอซาก้า'),
      D('6', 'Free shopping, then fly home from Osaka.', 'ช้อปปิ้งอิสระ แล้วบินกลับจากโอซาก้า'),
    ],
  },
  {
    id: 'jp2', code: 'JP002', country: 'jp', category: 'nature', days: 5, price: 49900, seatsLeft: 0, booked: 31, attendees: ['NT', 'KL', '+7'], variant: 2,
    departures: ['2027-01-15', '2027-02-05', '2027-02-19'],
    title: L('Hokkaido Winter Wonderland', 'ฮอกไกโด ดินแดนหิมะ'),
    route: L('Sapporo – Otaru – Furano', 'ซัปโปโร – โอตารุ – ฟุราโนะ'),
    keywords: 'japan hokkaido snow winter sapporo otaru ญี่ปุ่น ฮอกไกโด หิมะ ซัปโปโร',
    description: L(
      'Snow, hot springs and fresh seafood. Walk the lantern-lit Otaru canal, play in the snow in Furano and warm up in a mountain onsen.',
      'หิมะ ออนเซ็น และอาหารทะเลสด เดินชมคลองโอตารุยามค่ำ เล่นหิมะที่ฟุราโนะ และแช่ออนเซ็นกลางหุบเขา',
    ),
    highlights: [
      L('Otaru canal by lantern light', 'คลองโอตารุยามค่ำคืน'),
      L('Furano snow activities', 'กิจกรรมหิมะที่ฟุราโนะ'),
      L('Seafood market breakfast', 'อาหารเช้าที่ตลาดอาหารทะเล'),
    ],
    itinerary: [
      D('1', 'Fly to Sapporo and evening ramen on Susukino street.', 'บินสู่ซัปโปโร ชิมราเมนยามค่ำที่ย่านซูซูกิโนะ'),
      D('2', 'Otaru: glass workshops, music-box museum and canal walk.', 'โอตารุ เวิร์กช็อปแก้ว พิพิธภัณฑ์กล่องดนตรี และเดินริมคลอง'),
      D('3', 'Furano and Biei: snow fields, Blue Pond and winter activities.', 'ฟุราโนะและบิเอะ ทุ่งหิมะ บ่อน้ำสีฟ้า และกิจกรรมฤดูหนาว'),
      D('4', 'Sapporo city, Odori Park and Clock Tower, onsen night.', 'ซัปโปโร สวนโอโดริ หอนาฬิกา และแช่ออนเซ็น'),
      D('5', 'Souvenir shopping at the airport and fly home.', 'ช้อปของฝากที่สนามบินและบินกลับ'),
    ],
  },
  {
    id: 'kr1', hot: true, code: 'KR001', country: 'kr', category: 'city', days: 5, price: 25900, seatsLeft: 12, booked: 64, attendees: ['TC', 'MK', '+9'], variant: 3,
    departures: ['2026-12-10', '2027-01-14', '2027-03-04'],
    title: L('Seoul Highlights & K-Culture', 'โซล ไฮไลต์และวัฒนธรรมเกาหลี'),
    route: L('Seoul – Nami Island', 'โซล – เกาะนามิ'),
    keywords: 'korea seoul nami hanbok kpop เกาหลี โซล นามิ ฮันบก',
    description: L(
      'The best of Seoul in five days: palaces in hanbok, Myeongdong street food, K-beauty shopping and a day trip to romantic Nami Island.',
      'สัมผัสโซลแบบครบรส ห้าวันกับวังหลวงในชุดฮันบก สตรีทฟู้ดเมียงดง ช้อปเครื่องสำอางเกาหลี และเที่ยวเกาะนามิแสนโรแมนติก',
    ),
    highlights: [
      L('Wear hanbok at Gyeongbokgung Palace', 'ใส่ชุดฮันบกเที่ยวพระราชวังเคียงบกกุง'),
      L('Nami Island day trip', 'ทริปวันเดียวเกาะนามิ'),
      L('Myeongdong and Hongdae free time', 'ช้อปปิ้งอิสระเมียงดงและฮงแด'),
    ],
    itinerary: [
      D('1', 'Fly to Seoul, Han River evening walk.', 'บินสู่โซล เดินเล่นริมแม่น้ำฮัน'),
      D('2', 'Gyeongbokgung Palace in hanbok, Bukchon Hanok Village.', 'พระราชวังเคียงบกกุงในชุดฮันบก หมู่บ้านฮานอกบุกชอน'),
      D('3', 'Nami Island and Petite France.', 'เกาะนามิและหมู่บ้านเปอตี ฟรองซ์'),
      D('4', 'N Seoul Tower, K-beauty and Myeongdong street food.', 'หอคอยเอ็นโซล ช้อปเครื่องสำอางและสตรีทฟู้ดเมียงดง'),
      D('5', 'Free time and fly home.', 'อิสระช้อปปิ้งและเดินทางกลับ'),
    ],
  },
  {
    id: 'kr2', code: 'KR002', country: 'kr', category: 'nature', days: 4, price: 19900, seatsLeft: 10, booked: 38, attendees: ['RS', 'LN', '+6'], variant: 4,
    departures: ['2026-12-27', '2027-02-12'],
    title: L('Jeju Island Escape', 'เกาะเชจู พักผ่อนสบาย ๆ'),
    route: L('Jeju', 'เชจู'),
    keywords: 'korea jeju island hallasan เกาหลี เชจู ฮันลา',
    description: L(
      "Korea's volcanic island of coastal cliffs, tangerine farms and lava tubes. Slow-paced days with plenty of photo stops.",
      'เกาะภูเขาไฟแห่งเกาหลี ชายฝั่งหน้าผา สวนส้มแมนดาริน และถ้ำลาวา โปรแกรมไม่เร่งรีบ มีจุดถ่ายรูปเยอะ',
    ),
    highlights: [
      L('Seongsan Ilchulbong sunrise peak', 'ยอดเขาซองซานอิลชุลบงชมพระอาทิตย์ขึ้น'),
      L('Manjanggul lava tube', 'ถ้ำลาวามันจังกึล'),
      L('Tangerine picking', 'เก็บส้มเชจูสด ๆ'),
    ],
    itinerary: [
      D('1', 'Fly to Jeju, Dongmun Market evening.', 'บินสู่เชจู เดินตลาดทงมุนยามค่ำ'),
      D('2', 'Seongsan Ilchulbong, Manjanggul and Udo Island.', 'ซองซานอิลชุลบง ถ้ำมันจังกึล และเกาะอูโด'),
      D('3', 'Hallasan foothills, tangerine farm and Jungmun coast.', 'เชิงเขาฮันลา สวนส้ม และชายฝั่งจุงมุน'),
      D('4', 'Shopping and fly home.', 'ช้อปปิ้งและเดินทางกลับ'),
    ],
  },
  {
    id: 'tw1', code: 'TW001', country: 'tw', category: 'food', days: 5, price: 22900, seatsLeft: 0, booked: 52, attendees: ['JW', 'PS', '+8'], variant: 1,
    departures: ['2026-12-04', '2027-01-08', '2027-02-20'],
    title: L('Taipei · Jiufen · Taichung Food Trail', 'ไทเป จิ่วเฟิ่น ไถจง สายกิน'),
    route: L('Taipei – Jiufen – Taichung', 'ไทเป – จิ่วเฟิ่น – ไถจง'),
    keywords: 'taiwan taipei jiufen taichung night market bubble tea ไต้หวัน ไทเป จิ่วเฟิ่น ไถจง ตลาดนัดกลางคืน',
    description: L(
      'Night markets, lantern-lit Jiufen and pearl milk tea at its birthplace. A five-day trail for people who plan their trip around meals.',
      'ตลาดนัดกลางคืน จิ่วเฟิ่นยามค่ำ และชานมไข่มุกต้นตำรับ ห้าวันสำหรับคนที่วางแผนเที่ยวตามมื้ออาหาร',
    ),
    highlights: [
      L('Shilin and Raohe night markets', 'ตลาดกลางคืนซื่อหลินและเหราเหอ'),
      L('Jiufen old street at dusk', 'ถนนเก่าจิ่วเฟิ่นยามพลบค่ำ'),
      L('Rainbow Village in Taichung', 'หมู่บ้านสายรุ้งที่ไถจง'),
    ],
    itinerary: [
      D('1', 'Fly to Taipei, Ningxia night market.', 'บินสู่ไทเป ตลาดกลางคืนหนิงเซี่ย'),
      D('2', 'Taipei 101, Din Tai Fung lunch, Shilin night market.', 'ไทเป 101 มื้อกลางวันติ่นไถ่ฟง และตลาดซื่อหลิน'),
      D('3', 'Yehliu Geopark, Shifen lanterns and Jiufen.', 'อุทยานเย่หลิ่ว ปล่อยโคมที่สือเฟิ่น และจิ่วเฟิ่น'),
      D('4', 'High-speed rail to Taichung, Rainbow Village, Fengjia market.', 'รถไฟความเร็วสูงสู่ไถจง หมู่บ้านสายรุ้ง ตลาดฟงเจีย'),
      D('5', 'Pineapple cake shopping and fly home.', 'ช้อปขนมพายสับปะรดและเดินทางกลับ'),
    ],
  },
  {
    id: 'vn1', code: 'VN001', country: 'vn', category: 'nature', days: 4, price: 15900, seatsLeft: 16, booked: 29, attendees: ['DN', 'BH', '+5'], variant: 2,
    departures: ['2026-12-05', '2027-01-09', '2027-02-13'],
    title: L('Hanoi · Ha Long Bay · Ninh Binh', 'ฮานอย ฮาลอง นิญบิญ'),
    route: L('Hanoi – Ha Long Bay – Ninh Binh', 'ฮานอย – อ่าวฮาลอง – นิญบิญ'),
    keywords: 'vietnam hanoi ha long bay ninh binh cruise เวียดนาม ฮานอย ฮาลอง นิญบิญ ล่องเรือ',
    description: L(
      "Northern Vietnam's icons in four days: Hanoi's Old Quarter, an overnight cruise among limestone islands and boat rides through Ninh Binh's rice fields.",
      'ไฮไลต์เหนือเวียดนามใน 4 วัน ย่านเมืองเก่าฮานอย ล่องเรือค้างคืนท่ามกลางเกาะหินปูน และนั่งเรือชมทุ่งนาที่นิญบิญ',
    ),
    highlights: [
      L('Overnight Ha Long Bay cruise', 'ล่องเรือค้างคืนอ่าวฮาลอง'),
      L('Trang An boat ride', 'นั่งเรือล่องแม่น้ำจ่างอาน'),
      L('Hanoi egg coffee and street food', 'กาแฟไข่และสตรีทฟู้ดฮานอย'),
    ],
    itinerary: [
      D('1', 'Fly to Hanoi, Old Quarter walk and Hoan Kiem Lake.', 'บินสู่ฮานอย เดินย่านเมืองเก่าและทะเลสาบฮว่านเกี๋ยม'),
      D('2', 'Transfer to Ha Long Bay and board the overnight cruise.', 'เดินทางสู่อ่าวฮาลอง ขึ้นเรือค้างคืน'),
      D('3', 'Sunrise on the bay, then Ninh Binh and Trang An.', 'ชมพระอาทิตย์ขึ้นกลางอ่าว จากนั้นไปนิญบิญและจ่างอาน'),
      D('4', 'Back to Hanoi, shopping and fly home.', 'กลับฮานอย ช้อปปิ้งและเดินทางกลับ'),
    ],
  },
  {
    id: 'vn2', code: 'VN002', country: 'vn', category: 'beach', days: 4, price: 13900, seatsLeft: 18, booked: 44, attendees: ['SW', 'AP', '+10'], variant: 4,
    departures: ['2026-12-12', '2027-01-16', '2027-03-06'],
    title: L('Da Nang · Hoi An · Ba Na Hills', 'ดานัง ฮอยอัน บานาฮิลส์'),
    route: L('Da Nang – Hoi An – Ba Na Hills', 'ดานัง – ฮอยอัน – บานาฮิลส์'),
    keywords: 'vietnam da nang hoi an ba na hills golden bridge เวียดนาม ดานัง ฮอยอัน บานาฮิลส์ สะพานมือ',
    description: L(
      'Beach, old town and mountain in one short trip. Cross the Golden Bridge, float lanterns in Hoi An and relax on My Khe beach.',
      'ทะเล เมืองเก่า และภูเขา ครบในทริปสั้น ๆ เดินสะพานมือสีทอง ลอยโคมที่ฮอยอัน และพักผ่อนที่หาดหมี่เค',
    ),
    highlights: [
      L('Golden Bridge at Ba Na Hills', 'สะพานมือสีทองที่บานาฮิลส์'),
      L('Hoi An lantern night', 'ค่ำคืนโคมไฟฮอยอัน'),
      L('My Khe beach free time', 'เวลาอิสระที่หาดหมี่เค'),
    ],
    itinerary: [
      D('1', 'Fly to Da Nang, Dragon Bridge and seafood dinner.', 'บินสู่ดานัง สะพานมังกร และอาหารทะเลมื้อค่ำ'),
      D('2', 'Ba Na Hills, Golden Bridge and French Village.', 'บานาฮิลส์ สะพานมือสีทอง และหมู่บ้านฝรั่งเศส'),
      D('3', 'Hoi An old town, lantern boat and tailor shops.', 'เมืองเก่าฮอยอัน ลอยโคม และร้านตัดชุด'),
      D('4', 'My Khe beach and fly home.', 'หาดหมี่เคและเดินทางกลับ'),
    ],
  },
  {
    id: 'cn1', code: 'CN001', country: 'cn', category: 'adventure', days: 6, price: 29900, seatsLeft: 9, booked: 22, attendees: ['YL', 'HC', '+4'], variant: 3,
    departures: ['2027-01-07', '2027-03-11'],
    title: L('Chengdu Pandas & Jiuzhaigou', 'เฉิงตู แพนด้า และจิ่วจ้ายโกว'),
    route: L('Chengdu – Jiuzhaigou – Huanglong', 'เฉิงตู – จิ่วจ้ายโกว – หวงหลง'),
    keywords: 'china chengdu panda jiuzhaigou huanglong sichuan hotpot จีน เฉิงตู แพนด้า จิ่วจ้ายโกว เสฉวน หม้อไฟ',
    description: L(
      "See giant pandas up close, then head to Sichuan's turquoise lakes and terraced pools. Finish with a proper Sichuan hotpot dinner.",
      'ชมแพนด้ายักษ์ใกล้ชิด แล้วไปต่อที่ทะเลสาบสีฟ้าเทอร์ควอยซ์และสระน้ำขั้นบันไดแห่งเสฉวน ปิดท้ายด้วยหม้อไฟเสฉวนต้นตำรับ',
    ),
    highlights: [
      L('Chengdu Panda Research Base', 'ศูนย์วิจัยแพนด้ายักษ์เฉิงตู'),
      L('Jiuzhaigou Valley lakes', 'ทะเลสาบหุบเขาจิ่วจ้ายโกว'),
      L('Sichuan hotpot dinner', 'หม้อไฟเสฉวนมื้อค่ำ'),
    ],
    itinerary: [
      D('1', 'Fly to Chengdu, Jinli Ancient Street.', 'บินสู่เฉิงตู เดินถนนโบราณจิ่นหลี่'),
      D('2', 'Panda base in the morning, Kuanzhai Alley in the afternoon.', 'ชมแพนด้าตอนเช้า บ่ายเดินตรอกกว้างและแคบ'),
      D('3', 'Fly to Jiuzhaigou and settle in.', 'บินสู่จิ่วจ้ายโกวและเข้าที่พัก'),
      D('4', 'Jiuzhaigou Valley: Five Flower Lake and waterfalls.', 'หุบเขาจิ่วจ้ายโกว ทะเลสาบห้าบุปผาและน้ำตก'),
      D('5', 'Huanglong terraced pools, return to Chengdu.', 'สระน้ำขั้นบันไดหวงหลง กลับเฉิงตู'),
      D('6', 'Free time and fly home.', 'อิสระช้อปปิ้งและเดินทางกลับ'),
    ],
  },
  {
    id: 'sg1', code: 'SG001', country: 'sg', category: 'city', days: 3, price: 17900, seatsLeft: 14, booked: 58, attendees: ['EC', 'JT', '+11'], variant: 1,
    departures: ['2026-12-19', '2027-01-29', '2027-02-26'],
    title: L('Singapore Family Fun', 'สิงคโปร์ ทริปครอบครัวสนุกทั้งวัน'),
    route: L('Singapore – Sentosa', 'สิงคโปร์ – เซ็นโตซ่า'),
    keywords: 'singapore sentosa universal studios gardens by the bay family สิงคโปร์ เซ็นโตซ่า ยูนิเวอร์แซล ครอบครัว',
    description: L(
      'A compact trip for families: Universal Studios, Gardens by the Bay light show and the Night Safari, with easy transfers between each stop.',
      'ทริปสั้นเหมาะกับครอบครัว ยูนิเวอร์แซลสตูดิโอ โชว์แสงสีที่การ์เดนส์บายเดอะเบย์ และไนท์ซาฟารี เดินทางสะดวกทุกจุด',
    ),
    highlights: [
      L('Universal Studios Singapore', 'ยูนิเวอร์แซลสตูดิโอสิงคโปร์'),
      L('Gardens by the Bay light show', 'โชว์แสงสีที่การ์เดนส์บายเดอะเบย์'),
      L('Night Safari', 'ไนท์ซาฟารี'),
    ],
    itinerary: [
      D('1', 'Fly to Singapore, Merlion Park and Marina Bay.', 'บินสู่สิงคโปร์ สวนเมอร์ไลออนและมารีนาเบย์'),
      D('2', 'Sentosa: Universal Studios all day.', 'เซ็นโตซ่า เที่ยวยูนิเวอร์แซลสตูดิโอเต็มวัน'),
      D('3', 'Gardens by the Bay, Jewel Changi and fly home.', 'การ์เดนส์บายเดอะเบย์ จิวเวลชางงี และเดินทางกลับ'),
    ],
  },
  {
    id: 'id1', code: 'ID001', country: 'id', category: 'beach', days: 5, price: 21900, seatsLeft: 11, booked: 40, attendees: ['KA', 'MP', '+7'], variant: 2,
    departures: ['2026-12-23', '2027-01-20', '2027-02-10'],
    title: L('Bali Beaches & Temples', 'บาหลี ชายหาดและวัดศักดิ์สิทธิ์'),
    route: L('Ubud – Uluwatu – Seminyak', 'อูบุด – อูลูวาตู – เซมินยัค'),
    keywords: 'indonesia bali ubud uluwatu seminyak temple beach อินโดนีเซีย บาหลี อูบุด อูลูวาตู เซมินยัค',
    description: L(
      'Rice terraces in Ubud, the clifftop temple at Uluwatu with its sunset Kecak dance, and two free afternoons on the beach in Seminyak.',
      'นาขั้นบันไดที่อูบุด วัดบนหน้าผาอูลูวาตูพร้อมระบำเกอจักตอนพระอาทิตย์ตก และอิสระสองบ่ายริมหาดเซมินยัค',
    ),
    highlights: [
      L('Tegallalang rice terraces', 'นาขั้นบันไดเตกัลลาลัง'),
      L('Uluwatu Kecak fire dance', 'ระบำไฟเกอจักที่อูลูวาตู'),
      L('Seminyak beach free time', 'เวลาอิสระที่หาดเซมินยัค'),
    ],
    itinerary: [
      D('1', 'Fly to Bali and transfer to Ubud.', 'บินสู่บาหลีและเดินทางสู่อูบุด'),
      D('2', 'Monkey Forest, Tegallalang terraces and a swing over the jungle.', 'ป่าลิง นาขั้นบันได และชิงช้าเหนือป่า'),
      D('3', 'Tirta Empul holy spring, then to Uluwatu.', 'บ่อน้ำศักดิ์สิทธิ์ติร์ตาเอ็มปุล แล้วเดินทางสู่อูลูวาตู'),
      D('4', 'Uluwatu Temple and sunset Kecak dance, Jimbaran seafood dinner.', 'วัดอูลูวาตู ระบำเกอจักตอนอาทิตย์ตก และอาหารทะเลจิมบารัน'),
      D('5', 'Seminyak beach, shopping and fly home.', 'หาดเซมินยัค ช้อปปิ้ง และเดินทางกลับ'),
    ],
  },
  {
    id: 'ch1', code: 'CH001', country: 'ch', category: 'adventure', days: 8, price: 139900, seatsLeft: 0, booked: 18, attendees: ['VK', 'OP', '+3'], variant: 0,
    departures: ['2027-02-06', '2027-03-13'],
    title: L('Swiss Alps: Jungfrau & Lucerne', 'สวิตเซอร์แลนด์ จุงเฟรา และลูเซิร์น'),
    route: L('Zurich – Lucerne – Interlaken – Zermatt', 'ซูริค – ลูเซิร์น – อินเทอร์ลาเคน – เซอร์แมท'),
    keywords: 'switzerland swiss alps jungfrau lucerne zermatt matterhorn สวิตเซอร์แลนด์ สวิส จุงเฟรา ลูเซิร์น เซอร์แมท',
    description: L(
      "Eight days of snowy peaks and storybook villages. Ride the Jungfrau railway to the 'Top of Europe', stroll Lucerne's old bridge and see the Matterhorn at Zermatt.",
      'แปดวันกับยอดเขาหิมะและหมู่บ้านเหมือนในนิทาน นั่งรถไฟสู่ยอดจุงเฟราบนหลังคายุโรป เดินสะพานไม้เก่าลูเซิร์น และชมแมทเทอร์ฮอร์นที่เซอร์แมท',
    ),
    highlights: [
      L('Jungfraujoch, Top of Europe', 'ยอดจุงเฟรา หลังคาแห่งยุโรป'),
      L('Glacier Express scenic ride', 'นั่งรถไฟทิวทัศน์ Glacier Express'),
      L('Matterhorn views at Zermatt', 'ชมยอดแมทเทอร์ฮอร์นที่เซอร์แมท'),
    ],
    itinerary: [
      D('1', 'Fly overnight to Zurich.', 'บินข้ามคืนสู่ซูริค'),
      D('2', 'Zurich old town, Rhine Falls, then to Lucerne.', 'เมืองเก่าซูริค น้ำตกไรน์ แล้วต่อไปลูเซิร์น'),
      D('3', 'Lucerne: Chapel Bridge and Mt. Titlis snow day.', 'ลูเซิร์น สะพานชาเปล และเที่ยวหิมะภูเขาติตลิส'),
      D('4', 'Interlaken and Grindelwald village.', 'อินเทอร์ลาเคนและหมู่บ้านกรินเดลวัลด์'),
      D('5', 'Jungfraujoch by cog railway.', 'ขึ้นรถไฟรางฟันเฟืองสู่ยอดจุงเฟรา'),
      D('6-7', 'Scenic train to Zermatt, Gornergrat and Matterhorn views.', 'รถไฟทิวทัศน์สู่เซอร์แมท กอร์เนอร์กรัต และชมแมทเทอร์ฮอร์น'),
      D('8', 'Return to Zurich and fly home.', 'กลับซูริคและเดินทางกลับ'),
    ],
  },
  {
    id: 'it1', code: 'IT001', country: 'it', category: 'culture', days: 8, price: 99900, seatsLeft: 7, booked: 27, attendees: ['GB', 'FS', '+5'], variant: 3,
    departures: ['2027-02-27', '2027-03-27'],
    title: L('Italy: Rome · Florence · Venice', 'อิตาลี โรม ฟลอเรนซ์ เวนิส'),
    route: L('Rome – Florence – Venice', 'โรม – ฟลอเรนซ์ – เวนิส'),
    keywords: 'italy rome florence venice colosseum vatican gondola อิตาลี โรม ฟลอเรนซ์ เวนิส โคลอสเซียม วาติกัน',
    description: L(
      'Eight days through the cradle of the Renaissance: the Colosseum and Vatican, the art of Florence and a gondola ride in Venice, with pasta and gelato along the way.',
      'แปดวันท่องแหล่งกำเนิดยุคเรอเนซองส์ โคลอสเซียมและวาติกัน ศิลปะแห่งฟลอเรนซ์ และนั่งกอนโดลาที่เวนิส พร้อมพาสต้าและเจลาโตตลอดทาง',
    ),
    highlights: [
      L('Colosseum and Vatican Museums', 'โคลอสเซียมและพิพิธภัณฑ์วาติกัน'),
      L('Uffizi Gallery in Florence', 'หอศิลป์อุฟฟิซิที่ฟลอเรนซ์'),
      L('Gondola ride in Venice', 'นั่งกอนโดลาที่เวนิส'),
    ],
    itinerary: [
      D('1', 'Fly overnight to Rome.', 'บินข้ามคืนสู่โรม'),
      D('2-3', 'Rome: Colosseum, Roman Forum, Trevi Fountain and the Vatican.', 'โรม โคลอสเซียม โรมันฟอรัม น้ำพุเทรวี และวาติกัน'),
      D('4', 'Train to Florence, Duomo and Ponte Vecchio.', 'นั่งรถไฟสู่ฟลอเรนซ์ มหาวิหารดูโอโมและสะพานเวคคีโอ'),
      D('5', 'Uffizi Gallery and Tuscan countryside lunch.', 'หอศิลป์อุฟฟิซิและมื้อกลางวันกลางชนบททัสคานี'),
      D('6-7', 'Venice: St. Mark’s Square, Murano glass and a gondola ride.', 'เวนิส จัตุรัสเซนต์มาร์ก เกาะมูราโน่ และนั่งกอนโดลา'),
      D('8', 'Fly home from Venice.', 'เดินทางกลับจากเวนิส'),
    ],
  },
];

/**
 * ทัวร์ที่กำลังจะเปิดขาย (แสดงในส่วน Departing Soon) — ข้อมูลตัวอย่าง (mock)
 * แยกจากทัวร์ที่เปิดขายแล้ว: ยังไม่เปิดราคา (แสดง ฿XX,XXX) และยังจองไม่ได้
 * price = ราคาที่วางแผนไว้ (ใช้นับจำนวนหลักตอนซ่อนราคา) — พอเปิดขายให้เปลี่ยน status เป็น 'onsale' แล้วย้ายไป TOUR_DATA
 */
const SOON_DATA: TourItem[] = [
  {
    id: 'jp3', status: 'soon', code: 'JP101', country: 'jp', category: 'culture', days: 6, price: 54900, seatsLeft: 30, booked: 0, attendees: [], variant: 1,
    departures: ['2026-12-06', '2027-01-17', '2027-02-14'],
    title: L('Japan Alps: Shirakawa-go · Takayama · Kanazawa', 'เจแปนแอลป์ ชิราคาวาโกะ ทาคายาม่า คานาซาวะ'),
    route: L('Nagoya – Shirakawa-go – Takayama – Kanazawa', 'นาโกย่า – ชิราคาวาโกะ – ทาคายาม่า – คานาซาวะ'),
    keywords: 'japan alps shirakawa takayama kanazawa snow ญี่ปุ่น ชิราคาวาโกะ ทาคายาม่า คานาซาวะ หิมะ',
    description: L(
      'Thatched-roof farmhouses in the snow, old merchant streets in Takayama and the famous Kenrokuen garden in Kanazawa.',
      'บ้านหลังคาฟางท่ามกลางหิมะ ถนนเมืองเก่าทาคายาม่า และสวนเคนโรคุเอ็นชื่อดังที่คานาซาวะ',
    ),
    highlights: [
      L('Shirakawa-go UNESCO village', 'หมู่บ้านมรดกโลกชิราคาวาโกะ'),
      L('Takayama morning market', 'ตลาดเช้าทาคายาม่า'),
      L('Kenrokuen garden', 'สวนเคนโรคุเอ็น'),
    ],
    itinerary: [
      D('1', 'Fly Bangkok to Nagoya, check in.', 'บินกรุงเทพฯ – นาโกย่า เช็กอินที่พัก'),
      D('2', 'Shirakawa-go village and viewpoint.', 'หมู่บ้านชิราคาวาโกะ และจุดชมวิว'),
      D('3', 'Takayama old town and morning market.', 'เมืองเก่าทาคายาม่า และตลาดเช้า'),
      D('4-5', 'Kanazawa: Kenrokuen, Higashi Chaya district.', 'คานาซาวะ สวนเคนโรคุเอ็น ย่านฮิงาชิชายะ'),
      D('6', 'Fly home from Nagoya.', 'เดินทางกลับจากนาโกย่า'),
    ],
  },
  {
    id: 'kr3', status: 'soon', code: 'KR101', country: 'kr', category: 'city', days: 4, price: 18900, seatsLeft: 30, booked: 0, attendees: [], variant: 3,
    departures: ['2026-12-11', '2027-01-22', '2027-03-05'],
    title: L('Busan by the Sea', 'ปูซาน เมืองริมทะเล'),
    route: L('Busan – Gamcheon – Haeundae', 'ปูซาน – คัมชอน – แฮอุนแด'),
    keywords: 'korea busan gamcheon haeundae เกาหลี ปูซาน คัมชอน แฮอุนแด',
    description: L(
      'Colourful Gamcheon village, a temple on the rocks by the sea and Busan\'s glittering Gwangan Bridge at night.',
      'หมู่บ้านคัมชอนหลากสี วัดริมทะเลบนโขดหิน และสะพานกวางอันยามค่ำคืนของปูซาน',
    ),
    highlights: [
      L('Gamcheon Culture Village', 'หมู่บ้านวัฒนธรรมคัมชอน'),
      L('Haedong Yonggungsa seaside temple', 'วัดแฮดงยงกุงซาริมทะเล'),
      L('Night view of Gwangan Bridge', 'ชมวิวสะพานกวางอันยามค่ำ'),
    ],
    itinerary: [
      D('1', 'Fly Bangkok to Busan, Nampo-dong street food.', 'บินกรุงเทพฯ – ปูซาน ชิมสตรีทฟู้ดย่านนัมโพดง'),
      D('2', 'Gamcheon Culture Village and Jagalchi fish market.', 'หมู่บ้านคัมชอน และตลาดปลาจากัลชี'),
      D('3', 'Haedong Yonggungsa, Haeundae beach, Gwangalli at night.', 'วัดแฮดงยงกุงซา หาดแฮอุนแด และกวางอัลลียามค่ำ'),
      D('4', 'Fly home.', 'เดินทางกลับ'),
    ],
  },
  {
    id: 'vn3', status: 'soon', code: 'VN101', country: 'vn', category: 'nature', days: 4, price: 14900, seatsLeft: 30, booked: 0, attendees: [], variant: 0,
    departures: ['2026-12-15', '2027-01-29', '2027-04-09'],
    title: L('Sapa Rice Terraces & Fansipan', 'ซาปา นาขั้นบันได และยอดเขาฟานซิปัน'),
    route: L('Hanoi – Sapa – Fansipan', 'ฮานอย – ซาปา – ฟานซิปัน'),
    keywords: 'vietnam sapa fansipan rice terrace เวียดนาม ซาปา ฟานซิปัน นาขั้นบันได',
    description: L(
      'Cool mountain air, layered rice terraces and the cable car to Fansipan, the "Roof of Indochina".',
      'อากาศเย็นบนภูเขา นาขั้นบันไดสวยงาม และกระเช้าขึ้นยอดเขาฟานซิปัน หลังคาแห่งอินโดจีน',
    ),
    highlights: [
      L('Sapa rice terraces', 'นาขั้นบันไดซาปา'),
      L('Fansipan cable car', 'กระเช้าขึ้นยอดฟานซิปัน'),
      L('Hmong village walk', 'เดินเที่ยวหมู่บ้านชาวม้ง'),
    ],
    itinerary: [
      D('1', 'Fly Bangkok to Hanoi, transfer to Sapa.', 'บินกรุงเทพฯ – ฮานอย เดินทางต่อไปซาปา'),
      D('2', 'Fansipan cable car and Sapa town.', 'ขึ้นกระเช้าฟานซิปัน และเที่ยวเมืองซาปา'),
      D('3', 'Village walk through the rice terraces.', 'เดินชมหมู่บ้านและนาขั้นบันได'),
      D('4', 'Back to Hanoi and fly home.', 'กลับฮานอย และบินกลับ'),
    ],
  },
  {
    id: 'cn3', status: 'soon', code: 'CN101', country: 'cn', category: 'adventure', days: 6, price: 27900, seatsLeft: 30, booked: 0, attendees: [], variant: 4,
    departures: ['2026-12-20', '2027-02-05', '2027-03-19'],
    title: L('Zhangjiajie, Tianmen & Fenghuang', 'จางเจียเจี้ย เทียนเหมินซาน และเมืองโบราณเฟิ่งหวง'),
    route: L('Changsha – Zhangjiajie – Tianmen – Fenghuang', 'ฉางซา – จางเจียเจี้ย – เทียนเหมินซาน – เฟิ่งหวง'),
    keywords: 'china zhangjiajie tianmen fenghuang avatar จีน จางเจียเจี้ย เทียนเหมินซาน เฟิ่งหวง',
    description: L(
      'The towering sandstone pillars that inspired "Avatar", the Heaven\'s Gate on Tianmen Mountain and the riverside town of Fenghuang.',
      'เสาหินทรายสูงตระหง่านที่เป็นแรงบันดาลใจของภาพยนตร์ Avatar ประตูสวรรค์บนเขาเทียนเหมิน และเมืองโบราณริมน้ำเฟิ่งหวง',
    ),
    highlights: [
      L('Zhangjiajie National Forest Park', 'อุทยานแห่งชาติจางเจียเจี้ย'),
      L('Tianmen Mountain cable car', 'กระเช้าขึ้นเขาเทียนเหมิน'),
      L('Fenghuang ancient town at night', 'เมืองโบราณเฟิ่งหวงยามค่ำ'),
    ],
    itinerary: [
      D('1', 'Fly Bangkok to Changsha, transfer to Zhangjiajie.', 'บินกรุงเทพฯ – ฉางซา เดินทางต่อจางเจียเจี้ย'),
      D('2-3', 'Zhangjiajie Forest Park and the glass bridge.', 'อุทยานจางเจียเจี้ย และสะพานแก้ว'),
      D('4', 'Tianmen Mountain and Heaven\'s Gate.', 'เขาเทียนเหมิน และประตูสวรรค์'),
      D('5', 'Fenghuang ancient town.', 'เมืองโบราณเฟิ่งหวง'),
      D('6', 'Fly home from Changsha.', 'เดินทางกลับจากฉางซา'),
    ],
  },
  {
    id: 'it3', status: 'soon', code: 'IT101', country: 'it', category: 'beach', days: 7, price: 89900, seatsLeft: 30, booked: 0, attendees: [], variant: 2,
    departures: ['2027-01-10', '2027-03-12', '2027-05-14'],
    title: L('Amalfi Coast & Capri', 'ชายฝั่งอมาลฟี และเกาะคาปรี'),
    route: L('Rome – Naples – Positano – Capri', 'โรม – เนเปิลส์ – โพซิตาโน – คาปรี'),
    keywords: 'italy amalfi positano capri naples อิตาลี อมาลฟี โพซิตาโน คาปรี',
    description: L(
      'Pastel cliffside towns, lemon groves and a boat trip around Capri\'s famous rocks.',
      'เมืองสีพาสเทลบนหน้าผา สวนเลมอน และล่องเรือรอบโขดหินชื่อดังของเกาะคาปรี',
    ),
    highlights: [
      L('Positano cliffside village', 'หมู่บ้านโพซิตาโนบนหน้าผา'),
      L('Capri boat trip', 'ล่องเรือรอบเกาะคาปรี'),
      L('Pizza tasting in Naples', 'ชิมพิซซ่าต้นตำรับที่เนเปิลส์'),
    ],
    itinerary: [
      D('1-2', 'Fly to Rome, then train to Naples.', 'บินไปโรม แล้วนั่งรถไฟไปเนเปิลส์'),
      D('3-4', 'Amalfi Coast drive and Positano.', 'นั่งรถเลียบชายฝั่งอมาลฟี และโพซิตาโน'),
      D('5', 'Boat trip to Capri.', 'ล่องเรือไปเกาะคาปรี'),
      D('6-7', 'Back to Rome and fly home.', 'กลับโรม และบินกลับ'),
    ],
  },
  {
    id: 'ch3', status: 'soon', code: 'CH101', country: 'ch', category: 'nature', days: 7, price: 129900, seatsLeft: 30, booked: 0, attendees: [], variant: 3,
    departures: ['2027-01-24', '2027-02-21', '2027-06-11'],
    title: L('Zermatt & the Matterhorn', 'เซอร์แมท และยอดเขามัทเทอร์ฮอร์น'),
    route: L('Zurich – Zermatt – Gornergrat – Geneva', 'ซูริค – เซอร์แมท – กอร์เนอร์กราท – เจนีวา'),
    keywords: 'switzerland zermatt matterhorn gornergrat สวิส เซอร์แมท มัทเทอร์ฮอร์น',
    description: L(
      'A car-free mountain village beneath the Matterhorn and the cogwheel train up to Gornergrat for glacier views.',
      'หมู่บ้านบนภูเขาปลอดรถยนต์ใต้ยอดมัทเทอร์ฮอร์น และรถไฟฟันเฟืองขึ้นกอร์เนอร์กราทชมธารน้ำแข็ง',
    ),
    highlights: [
      L('Matterhorn views from Zermatt', 'ชมยอดมัทเทอร์ฮอร์นจากเซอร์แมท'),
      L('Gornergrat cogwheel railway', 'รถไฟฟันเฟืองกอร์เนอร์กราท'),
      L('Lake Geneva promenade', 'เดินเล่นริมทะเลสาบเจนีวา'),
    ],
    itinerary: [
      D('1-2', 'Fly to Zurich, train to Zermatt.', 'บินไปซูริค นั่งรถไฟไปเซอร์แมท'),
      D('3', 'Gornergrat railway and glacier views.', 'รถไฟขึ้นกอร์เนอร์กราท ชมธารน้ำแข็ง'),
      D('4-5', 'Zermatt village and Matterhorn viewpoints.', 'หมู่บ้านเซอร์แมท และจุดชมวิวมัทเทอร์ฮอร์น'),
      D('6-7', 'Geneva, then fly home.', 'เจนีวา แล้วบินกลับ'),
    ],
  },
];

/** ทัวร์ที่กำลังจะเปิดขาย (ผูกรูปแล้ว) */
export const SOON_TOURS: TourItem[] = SOON_DATA.map((t) => ({
  ...t,
  cover: t.cover ?? SOON_PHOTOS[t.id],
  gallery: t.gallery ?? SOON_GALLERY[t.id],
}));

/** ผูกรูปวิว (cover + gallery) เข้ากับทัวร์ตาม id */
export const TOURS: TourItem[] = TOUR_DATA.map((t) => ({
  ...t,
  cover: t.cover ?? TOUR_PHOTOS[t.id],
  gallery: t.gallery ?? TOUR_GALLERY[t.id],
}));

/**
 * บทความตัวอย่าง (mock) — เนื้อหาเพื่อทดสอบหน้าเว็บเท่านั้น
 * รูปปกใช้รูปจาก TOUR_PHOTOS / TOUR_GALLERY (เครดิตแสดงใน Footer แล้ว)
 */
export const ARTICLES: Article[] = [
  {
    id: 'a1', category: 'guide', readMinutes: 6, variant: 2, createdAt: '2026-11-18T09:30:00+07:00', views: 1284, tourId: 'jp1',
    cover: TOUR_GALLERY.jp1?.[2],
    title: L('First Time Abroad? A Calm Planning Guide', 'เที่ยวต่างประเทศครั้งแรก คู่มือเตรียมตัวฉบับใจเย็น'),
    excerpt: L(
      'From passports to power adapters — a simple checklist that keeps the stress low.',
      'ตั้งแต่พาสปอร์ตจนถึงปลั๊กแปลง เช็กลิสต์ง่าย ๆ ที่ช่วยให้เครียดน้อยลง',
    ),
    author: L('Mali S.', 'มะลิ ส.'),
    facts: [
      { icon: '🛂', label: L('Passport', 'พาสปอร์ต'), value: L('6+ months validity', 'อายุเหลือ 6 เดือนขึ้นไป') },
      { icon: '🔌', label: L('Power plug', 'ปลั๊กไฟ'), value: L('Universal adapter', 'ปลั๊กแปลงแบบ universal') },
      { icon: '💴', label: L('Cash to carry', 'เงินสดติดตัว'), value: L('About ฿5,000–10,000', 'ประมาณ 5,000–10,000 บาท') },
      { icon: '📱', label: L('Internet', 'อินเทอร์เน็ต'), value: L('eSIM or roaming pack', 'eSIM หรือแพ็กโรมมิ่ง') },
    ],
    tips: [
      L('Arrive at the airport 3 hours before an international flight.', 'ไปถึงสนามบินก่อนเวลาบินต่างประเทศ 3 ชั่วโมง'),
      L('Liquids in carry-on must be 100 ml or less per bottle.', 'ของเหลวในกระเป๋าถือต้องไม่เกินขวดละ 100 มล.'),
      L('Save your hotel address in the local language for taxi drivers.', 'เซฟที่อยู่โรงแรมเป็นภาษาท้องถิ่นไว้ให้คนขับแท็กซี่ดู'),
    ],
    body: [
      L('Check your passport first: most countries need at least 6 months of validity left on the day you arrive. Take a photo of the info page and keep it in your phone and email.', 'เช็กพาสปอร์ตก่อนเลย ส่วนใหญ่ต้องมีอายุเหลืออย่างน้อย 6 เดือนนับจากวันเดินทางถึง ถ่ายรูปหน้าข้อมูลเก็บไว้ทั้งในมือถือและอีเมล'),
      L('Pack a universal adapter, a small power bank and one change of clothes in your carry-on. If your checked bag is delayed, you can still enjoy the first day.', 'พกปลั๊กแปลงแบบ universal พาวเวอร์แบงก์ และเสื้อผ้าสำรอง 1 ชุดไว้ในกระเป๋าถือ ถ้ากระเป๋าโหลดมาช้า วันแรกก็ยังเที่ยวได้สบาย'),
      L('Exchange a little cash before you fly and use a travel card for the rest — you get better rates and less to worry about.', 'แลกเงินสดติดตัวไว้นิดหน่อยก่อนบิน ที่เหลือใช้บัตรท่องเที่ยว เรตดีกว่าและไม่ต้องพกเงินเยอะ'),
      L('Joining a group tour for your first trip means flights, hotels and transfers are handled, and a Thai-speaking leader is there when you need help.', 'ทริปแรกถ้าไปกับทัวร์กรุ๊ป ตั๋วเครื่องบิน โรงแรม และการเดินทางจะถูกจัดการให้หมด มีหัวหน้าทัวร์พูดไทยคอยช่วยตลอด'),
    ],
  },
  {
    id: 'a2', category: 'culture', readMinutes: 4, variant: 1, createdAt: '2026-11-12T19:15:00+07:00', views: 2671, tourId: 'jp1',
    cover: TOUR_GALLERY.jp1?.[0],
    title: L('Kyoto Beyond the Crowds: Quiet Temples Worth Waking Up For', 'เกียวโตแบบไม่แออัด วัดเงียบ ๆ ที่คุ้มค่าตื่นเช้า'),
    excerpt: L(
      'Skip the midday rush — where to go at sunrise for calm gardens and golden light.',
      'หลีกเลี่ยงช่วงคนเยอะ ไปที่ไหนตอนเช้าเพื่อสวนสงบ ๆ และแสงสีทอง',
    ),
    author: L('Ken T.', 'เคน ท.'),
    facts: [
      { icon: '🌅', label: L('Best time', 'เวลาที่ดีที่สุด'), value: L('Before 7:00 a.m.', 'ก่อน 7 โมงเช้า') },
      { icon: '🍁', label: L('Best season', 'ฤดูที่ดีที่สุด'), value: L('Nov (autumn) · Apr (sakura)', 'พ.ย. (ใบไม้แดง) · เม.ย. (ซากุระ)') },
      { icon: '🎟', label: L('Entry fee', 'ค่าเข้าชม'), value: L('Fushimi Inari is free', 'ฟูชิมิอินาริเข้าฟรี') },
      { icon: '👟', label: L('Walking', 'การเดิน'), value: L('2–3 hours, some stairs', '2–3 ชั่วโมง มีบันไดบ้าง') },
    ],
    tips: [
      L('Bring small coins for shrine offerings and omamori charms.', 'เตรียมเหรียญย่อยไว้ทำบุญและซื้อเครื่องรางโอมาโมริ'),
      L('Be quiet and do not block paths when taking photos.', 'รักษาความเงียบ และอย่ายืนขวางทางเวลาถ่ายรูป'),
      L('Wear comfortable shoes — the mountain trail is long.', 'ใส่รองเท้าที่เดินสบาย เพราะทางขึ้นเขาค่อนข้างยาว'),
    ],
    body: [
      L('Fushimi Inari is open 24 hours. Arrive before 7 a.m. and you can walk the famous torii tunnels with almost nobody around.', 'ศาลเจ้าฟูชิมิอินาริเปิด 24 ชั่วโมง ไปถึงก่อน 7 โมงเช้าจะได้เดินอุโมงค์เสาโทริอิแบบแทบไม่มีคน'),
      L('Keep walking past the first viewpoint. Crowds thin out after 20 minutes of climbing, and the path through the forest is the most peaceful part.', 'เดินเลยจุดชมวิวแรกขึ้นไปอีกนิด หลังเดินขึ้นเขาราว 20 นาทีคนจะน้อยลงมาก ช่วงทางเดินในป่าเงียบสงบที่สุด'),
      L('Finish with breakfast near Kyoto Station, then visit Kiyomizu-dera before the tour buses arrive around 10 a.m.', 'จบด้วยมื้อเช้าแถวสถานีเกียวโต แล้วไปวัดคิโยมิสึก่อนรถทัวร์มาถึงราว 10 โมง'),
    ],
  },
  {
    id: 'a3', category: 'tips', readMinutes: 5, variant: 4, createdAt: '2026-11-05T12:00:00+07:00', views: 3905, tourId: 'vn1',
    cover: TOUR_PHOTOS.vn1,
    title: L('Seven Ways to Save on Your Next Group Tour', '7 วิธีประหยัดเงินเวลาไปทัวร์กรุ๊ป'),
    excerpt: L(
      'Book early, travel off-peak and other simple tricks that make a real difference.',
      'จองเร็ว เที่ยวนอกช่วงพีก และเทคนิคง่าย ๆ ที่ช่วยได้จริง',
    ),
    author: L('Pim R.', 'พิมพ์ ร.'),
    facts: [
      { icon: '📅', label: L('Book ahead', 'จองล่วงหน้า'), value: L('2–3 months', '2–3 เดือน') },
      { icon: '🗓', label: L('Cheapest months', 'เดือนที่ถูกที่สุด'), value: L('Shoulder season', 'ช่วงไหล่ฤดู') },
      { icon: '🛏', label: L('Room type', 'ประเภทห้อง'), value: L('Twin share', 'พักห้องคู่') },
      { icon: '💳', label: L('Payment', 'การจ่ายเงิน'), value: L('No-fee travel card', 'บัตรท่องเที่ยวไม่มีค่าธรรมเนียม') },
    ],
    tips: [
      L('Compare what is included (meals, entry fees, tips) — not only the price.', 'เทียบสิ่งที่รวมในราคา (อาหาร ค่าเข้าชม ทิป) ไม่ใช่ดูแค่ราคา'),
      L('Ask about early-bird or group discounts for 4+ people.', 'สอบถามส่วนลดจองเร็ว หรือส่วนลดกลุ่ม 4 คนขึ้นไป'),
      L('Watch the countdown on tour pages for last seats.', 'ดูตัวนับถอยหลังบนหน้าทัวร์ เพื่อไม่พลาดที่นั่งสุดท้าย'),
    ],
    body: [
      L('1. Book 2–3 months ahead — early-bird seats are often the cheapest. 2. Travel in shoulder season, just before or after the holidays.', '1. จองล่วงหน้า 2–3 เดือน ที่นั่งช่วงแรกมักถูกที่สุด 2. เที่ยวช่วงไหล่ฤดู ก่อนหรือหลังวันหยุดยาว'),
      L('3. Choose twin share instead of a single room. 4. Pick tours that already include meals — eating out every meal adds up fast.', '3. เลือกพักห้องคู่แทนห้องเดี่ยว 4. เลือกทัวร์ที่รวมอาหารแล้ว เพราะกินข้าวนอกทุกมื้อค่าใช้จ่ายบานเร็วมาก'),
      L('5. Bring a refillable bottle. 6. Use a travel card with no foreign-transaction fees. 7. Follow tour pages for flash deals and countdown prices.', '5. พกขวดน้ำเติมได้ 6. ใช้บัตรที่ไม่คิดค่าธรรมเนียมต่างประเทศ 7. ติดตามเพจทัวร์ไว้ จะได้ไม่พลาดโปรไฟไหม้และราคาพิเศษช่วงนับถอยหลัง'),
    ],
  },
  {
    id: 'a4', category: 'food', readMinutes: 5, variant: 3, createdAt: '2026-10-28T20:45:00+07:00', views: 4520, tourId: 'tw1',
    cover: TOUR_GALLERY.tw1?.[1],
    title: L('Taipei Night Market Survival Guide', 'คู่มือตะลุยตลาดกลางคืนไทเป กินยังไงให้คุ้ม'),
    excerpt: L(
      'Pepper buns, oyster omelettes and bubble tea — what to eat first and how to skip the long queues.',
      'ซาลาเปาพริกไทย ไข่เจียวหอยนางรม ชานมไข่มุก กินอะไรก่อน และเลี่ยงคิวยาวยังไง',
    ),
    author: L('Nok P.', 'นก พ.'),
    facts: [
      { icon: '🕖', label: L('Opening hours', 'เวลาเปิด'), value: L('About 5 p.m. – midnight', 'ประมาณ 17:00 – เที่ยงคืน') },
      { icon: '💵', label: L('Budget', 'งบประมาณ'), value: L('About 300–500 TWD', 'ประมาณ 300–500 ดอลลาร์ไต้หวัน') },
      { icon: '🚇', label: L('Getting there', 'การเดินทาง'), value: L('MRT Songshan Station', 'MRT สถานีซงซาน') },
      { icon: '🥟', label: L('Must eat', 'ห้ามพลาด'), value: L('Pepper bun', 'ซาลาเปาพริกไทย') },
    ],
    tips: [
      L('Go on a weekday to avoid the biggest crowds.', 'ไปวันธรรมดาจะคนน้อยกว่าเสาร์-อาทิตย์'),
      L('Bring a small bag for trash — bins can be hard to find.', 'พกถุงเล็ก ๆ ไว้ใส่ขยะ เพราะถังขยะหายาก'),
      L('Point and smile works well — many stalls have picture menus.', 'ชี้แล้วยิ้มก็สั่งได้ หลายร้านมีเมนูรูปภาพ'),
    ],
    body: [
      L('Raohe Night Market is one long lane, so start at the temple gate end. The famous pepper bun stall is right at the entrance — queue there first.', 'ตลาดราวเหอเป็นถนนเส้นยาวเส้นเดียว เริ่มจากฝั่งประตูวัด ร้านซาลาเปาพริกไทยชื่อดังอยู่ตรงทางเข้าพอดี ต่อคิวร้านนี้ก่อนเลย'),
      L('Share small portions with friends so you can try more. Most stalls are cash only, so keep coins and small notes ready.', 'สั่งมาแบ่งกันกินทีละนิดจะได้ชิมได้หลายร้าน ร้านส่วนใหญ่รับแต่เงินสด เตรียมเหรียญและแบงก์ย่อยไว้'),
      L('Must-tries: oyster omelette, grilled squid, stinky tofu (be brave!) and a fresh bubble tea to finish.', 'ห้ามพลาด: ไข่เจียวหอยนางรม ปลาหมึกย่าง เต้าหู้เหม็น (ลองดูสักครั้ง!) และปิดท้ายด้วยชานมไข่มุก'),
    ],
  },
  {
    id: 'a5', category: 'nature', readMinutes: 7, variant: 0, createdAt: '2026-10-20T08:10:00+07:00', views: 1937, tourId: 'kr2',
    cover: TOUR_PHOTOS.kr2,
    title: L('Jeju in 4 Days: Volcanoes, Beaches and Tangerines', 'เชจู 4 วัน ภูเขาไฟ ชายหาด และส้มเชจู'),
    excerpt: L(
      'A relaxed route around Korea\'s island — sunrise at Seongsan, turquoise water at Hyeopjae and cosy cafés.',
      'เส้นทางเที่ยวเกาะเชจูแบบสบาย ๆ ดูพระอาทิตย์ขึ้นที่ซองซาน ทะเลสีฟ้าที่ฮยอบแจ และคาเฟ่น่ารัก',
    ),
    author: L('June K.', 'จูน ค.'),
    facts: [
      { icon: '🗓', label: L('Best season', 'ฤดูที่ดีที่สุด'), value: L('Apr–Jun · Sep–Nov', 'เม.ย.–มิ.ย. · ก.ย.–พ.ย.') },
      { icon: '🚗', label: L('Getting around', 'การเดินทาง'), value: L('Tour bus or rental car', 'รถทัวร์หรือเช่ารถ') },
      { icon: '🌅', label: L('Sunrise at Seongsan', 'พระอาทิตย์ขึ้นที่ซองซาน'), value: L('About 6:00–7:30 a.m.', 'ประมาณ 6:00–7:30 น.') },
      { icon: '🍊', label: L('Local taste', 'ของขึ้นชื่อ'), value: L('Hallabong tangerine', 'ส้มฮัลลาบง') },
    ],
    tips: [
      L('Check the latest visa and K-ETA rules for Thai passport holders before you fly.', 'เช็กเงื่อนไขวีซ่าและ K-ETA ล่าสุดสำหรับพาสปอร์ตไทยก่อนเดินทางทุกครั้ง'),
      L('Weather changes quickly — pack a light windbreaker.', 'อากาศเปลี่ยนเร็ว พกเสื้อกันลมบาง ๆ ไปด้วย'),
      L('Start early on Seongsan to finish before tour groups arrive.', 'ขึ้นซองซานแต่เช้าจะได้ลงมาก่อนกรุ๊ปทัวร์มาถึง'),
    ],
    body: [
      L('Day 1: land in Jeju City, visit Dongmun Market for fresh tangerines and grilled black pork for dinner.', 'วันที่ 1: ถึงเมืองเชจู แวะตลาดทงมุนซื้อส้มสด ๆ มื้อเย็นเป็นหมูดำย่าง'),
      L('Day 2: wake up early for sunrise at Seongsan Ilchulbong. The climb takes about 25 minutes and the crater view is worth it.', 'วันที่ 2: ตื่นเช้าไปดูพระอาทิตย์ขึ้นที่ซองซานอิลชุลบง เดินขึ้นราว 25 นาที วิวปากปล่องภูเขาไฟคุ้มมาก'),
      L('Day 3: west coast — Hyeopjae Beach and the green tea fields at O\'sulloc. Day 4: a gentle walk on Hallasan before flying home.', 'วันที่ 3: ฝั่งตะวันตก ชายหาดฮยอบแจ และไร่ชาเขียวโอซุลลอก วันที่ 4: เดินเล่นเบา ๆ ที่ภูเขาฮัลลาซานก่อนบินกลับ'),
    ],
  },
  {
    id: 'a6', category: 'adventure', readMinutes: 6, variant: 2, createdAt: '2026-10-11T16:20:00+07:00', views: 862, tourId: 'ch1',
    cover: TOUR_GALLERY.ch1?.[2],
    title: L('Packing for the Swiss Alps in Winter', 'จัดกระเป๋าไปเที่ยวเทือกเขาแอลป์สวิสหน้าหนาว'),
    excerpt: L(
      'Layers, grip and sunglasses — what Thai travellers really need at 3,000 metres.',
      'เสื้อหลายชั้น รองเท้ากันลื่น แว่นกันแดด ของที่คนไทยต้องมีเมื่อขึ้นไปสูง 3,000 เมตร',
    ),
    author: L('Beam W.', 'บีม ว.'),
    facts: [
      { icon: '🌡', label: L('Temperature at the top', 'อุณหภูมิบนยอดเขา'), value: L('About −10 to −5 °C', 'ประมาณ −10 ถึง −5 °C') },
      { icon: '🧥', label: L('Clothing', 'การแต่งกาย'), value: L('3 layers', 'แต่ง 3 ชั้น') },
      { icon: '🕶', label: L('Must have', 'ของที่ต้องมี'), value: L('Sunglasses & sunscreen', 'แว่นกันแดดและครีมกันแดด') },
      { icon: '🚞', label: L('Train to the top', 'รถไฟขึ้นยอดเขา'), value: L('About 2 h from Interlaken', 'ประมาณ 2 ชม. จากอินเทอร์ลาเคน') },
    ],
    tips: [
      L('Walk slowly and rest if you feel dizzy at high altitude.', 'เดินช้า ๆ ถ้ารู้สึกเวียนหัวบนที่สูงให้พักก่อน'),
      L('Phone batteries drain fast in the cold — keep a power bank warm in your pocket.', 'แบตมือถือหมดเร็วในที่หนาว เก็บพาวเวอร์แบงก์ไว้ในกระเป๋าเสื้อให้อุ่น'),
      L('Check the weather webcam before going up — views depend on clouds.', 'เช็กกล้องสภาพอากาศก่อนขึ้น เพราะวิวขึ้นกับเมฆ'),
    ],
    body: [
      L('Dress in three layers: a thermal base, a fleece and a windproof jacket. You can take layers off on the train and put them back on at the top.', 'แต่งตัว 3 ชั้น: ชุดฮีทเทคด้านใน ฟลีซตรงกลาง และแจ็กเก็ตกันลมด้านนอก ถอดได้ตอนอยู่บนรถไฟ แล้วใส่กลับตอนถึงยอดเขา'),
      L('Snow is bright — sunglasses and sunscreen are a must, even on cloudy days at Jungfraujoch.', 'หิมะสะท้อนแสงมาก แว่นกันแดดและครีมกันแดดต้องมี ถึงจะเป็นวันที่มีเมฆที่ยุงเฟราโยค'),
      L('Wear waterproof boots with good grip and walk slowly at altitude. Drink water often — the air is very dry up there.', 'ใส่รองเท้ากันน้ำพื้นกันลื่น เดินช้า ๆ บนที่สูง และจิบน้ำบ่อย ๆ เพราะอากาศข้างบนแห้งมาก'),
    ],
  },
];


export const findCountry = (code: string): Country => COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
