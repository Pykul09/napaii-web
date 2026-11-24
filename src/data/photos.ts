import type { TourPhoto } from '../types';

/**
 * รูปวิวประจำทัวร์ (ใช้บนการ์ด + รูปแรกของ hero หน้ารายละเอียด) — จาก Wikimedia Commons ซึ่งเป็นสัญญาอนุญาตเสรี
 * ต้องแสดงเครดิตผู้ถ่าย + สัญญาอนุญาต (แสดงในส่วน Photo credits ของ Footer)
 * ถ้ามีรูปของบริษัทเองให้แทนที่ src ได้เลย
 */
export const TOUR_PHOTOS: Record<string, TourPhoto> = {
  jp1: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Chureito_Pagoda_and_Mount_Fuji_2023-03-07.jpg/960px-Chureito_Pagoda_and_Mount_Fuji_2023-03-07.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/53/Chureito_Pagoda_and_Mount_Fuji_2023-03-07.jpg/1920px-Chureito_Pagoda_and_Mount_Fuji_2023-03-07.jpg",
    author: "Stjepko Krehula",
    license: "CC BY 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Chureito_Pagoda_and_Mount_Fuji_2023-03-07.jpg",
  },
  jp2: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/%E5%B0%8F%E6%A8%BD%E9%9B%AA%E3%81%82%E3%81%8B%E3%82%8A%E3%81%AE%E8%B7%AF2013%EF%BC%88Otaru_Snow_Light_Path_2013%EF%BC%89_-_panoramio_%283%29.jpg/960px-%E5%B0%8F%E6%A8%BD%E9%9B%AA%E3%81%82%E3%81%8B%E3%82%8A%E3%81%AE%E8%B7%AF2013%EF%BC%88Otaru_Snow_Light_Path_2013%EF%BC%89_-_panoramio_%283%29.jpg",
    large: "https://upload.wikimedia.org/wikipedia/commons/a/a0/%E5%B0%8F%E6%A8%BD%E9%9B%AA%E3%81%82%E3%81%8B%E3%82%8A%E3%81%AE%E8%B7%AF2013%EF%BC%88Otaru_Snow_Light_Path_2013%EF%BC%89_-_panoramio_%283%29.jpg",
    author: "t-konno",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:%E5%B0%8F%E6%A8%BD%E9%9B%AA%E3%81%82%E3%81%8B%E3%82%8A%E3%81%AE%E8%B7%AF2013%EF%BC%88Otaru_Snow_Light_Path_2013%EF%BC%89_-_panoramio_(3).jpg",
  },
  kr1: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Gyeonghoeru_%28Royal_Banquet_Hall%29_at_Gyeongbokgung_Palace%2C_Seoul.jpg/960px-Gyeonghoeru_%28Royal_Banquet_Hall%29_at_Gyeongbokgung_Palace%2C_Seoul.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Gyeonghoeru_%28Royal_Banquet_Hall%29_at_Gyeongbokgung_Palace%2C_Seoul.jpg/1920px-Gyeonghoeru_%28Royal_Banquet_Hall%29_at_Gyeongbokgung_Palace%2C_Seoul.jpg",
    author: "Frank Schulenburg",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Gyeonghoeru_(Royal_Banquet_Hall)_at_Gyeongbokgung_Palace,_Seoul.jpg",
  },
  kr2: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Seongsan_Ilchulbong_from_the_air.jpg/960px-Seongsan_Ilchulbong_from_the_air.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Seongsan_Ilchulbong_from_the_air.jpg/1920px-Seongsan_Ilchulbong_from_the_air.jpg",
    author: "Korea.net / Korean Culture and Information Service",
    license: "CC BY-SA 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Seongsan_Ilchulbong_from_the_air.jpg",
  },
  tw1: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Jiufen_at_night_lantern_glow.jpg/960px-Jiufen_at_night_lantern_glow.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a7/Jiufen_at_night_lantern_glow.jpg/1920px-Jiufen_at_night_lantern_glow.jpg",
    author: "Sunkenbean",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Jiufen_at_night_lantern_glow.jpg",
  },
  vn1: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Ha_Long_Bay_22.jpg/960px-Ha_Long_Bay_22.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Ha_Long_Bay_22.jpg/1920px-Ha_Long_Bay_22.jpg",
    author: "Shyamal",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Ha_Long_Bay_22.jpg",
  },
  vn2: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Hoi_An_-_HoiAn1457.jpg/960px-Hoi_An_-_HoiAn1457.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/Hoi_An_-_HoiAn1457.jpg/1920px-Hoi_An_-_HoiAn1457.jpg",
    author: "lumoplank",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Hoi_An_-_HoiAn1457.jpg",
  },
  cn1: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Panda_Lake_%28Jiuzhaigou%29.jpg/960px-Panda_Lake_%28Jiuzhaigou%29.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Panda_Lake_%28Jiuzhaigou%29.jpg/1920px-Panda_Lake_%28Jiuzhaigou%29.jpg",
    author: "Suicasmo",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Panda_Lake_(Jiuzhaigou).jpg",
  },
  sg1: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Singapore_Marina_Bay_Dusk_2018-02-27.jpg/960px-Singapore_Marina_Bay_Dusk_2018-02-27.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Singapore_Marina_Bay_Dusk_2018-02-27.jpg/1920px-Singapore_Marina_Bay_Dusk_2018-02-27.jpg",
    author: "Benh LIEU SONG (Flickr)",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Singapore_Marina_Bay_Dusk_2018-02-27.jpg",
  },
  id1: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Brantan_Bali_Pura-Ulun-Danu-Bratan-01.jpg/960px-Brantan_Bali_Pura-Ulun-Danu-Bratan-01.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Brantan_Bali_Pura-Ulun-Danu-Bratan-01.jpg/1920px-Brantan_Bali_Pura-Ulun-Danu-Bratan-01.jpg",
    author: "CEphoto, Uwe Aranas",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Brantan_Bali_Pura-Ulun-Danu-Bratan-01.jpg",
  },
  ch1: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/1_lauterbrunnen_valley_2012.jpg/960px-1_lauterbrunnen_valley_2012.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7c/1_lauterbrunnen_valley_2012.jpg/1920px-1_lauterbrunnen_valley_2012.jpg",
    author: "chensiyuan",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:1_lauterbrunnen_valley_2012.jpg",
  },
  it1: {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Panorama_of_Canal_Grande_and_Ponte_di_Rialto%2C_Venice_-_September_2017.jpg/960px-Panorama_of_Canal_Grande_and_Ponte_di_Rialto%2C_Venice_-_September_2017.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Panorama_of_Canal_Grande_and_Ponte_di_Rialto%2C_Venice_-_September_2017.jpg/1920px-Panorama_of_Canal_Grande_and_Ponte_di_Rialto%2C_Venice_-_September_2017.jpg",
    author: "Martin Falbisoner",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Panorama_of_Canal_Grande_and_Ponte_di_Rialto,_Venice_-_September_2017.jpg",
  },
  cn2:
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Great_Wall_of_China_July_2006.JPG/960px-Great_Wall_of_China_July_2006.JPG",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Great_Wall_of_China_July_2006.JPG/1920px-Great_Wall_of_China_July_2006.JPG",
    author: "Velatrix",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Great_Wall_of_China_July_2006.JPG",
  },
  cn4:
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Pudong_Shanghai_November_2017_panorama.jpg/960px-Pudong_Shanghai_November_2017_panorama.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Pudong_Shanghai_November_2017_panorama.jpg/1920px-Pudong_Shanghai_November_2017_panorama.jpg",
    author: "King of Hearts",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Pudong_Shanghai_November_2017_panorama.jpg",
  },
  cn5:
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/1_li_jiang_guilin_yangshuo_2011.jpg/960px-1_li_jiang_guilin_yangshuo_2011.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/1_li_jiang_guilin_yangshuo_2011.jpg/1920px-1_li_jiang_guilin_yangshuo_2011.jpg",
    author: "chensiyuan",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:1_li_jiang_guilin_yangshuo_2011.jpg",
  },
};

