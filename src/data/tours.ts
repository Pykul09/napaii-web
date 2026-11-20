import type { Article, Country, ItineraryDay, Localized, TourItem } from '../types';

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

export const TOURS: TourItem[] = [
  {
    id: 'jp1', country: 'jp', category: 'culture', days: 6, price: 59900, seatsLeft: 8, booked: 46, attendees: ['AM', 'PK', '+12'], variant: 0,
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
    id: 'jp2', country: 'jp', category: 'nature', days: 5, price: 49900, seatsLeft: 6, booked: 31, attendees: ['NT', 'KL', '+7'], variant: 2,
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
    id: 'kr1', country: 'kr', category: 'city', days: 5, price: 25900, seatsLeft: 12, booked: 64, attendees: ['TC', 'MK', '+9'], variant: 3,
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
    id: 'kr2', country: 'kr', category: 'nature', days: 4, price: 19900, seatsLeft: 10, booked: 38, attendees: ['RS', 'LN', '+6'], variant: 4,
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
    id: 'tw1', country: 'tw', category: 'food', days: 5, price: 22900, seatsLeft: 14, booked: 52, attendees: ['JW', 'PS', '+8'], variant: 1,
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
    id: 'vn1', country: 'vn', category: 'nature', days: 4, price: 15900, seatsLeft: 16, booked: 29, attendees: ['DN', 'BH', '+5'], variant: 2,
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
    id: 'vn2', country: 'vn', category: 'beach', days: 4, price: 13900, seatsLeft: 18, booked: 44, attendees: ['SW', 'AP', '+10'], variant: 4,
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
    id: 'cn1', country: 'cn', category: 'adventure', days: 6, price: 29900, seatsLeft: 9, booked: 22, attendees: ['YL', 'HC', '+4'], variant: 3,
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
    id: 'sg1', country: 'sg', category: 'city', days: 3, price: 17900, seatsLeft: 14, booked: 58, attendees: ['EC', 'JT', '+11'], variant: 1,
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
    id: 'id1', country: 'id', category: 'beach', days: 5, price: 21900, seatsLeft: 11, booked: 40, attendees: ['KA', 'MP', '+7'], variant: 2,
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
    id: 'ch1', country: 'ch', category: 'adventure', days: 8, price: 139900, seatsLeft: 5, booked: 18, attendees: ['VK', 'OP', '+3'], variant: 0,
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
    id: 'it1', country: 'it', category: 'culture', days: 8, price: 99900, seatsLeft: 7, booked: 27, attendees: ['GB', 'FS', '+5'], variant: 3,
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

export const DEPARTURE_FILTERS = ['all', 'culture', 'nature', 'food', 'beach', 'city', 'adventure'] as const;

export const ARTICLES: Article[] = [
  {
    id: 'a1', category: 'guide', readMinutes: 6, variant: 2,
    title: L('First Time Abroad? A Calm Planning Guide', 'เที่ยวต่างประเทศครั้งแรก คู่มือเตรียมตัวฉบับใจเย็น'),
    excerpt: L(
      'From passports to power adapters — a simple checklist that keeps the stress low.',
      'ตั้งแต่พาสปอร์ตจนถึงปลั๊กแปลง เช็กลิสต์ง่าย ๆ ที่ช่วยให้เครียดน้อยลง',
    ),
    author: L('Mali S.', 'มะลิ ส.'),
  },
  {
    id: 'a2', category: 'culture', readMinutes: 4, variant: 1,
    title: L('Kyoto Beyond the Crowds: Quiet Temples Worth Waking Up For', 'เกียวโตแบบไม่แออัด วัดเงียบ ๆ ที่คุ้มค่าตื่นเช้า'),
    excerpt: L(
      'Skip the midday rush — where to go at sunrise for calm gardens and golden light.',
      'หลีกเลี่ยงช่วงคนเยอะ ไปที่ไหนตอนเช้าเพื่อสวนสงบ ๆ และแสงสีทอง',
    ),
    author: L('Ken T.', 'เคน ท.'),
  },
  {
    id: 'a3', category: 'tips', readMinutes: 5, variant: 4,
    title: L('Seven Ways to Save on Your Next Group Tour', '7 วิธีประหยัดเงินเวลาไปทัวร์กรุ๊ป'),
    excerpt: L(
      'Book early, travel off-peak and other simple tricks that make a real difference.',
      'จองเร็ว เที่ยวนอกช่วงพีก และเทคนิคง่าย ๆ ที่ช่วยได้จริง',
    ),
    author: L('Pim R.', 'พิมพ์ ร.'),
  },
];

export const findCountry = (code: string): Country => COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
