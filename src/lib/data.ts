import type { Area, Shop } from './types';

export const areas: Area[] = [
  { id: 'shibuya', name: '渋谷' },
  { id: 'shinjuku', name: '新宿' },
  { id: 'ikebukuro', name: '池袋' },
  { id: 'ebisu', name: '恵比寿' },
  { id: 'roppongi', name: '六本木' },
  { id: 'ginza', name: '銀座' },
  { id: 'shinagawa', name: '品川' },
  { id: 'ueno', name: '上野' },
];

export const shops: Shop[] = [
  // 渋谷
  {
    id: 'shop-shibuya-01',
    name: '炭火居酒屋 渋谷炎',
    area: 'shibuya',
    genre: '居酒屋',
    budget: '3000〜4000円',
    address: '東京都渋谷区道玄坂2-10-1',
  },
  {
    id: 'shop-shibuya-02',
    name: '海鮮酒場 魚よし 渋谷店',
    area: 'shibuya',
    genre: '海鮮',
    budget: '3500〜5000円',
    address: '東京都渋谷区宇田川町15-3',
  },
  {
    id: 'shop-shibuya-03',
    name: '焼肉ホルモン 渋谷道玄坂店',
    area: 'shibuya',
    genre: '焼肉',
    budget: '4000〜6000円',
    address: '東京都渋谷区道玄坂1-5-8',
  },
  {
    id: 'shop-shibuya-04',
    name: 'トラットリア・ベッラ 渋谷',
    area: 'shibuya',
    genre: 'イタリアン',
    budget: '4000〜5500円',
    address: '東京都渋谷区神南1-12-6',
  },

  // 新宿
  {
    id: 'shop-shinjuku-01',
    name: '個室居酒屋 新宿藩',
    area: 'shinjuku',
    genre: '居酒屋',
    budget: '3000〜4000円',
    address: '東京都新宿区歌舞伎町1-2-5',
  },
  {
    id: 'shop-shinjuku-02',
    name: '韓国料理 ソウルキッチン 新宿店',
    area: 'shinjuku',
    genre: '韓国料理',
    budget: '3000〜4500円',
    address: '東京都新宿区西新宿7-8-11',
  },
  {
    id: 'shop-shinjuku-03',
    name: '鶏料理専門 とりまる',
    area: 'shinjuku',
    genre: '居酒屋',
    budget: '2500〜3500円',
    address: '東京都新宿区新宿3-14-2',
  },
  {
    id: 'shop-shinjuku-04',
    name: 'ワインバル グラッツェ 新宿',
    area: 'shinjuku',
    genre: 'イタリアン',
    budget: '3500〜5000円',
    address: '東京都新宿区新宿3-28-10',
  },
  {
    id: 'shop-shinjuku-05',
    name: '牛タン炭焼 仙台っ子 新宿店',
    area: 'shinjuku',
    genre: '焼肉',
    budget: '4000〜5500円',
    address: '東京都新宿区歌舞伎町2-1-3',
  },

  // 池袋
  {
    id: 'shop-ikebukuro-01',
    name: '大衆酒場 池袋ホルモン劇場',
    area: 'ikebukuro',
    genre: '居酒屋',
    budget: '2500〜3500円',
    address: '東京都豊島区西池袋1-20-4',
  },
  {
    id: 'shop-ikebukuro-02',
    name: '中華居酒屋 龍記 池袋店',
    area: 'ikebukuro',
    genre: '中華',
    budget: '2500〜4000円',
    address: '東京都豊島区南池袋2-8-12',
  },
  {
    id: 'shop-ikebukuro-03',
    name: '海鮮居酒屋 浜焼き太郎 池袋店',
    area: 'ikebukuro',
    genre: '海鮮',
    budget: '3000〜4500円',
    address: '東京都豊島区東池袋1-35-6',
  },
  {
    id: 'shop-ikebukuro-04',
    name: 'スペインバル エルソル',
    area: 'ikebukuro',
    genre: 'スペイン料理',
    budget: '3500〜5000円',
    address: '東京都豊島区西池袋3-27-3',
  },

  // 恵比寿
  {
    id: 'shop-ebisu-01',
    name: '恵比寿ビアホール 麦の穂',
    area: 'ebisu',
    genre: '居酒屋',
    budget: '3500〜5000円',
    address: '東京都渋谷区恵比寿南1-5-2',
  },
  {
    id: 'shop-ebisu-02',
    name: 'オステリア・ダ・マルコ',
    area: 'ebisu',
    genre: 'イタリアン',
    budget: '5000〜7000円',
    address: '東京都渋谷区恵比寿西1-14-8',
  },
  {
    id: 'shop-ebisu-03',
    name: '和食ダイニング 恵比寿 花月',
    area: 'ebisu',
    genre: '和食',
    budget: '4000〜6000円',
    address: '東京都渋谷区恵比寿1-22-3',
  },

  // 六本木
  {
    id: 'shop-roppongi-01',
    name: '焼肉 KAZU 六本木',
    area: 'roppongi',
    genre: '焼肉',
    budget: '5000〜8000円',
    address: '東京都港区六本木3-14-7',
  },
  {
    id: 'shop-roppongi-02',
    name: 'ダイニングバー LUXE',
    area: 'roppongi',
    genre: 'ダイニングバー',
    budget: '4000〜6000円',
    address: '東京都港区六本木7-3-12',
  },
  {
    id: 'shop-roppongi-03',
    name: '創作和食 六本木 雅',
    area: 'roppongi',
    genre: '和食',
    budget: '5000〜7000円',
    address: '東京都港区六本木4-9-1',
  },
  {
    id: 'shop-roppongi-04',
    name: '地中海キッチン アズーリ',
    area: 'roppongi',
    genre: 'イタリアン',
    budget: '4500〜6500円',
    address: '東京都港区六本木5-16-5',
  },

  // 銀座
  {
    id: 'shop-ginza-01',
    name: '銀座 鮨処 よしの',
    area: 'ginza',
    genre: '海鮮',
    budget: '5000〜8000円',
    address: '東京都中央区銀座6-3-8',
  },
  {
    id: 'shop-ginza-02',
    name: '銀座ライオン ビヤホール',
    area: 'ginza',
    genre: '居酒屋',
    budget: '3500〜5000円',
    address: '東京都中央区銀座7-9-20',
  },
  {
    id: 'shop-ginza-03',
    name: '天ぷら 銀座 さくら',
    area: 'ginza',
    genre: '和食',
    budget: '5000〜7000円',
    address: '東京都中央区銀座4-6-12',
  },

  // 品川
  {
    id: 'shop-shinagawa-01',
    name: 'もつ鍋居酒屋 博多屋 品川店',
    area: 'shinagawa',
    genre: '居酒屋',
    budget: '3000〜4000円',
    address: '東京都港区高輪3-25-1',
  },
  {
    id: 'shop-shinagawa-02',
    name: 'インド料理 タージマハル 品川',
    area: 'shinagawa',
    genre: 'インド料理',
    budget: '2500〜3500円',
    address: '東京都港区港南2-4-13',
  },
  {
    id: 'shop-shinagawa-03',
    name: '串カツ田中 品川駅前店',
    area: 'shinagawa',
    genre: '居酒屋',
    budget: '2500〜3500円',
    address: '東京都港区高輪4-10-8',
  },

  // 上野
  {
    id: 'shop-ueno-01',
    name: '大衆居酒屋 上野 大統領',
    area: 'ueno',
    genre: '居酒屋',
    budget: '2000〜3000円',
    address: '東京都台東区上野6-10-14',
  },
  {
    id: 'shop-ueno-02',
    name: '上野 焼肉 叙々苑',
    area: 'ueno',
    genre: '焼肉',
    budget: '5000〜7000円',
    address: '東京都台東区上野4-8-6',
  },
  {
    id: 'shop-ueno-03',
    name: '海鮮丼 磯丸水産 上野店',
    area: 'ueno',
    genre: '海鮮',
    budget: '2500〜4000円',
    address: '東京都台東区上野6-12-1',
  },
  {
    id: 'shop-ueno-04',
    name: 'タイ料理 サイアムガーデン 上野',
    area: 'ueno',
    genre: 'タイ料理',
    budget: '2500〜3500円',
    address: '東京都台東区上野2-7-3',
  },
];

export function getShopsByArea(areaId: string): Shop[] {
  return shops.filter((shop) => shop.area === areaId);
}

export function getAreaById(areaId: string): Area | undefined {
  return areas.find((area) => area.id === areaId);
}

export function getShopById(shopId: string): Shop | undefined {
  return shops.find((shop) => shop.id === shopId);
}