/** รูปเพิ่มเติมของแต่ละทัวร์ (hero หน้ารายละเอียด) — Wikimedia Commons, เครดิตแสดงใน Footer */
export const TOUR_GALLERY: Record<string, TourPhoto[]> = {
  jp1: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg/1920px-Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg",
      author: "Basile Morin",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine,_Kyoto,_Japan.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5f/Dotonbori_Neon_Sign%2C_Osaka_20190415_1.jpg/1920px-Dotonbori_Neon_Sign%2C_Osaka_20190415_1.jpg",
      author: "DXR",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Dotonbori_Neon_Sign,_Osaka_20190415_1.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg/1920px-Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg",
      author: "Benh LIEU SONG (Flickr)",
      license: "CC BY-SA 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg",
    },
  ],
  jp2: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Lavender_fields%2C_Furano_%2848254611081%29.jpg/1920px-Lavender_fields%2C_Furano_%2848254611081%29.jpg",
      author: "Blondinrikard Fröberg from Göteborg, Sweden",
      license: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Lavender_fields,_Furano_(48254611081).jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Shirogane_Blue_Pond_by_night%2C_April_2023_06.jpg/1920px-Shirogane_Blue_Pond_by_night%2C_April_2023_06.jpg",
      author: "Calistemon",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Shirogane_Blue_Pond_by_night,_April_2023_06.jpg",
    },
  ],
  kr1: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/View_from_Namsan_Tower_1998.jpg/1920px-View_from_Namsan_Tower_1998.jpg",
      author: "UNC - CFC - USFK",
      license: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:View_from_Namsan_Tower_1998.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Gwanghwamun_is_the_main_gate_to_the_south_of_Gyeongbokgung_Palace.jpg/1920px-Gwanghwamun_is_the_main_gate_to_the_south_of_Gyeongbokgung_Palace.jpg",
      author: "Pinterpandai",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Gwanghwamun_is_the_main_gate_to_the_south_of_Gyeongbokgung_Palace.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Bukchon-ro_11-gil_street_with_hanok_houses_at_blue_hour_in_Bukchon_Hanok_Village_Seoul.jpg/1920px-Bukchon-ro_11-gil_street_with_hanok_houses_at_blue_hour_in_Bukchon_Hanok_Village_Seoul.jpg",
      author: "Basile Morin",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Bukchon-ro_11-gil_street_with_hanok_houses_at_blue_hour_in_Bukchon_Hanok_Village_Seoul.jpg",
    },
  ],
  kr2: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Hallasan_Volcanic_Crater.jpg/1920px-Hallasan_Volcanic_Crater.jpg",
      author: "Nfarag2019",
      license: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Hallasan_Volcanic_Crater.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Hyeopjae_Beach_Scenery.jpg/1920px-Hyeopjae_Beach_Scenery.jpg",
      author: "Lcarrion88",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Hyeopjae_Beach_Scenery.jpg",
    },
  ],
  tw1: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Taipei_Taiwan_Taipei-101-Tower-01.jpg/1920px-Taipei_Taiwan_Taipei-101-Tower-01.jpg",
      author: "CEphoto, Uwe Aranas",
      license: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Taipei_Taiwan_Taipei-101-Tower-01.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/East_Entrance_of_Raohe_Street_Night_Market_20060118_night.jpg/1920px-East_Entrance_of_Raohe_Street_Night_Market_20060118_night.jpg",
      author: "Fauzty",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:East_Entrance_of_Raohe_Street_Night_Market_20060118_night.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Gaomei_Wetland_Huang_Chung_Yu_02.jpg/1920px-Gaomei_Wetland_Huang_Chung_Yu_02.jpg",
      author: "黃中佑 Huang Chung Yu",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Gaomei_Wetland_Huang_Chung_Yu_02.jpg",
    },
  ],
  vn1: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Trang_An_Landscape_Complex%2C_Ninh_Binh_Province%2C_Vietnam%2C_20240202_1456_5313.jpg/1920px-Trang_An_Landscape_Complex%2C_Ninh_Binh_Province%2C_Vietnam%2C_20240202_1456_5313.jpg",
      author: "Jakub Hałun",
      license: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Trang_An_Landscape_Complex,_Ninh_Binh_Province,_Vietnam,_20240202_1456_5313.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Street_seller_of_fingered_citrons_in_Old_Town_of_Hanoi%2C_20240204_1335_5772.jpg/1920px-Street_seller_of_fingered_citrons_in_Old_Town_of_Hanoi%2C_20240204_1335_5772.jpg",
      author: "Jakub Hałun",
      license: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Street_seller_of_fingered_citrons_in_Old_Town_of_Hanoi,_20240204_1335_5772.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Tam_C%E1%BB%91c-B%C3%ADch_%C4%90%E1%BB%99ng_in_Ninh_Binh_province_2.jpg/1920px-Tam_C%E1%BB%91c-B%C3%ADch_%C4%90%E1%BB%99ng_in_Ninh_Binh_province_2.jpg",
      author: "travel oriented",
      license: "CC BY-SA 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Tam_C%E1%BB%91c-B%C3%ADch_%C4%90%E1%BB%99ng_in_Ninh_Binh_province_2.jpg",
    },
  ],
  vn2: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Golden_Bridge_at_Ba_Na_Hills_20250718.jpg/1920px-Golden_Bridge_at_Ba_Na_Hills_20250718.jpg",
      author: "DvTor8303",
      license: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:Golden_Bridge_at_Ba_Na_Hills_20250718.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/My_Khe_Beach_Danang_Highrises.jpg/1920px-My_Khe_Beach_Danang_Highrises.jpg",
      author: "Jpatokal",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:My_Khe_Beach_Danang_Highrises.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/H%E1%BB%99i_An%2C_Ch%C3%B9a_C%E1%BA%A7u%2C_2020-01_CN-02.jpg/1920px-H%E1%BB%99i_An%2C_Ch%C3%B9a_C%E1%BA%A7u%2C_2020-01_CN-02.jpg",
      author: "Steffen Schmitz (more photos)",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:H%E1%BB%99i_An,_Ch%C3%B9a_C%E1%BA%A7u,_2020-01_CN-02.jpg",
    },
  ],
  cn1: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/Chengdu_Sichuan_China_Panda-breeding-and-research-center-02.jpg/1920px-Chengdu_Sichuan_China_Panda-breeding-and-research-center-02.jpg",
      author: "CEphoto, Uwe Aranas",
      license: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Chengdu_Sichuan_China_Panda-breeding-and-research-center-02.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/1_huanglong_pools_aerial_2011.jpg/1920px-1_huanglong_pools_aerial_2011.jpg",
      author: "chensiyuan",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:1_huanglong_pools_aerial_2011.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/Nuorilang_falls.jpg/1920px-Nuorilang_falls.jpg",
      author: "Jean-Marie Hullot",
      license: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Nuorilang_falls.jpg",
    },
  ],
  sg1: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Supertree_Grove%2C_Gardens_by_the_Bay%2C_Singapore1.jpg/1920px-Supertree_Grove%2C_Gardens_by_the_Bay%2C_Singapore1.jpg",
      author: "Mustang Joe",
      license: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:Supertree_Grove,_Gardens_by_the_Bay,_Singapore1.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Singapore_%28SG%29%2C_Merlion_--_2019_--_4496.jpg/1920px-Singapore_%28SG%29%2C_Merlion_--_2019_--_4496.jpg",
      author: "Dietmar Rabich",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Singapore_(SG),_Merlion_--_2019_--_4496.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Palawan_Beach%2C_Sentosa_%28184817%29.jpg/1920px-Palawan_Beach%2C_Sentosa_%28184817%29.jpg",
      author: "Moheen Reeyad",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Palawan_Beach,_Sentosa_(184817).jpg",
    },
  ],
  id1: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Rice_terraces%2C_Bali.jpg/1920px-Rice_terraces%2C_Bali.jpg",
      author: "Vyacheslav Argenberg",
      license: "CC BY 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Rice_terraces,_Bali.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Uluwatu_temple%2C_Bali.jpg/1920px-Uluwatu_temple%2C_Bali.jpg",
      author: "Tiya20",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Uluwatu_temple,_Bali.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Tanah_Lot%2C_Bali%2C_Indonesia%2C_20220827_0957_1103.jpg/1920px-Tanah_Lot%2C_Bali%2C_Indonesia%2C_20220827_0957_1103.jpg",
      author: "Jakub Hałun",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Tanah_Lot,_Bali,_Indonesia,_20220827_0957_1103.jpg",
    },
  ],
  ch1: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/CH.BE.Grindelwald_2021-04-20_Jungfraujoch_Sphinx-Observatory.jpg/1920px-CH.BE.Grindelwald_2021-04-20_Jungfraujoch_Sphinx-Observatory.jpg",
      author: "Roy Egloff\n\n       This  image was created with PTGui.\n     ",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:CH.BE.Grindelwald_2021-04-20_Jungfraujoch_Sphinx-Observatory.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/CH.LU.Luzern_Kapellbr%C3%BCcke_01_16x9-R_16384x9216.jpg/1920px-CH.LU.Luzern_Kapellbr%C3%BCcke_01_16x9-R_16384x9216.jpg",
      author: "Roy Egloff\n\n      \n\n\n\n\n\nNOTE: This image is a panorama  cons",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:CH.LU.Luzern_Kapellbr%C3%BCcke_01_16x9-R_16384x9216.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bb/00_0020_Grindelwald_-_Wetterhorn.jpg/1920px-00_0020_Grindelwald_-_Wetterhorn.jpg",
      author: "W. Bulach",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:00_0020_Grindelwald_-_Wetterhorn.jpg",
    },
  ],
  it1: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Colosseum_of_Rome_and_Roman_forum.jpg/1920px-Colosseum_of_Rome_and_Roman_forum.jpg",
      author: "Wilfredor",
      license: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:Colosseum_of_Rome_and_Roman_forum.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Fontaine_Trevi_-_Rome.jpg/1920px-Fontaine_Trevi_-_Rome.jpg",
      author: "Wilfredor",
      license: "CC0",
      page: "https://commons.wikimedia.org/wiki/File:Fontaine_Trevi_-_Rome.jpg",
    },
  ],
  cn2: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/Sunset_of_the_Forbidden_City_2006.JPG/1920px-Sunset_of_the_Forbidden_City_2006.JPG",
      author: "User:kallgan",
      license: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Sunset_of_the_Forbidden_City_2006.JPG",
    },
  ],
  cn4: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Shanghai_-_Yu_Garden_-_0035.jpg/1920px-Shanghai_-_Yu_Garden_-_0035.jpg",
      author: "Stefan Fussan",
      license: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Shanghai_-_Yu_Garden_-_0035.jpg",
    },
  ],
  cn5: [
  ],
};

