-- ============================================================
-- cho-say: Initial database schema
-- Migration: 001_initial
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------
-- events
-- -----------------------------------------------------------
CREATE TABLE events (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(200) NOT NULL,
    description TEXT        NOT NULL DEFAULT '',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------
-- event_dates
-- -----------------------------------------------------------
CREATE TABLE event_dates (
    id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    date     DATE NOT NULL,
    UNIQUE (event_id, date)
);

CREATE INDEX idx_event_dates_event_id ON event_dates(event_id);

-- -----------------------------------------------------------
-- responses
-- -----------------------------------------------------------
CREATE TABLE responses (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id   UUID        NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name       VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_responses_event_id ON responses(event_id);

-- -----------------------------------------------------------
-- response_availability
-- -----------------------------------------------------------
CREATE TABLE response_availability (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    response_id UUID        NOT NULL REFERENCES responses(id) ON DELETE CASCADE,
    date        DATE        NOT NULL,
    answer      VARCHAR(5)  NOT NULL CHECK (answer IN ('ok', 'maybe', 'ng')),
    UNIQUE (response_id, date)
);

CREATE INDEX idx_response_availability_response_id ON response_availability(response_id);

-- -----------------------------------------------------------
-- areas
-- -----------------------------------------------------------
CREATE TABLE areas (
    id   VARCHAR(50)  PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- -----------------------------------------------------------
-- shops
-- -----------------------------------------------------------
CREATE TABLE shops (
    id              VARCHAR(100) PRIMARY KEY,
    name            VARCHAR(200) NOT NULL,
    area_id         VARCHAR(50)  NOT NULL REFERENCES areas(id),
    genre           VARCHAR(100) NOT NULL,
    budget          VARCHAR(100) NOT NULL,
    address         VARCHAR(500) NOT NULL,
    url             TEXT,
    image_url       TEXT,
    external_id     VARCHAR(200),
    external_source VARCHAR(50),
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shops_area_id ON shops(area_id);
CREATE UNIQUE INDEX idx_shops_external
    ON shops(external_source, external_id)
    WHERE external_source IS NOT NULL AND external_id IS NOT NULL;

-- -----------------------------------------------------------
-- shop_votes
-- -----------------------------------------------------------
CREATE TABLE shop_votes (
    id       UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID         NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    shop_id  VARCHAR(100) NOT NULL REFERENCES shops(id),
    count    INTEGER      NOT NULL DEFAULT 0 CHECK (count >= 0),
    UNIQUE (event_id, shop_id)
);

CREATE INDEX idx_shop_votes_event_id ON shop_votes(event_id);

-- -----------------------------------------------------------
-- Seed: areas
-- -----------------------------------------------------------
INSERT INTO areas (id, name) VALUES
    ('shibuya',    '渋谷'),
    ('shinjuku',   '新宿'),
    ('ikebukuro',  '池袋'),
    ('ebisu',      '恵比寿'),
    ('roppongi',   '六本木'),
    ('ginza',      '銀座'),
    ('shinagawa',  '品川'),
    ('ueno',       '上野');

-- -----------------------------------------------------------
-- Seed: shops
-- -----------------------------------------------------------
INSERT INTO shops (id, name, area_id, genre, budget, address) VALUES
    ('shop-shibuya-01',    '炭火居酒屋 渋谷炎',              'shibuya',    '居酒屋',         '3000〜4000円', '東京都渋谷区道玄坂2-10-1'),
    ('shop-shibuya-02',    '海鮮酒場 魚よし 渋谷店',          'shibuya',    '海鮮',           '3500〜5000円', '東京都渋谷区宇田川町15-3'),
    ('shop-shibuya-03',    '焼肉ホルモン 渋谷道玄坂店',       'shibuya',    '焼肉',           '4000〜6000円', '東京都渋谷区道玄坂1-5-8'),
    ('shop-shibuya-04',    'トラットリア・ベッラ 渋谷',        'shibuya',    'イタリアン',      '4000〜5500円', '東京都渋谷区神南1-12-6'),
    ('shop-shinjuku-01',   '個室居酒屋 新宿藩',              'shinjuku',   '居酒屋',         '3000〜4000円', '東京都新宿区歌舞伎町1-2-5'),
    ('shop-shinjuku-02',   '韓国料理 ソウルキッチン 新宿店',    'shinjuku',   '韓国料理',       '3000〜4500円', '東京都新宿区西新宿7-8-11'),
    ('shop-shinjuku-03',   '鶏料理専門 とりまる',             'shinjuku',   '居酒屋',         '2500〜3500円', '東京都新宿区新宿3-14-2'),
    ('shop-shinjuku-04',   'ワインバル グラッツェ 新宿',       'shinjuku',   'イタリアン',      '3500〜5000円', '東京都新宿区新宿3-28-10'),
    ('shop-shinjuku-05',   '牛タン炭焼 仙台っ子 新宿店',      'shinjuku',   '焼肉',           '4000〜5500円', '東京都新宿区歌舞伎町2-1-3'),
    ('shop-ikebukuro-01',  '大衆酒場 池袋ホルモン劇場',       'ikebukuro',  '居酒屋',         '2500〜3500円', '東京都豊島区西池袋1-20-4'),
    ('shop-ikebukuro-02',  '中華居酒屋 龍記 池袋店',          'ikebukuro',  '中華',           '2500〜4000円', '東京都豊島区南池袋2-8-12'),
    ('shop-ikebukuro-03',  '海鮮居酒屋 浜焼き太郎 池袋店',    'ikebukuro',  '海鮮',           '3000〜4500円', '東京都豊島区東池袋1-35-6'),
    ('shop-ikebukuro-04',  'スペインバル エルソル',            'ikebukuro',  'スペイン料理',    '3500〜5000円', '東京都豊島区西池袋3-27-3'),
    ('shop-ebisu-01',      '恵比寿ビアホール 麦の穂',         'ebisu',      '居酒屋',         '3500〜5000円', '東京都渋谷区恵比寿南1-5-2'),
    ('shop-ebisu-02',      'オステリア・ダ・マルコ',           'ebisu',      'イタリアン',      '5000〜7000円', '東京都渋谷区恵比寿西1-14-8'),
    ('shop-ebisu-03',      '和食ダイニング 恵比寿 花月',       'ebisu',      '和食',           '4000〜6000円', '東京都渋谷区恵比寿1-22-3'),
    ('shop-roppongi-01',   '焼肉 KAZU 六本木',               'roppongi',   '焼肉',           '5000〜8000円', '東京都港区六本木3-14-7'),
    ('shop-roppongi-02',   'ダイニングバー LUXE',             'roppongi',   'ダイニングバー',  '4000〜6000円', '東京都港区六本木7-3-12'),
    ('shop-roppongi-03',   '創作和食 六本木 雅',              'roppongi',   '和食',           '5000〜7000円', '東京都港区六本木4-9-1'),
    ('shop-roppongi-04',   '地中海キッチン アズーリ',          'roppongi',   'イタリアン',      '4500〜6500円', '東京都港区六本木5-16-5'),
    ('shop-ginza-01',      '銀座 鮨処 よしの',               'ginza',      '海鮮',           '5000〜8000円', '東京都中央区銀座6-3-8'),
    ('shop-ginza-02',      '銀座ライオン ビヤホール',          'ginza',      '居酒屋',         '3500〜5000円', '東京都中央区銀座7-9-20'),
    ('shop-ginza-03',      '天ぷら 銀座 さくら',             'ginza',      '和食',           '5000〜7000円', '東京都中央区銀座4-6-12'),
    ('shop-shinagawa-01',  'もつ鍋居酒屋 博多屋 品川店',      'shinagawa',  '居酒屋',         '3000〜4000円', '東京都港区高輪3-25-1'),
    ('shop-shinagawa-02',  'インド料理 タージマハル 品川',     'shinagawa',  'インド料理',      '2500〜3500円', '東京都港区港南2-4-13'),
    ('shop-shinagawa-03',  '串カツ田中 品川駅前店',           'shinagawa',  '居酒屋',         '2500〜3500円', '東京都港区高輪4-10-8'),
    ('shop-ueno-01',       '大衆居酒屋 上野 大統領',          'ueno',       '居酒屋',         '2000〜3000円', '東京都台東区上野6-10-14'),
    ('shop-ueno-02',       '上野 焼肉 叙々苑',               'ueno',       '焼肉',           '5000〜7000円', '東京都台東区上野4-8-6'),
    ('shop-ueno-03',       '海鮮丼 磯丸水産 上野店',          'ueno',       '海鮮',           '2500〜4000円', '東京都台東区上野6-12-1'),
    ('shop-ueno-04',       'タイ料理 サイアムガーデン 上野',    'ueno',       'タイ料理',       '2500〜3500円', '東京都台東区上野2-7-3');