/** รูปทัวร์ที่กำลังจะเปิดขาย (Departing Soon) — Wikimedia Commons */
export const SOON_PHOTOS: Record<string, TourPhoto> = {
  jp3:
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Shirakawa-go_20170202-3.jpg/960px-Shirakawa-go_20170202-3.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Shirakawa-go_20170202-3.jpg/1920px-Shirakawa-go_20170202-3.jpg",
    author: "Suicasmo",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Shirakawa-go_20170202-3.jpg",
  },
  kr3:
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Colorful_houses_in_Gamcheon_Culture_Village_at_sunset_in_Busan_South_Korea.jpg/960px-Colorful_houses_in_Gamcheon_Culture_Village_at_sunset_in_Busan_South_Korea.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Colorful_houses_in_Gamcheon_Culture_Village_at_sunset_in_Busan_South_Korea.jpg/1920px-Colorful_houses_in_Gamcheon_Culture_Village_at_sunset_in_Busan_South_Korea.jpg",
    author: "Basile Morin",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Colorful_houses_in_Gamcheon_Culture_Village_at_sunset_in_Busan_South_Korea.jpg",
  },
  vn3:
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Rice_terraces_in_Sapa%2C_Vietnam.jpg/960px-Rice_terraces_in_Sapa%2C_Vietnam.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Rice_terraces_in_Sapa%2C_Vietnam.jpg/1920px-Rice_terraces_in_Sapa%2C_Vietnam.jpg",
    author: "Eerin25",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Rice_terraces_in_Sapa,_Vietnam.jpg",
  },
  cn3:
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Zhangjiajie_at_dawn_1.jpg/960px-Zhangjiajie_at_dawn_1.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Zhangjiajie_at_dawn_1.jpg/1920px-Zhangjiajie_at_dawn_1.jpg",
    author: "Dcpeets",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Zhangjiajie_at_dawn_1.jpg",
  },
  it3:
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Positano_%28Italy%29_04.jpg/960px-Positano_%28Italy%29_04.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Positano_%28Italy%29_04.jpg/1920px-Positano_%28Italy%29_04.jpg",
    author: "Bernard Gagnon",
    license: "CC BY 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Positano_(Italy)_04.jpg",
  },
  ch3:
  {
    src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/CH.VS.Zermatt_2021-10-17_Matterhorn_8726.jpg/960px-CH.VS.Zermatt_2021-10-17_Matterhorn_8726.jpg",
    large: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/CH.VS.Zermatt_2021-10-17_Matterhorn_8726.jpg/1920px-CH.VS.Zermatt_2021-10-17_Matterhorn_8726.jpg",
    author: "Roy Egloff",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:CH.VS.Zermatt_2021-10-17_Matterhorn_8726.jpg",
  },
};

export const SOON_GALLERY: Record<string, TourPhoto[]> = {
  jp3: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Fountain_Kenrokuen_Garden_Kanazawa_Japan.JPG/1920px-Fountain_Kenrokuen_Garden_Kanazawa_Japan.JPG",
      author: "Original uploader was Jovandavid at en.wikipedia",
      license: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Fountain_Kenrokuen_Garden_Kanazawa_Japan.JPG",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Takayama_Old_Town_At_Night_%28135528503%29.jpeg/1920px-Takayama_Old_Town_At_Night_%28135528503%29.jpeg",
      author: "Harald Johnsen",
      license: "CC BY-SA 3.0",
      page: "https://commons.wikimedia.org/wiki/File:Takayama_Old_Town_At_Night_(135528503).jpeg",
    },
  ],
  kr3: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Haedong_Yonggungsa_Temple_near_Busan.jpg/1920px-Haedong_Yonggungsa_Temple_near_Busan.jpg",
      author: "Christian Bolz",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Haedong_Yonggungsa_Temple_near_Busan.jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Gwangan_Bridge_seen_Marine_City_at_Night_02.jpg/1920px-Gwangan_Bridge_seen_Marine_City_at_Night_02.jpg",
      author: "Jeena Paradies",
      license: "Public domain",
      page: "https://commons.wikimedia.org/wiki/File:Gwangan_Bridge_seen_Marine_City_at_Night_02.jpg",
    },
  ],
  vn3: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Fansipan_Cable_Car_Flowers_Field.png/1920px-Fansipan_Cable_Car_Flowers_Field.png",
      author: "Vivu Vietnam",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Fansipan_Cable_Car_Flowers_Field.png",
    },
  ],
  cn3: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Tianmen_38330-Zhangjiajie_%2849047525877%29.jpg/1920px-Tianmen_38330-Zhangjiajie_%2849047525877%29.jpg",
      author: "xiquinhosilva",
      license: "CC BY 2.0",
      page: "https://commons.wikimedia.org/wiki/File:Tianmen_38330-Zhangjiajie_(49047525877).jpg",
    },
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/1_fenghuang_ancient_town_hunan_china.jpg/1920px-1_fenghuang_ancient_town_hunan_china.jpg",
      author: "chensiyuan",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:1_fenghuang_ancient_town_hunan_china.jpg",
    },
  ],
  it3: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Capri_Portrait.jpg/1920px-Capri_Portrait.jpg",
      author: "Mайкл Гиммельфарб",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:Capri_Portrait.jpg",
    },
  ],
  ch3: [
    {
      src: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/At_Gornergrat%2C_Wallis%2C_Switzerland%2C_2012_August_-_2.jpg/1920px-At_Gornergrat%2C_Wallis%2C_Switzerland%2C_2012_August_-_2.jpg",
      author: "Ximonic (Simo Räsänen)",
      license: "CC BY-SA 4.0",
      page: "https://commons.wikimedia.org/wiki/File:At_Gornergrat,_Wallis,_Switzerland,_2012_August_-_2.jpg",
    },
  ],
};
