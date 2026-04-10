# cho-say DB設計

## テーブル一覧

| テーブル | 説明 |
|---|---|
| events | イベント |
| event_dates | イベントの候補日（正規化） |
| responses | 出欠回答 |
| response_availability | 回答者ごとの日付別出欠（正規化） |
| areas | エリアマスタ |
| shops | 店舗マスタ |
| shop_votes | 店舗への匿名投票 |

## ER図（テキスト）

```
events 1--* event_dates
events 1--* responses 1--* response_availability
events 1--* shop_votes *--1 shops *--1 areas
```

## テーブル詳細

### events
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK, DEFAULT gen_random_uuid() |
| title | VARCHAR(200) | NOT NULL |
| description | TEXT | NOT NULL DEFAULT '' |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT NOW() |

### event_dates
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| event_id | UUID | FK -> events(id) ON DELETE CASCADE |
| date | DATE | NOT NULL |

UNIQUE(event_id, date)

### responses
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| event_id | UUID | FK -> events(id) ON DELETE CASCADE |
| name | VARCHAR(100) | NOT NULL |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT NOW() |

### response_availability
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| response_id | UUID | FK -> responses(id) ON DELETE CASCADE |
| date | DATE | NOT NULL |
| answer | VARCHAR(5) | NOT NULL, CHECK IN ('ok','maybe','ng') |

UNIQUE(response_id, date)

### areas
| Column | Type | Constraints |
|---|---|---|
| id | VARCHAR(50) | PK |
| name | VARCHAR(100) | NOT NULL |

### shops
| Column | Type | Constraints |
|---|---|---|
| id | VARCHAR(100) | PK |
| name | VARCHAR(200) | NOT NULL |
| area_id | VARCHAR(50) | FK -> areas(id) |
| genre | VARCHAR(100) | NOT NULL |
| budget | VARCHAR(100) | NOT NULL |
| address | VARCHAR(500) | NOT NULL |
| url | TEXT | NULL |
| image_url | TEXT | NULL |
| external_id | VARCHAR(200) | NULL（外部API用） |
| external_source | VARCHAR(50) | NULL（例: 'hotpepper'） |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT NOW() |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT NOW() |

### shop_votes
| Column | Type | Constraints |
|---|---|---|
| id | UUID | PK |
| event_id | UUID | FK -> events(id) ON DELETE CASCADE |
| shop_id | VARCHAR(100) | FK -> shops(id) |
| count | INTEGER | NOT NULL DEFAULT 0, CHECK >= 0 |

UNIQUE(event_id, shop_id)

## インデックス

| Index | Table | Columns | Notes |
|---|---|---|---|
| idx_event_dates_event_id | event_dates | event_id | |
| idx_responses_event_id | responses | event_id | |
| idx_response_availability_response_id | response_availability | response_id | |
| idx_shops_area_id | shops | area_id | |
| idx_shops_external | shops | external_source, external_id | UNIQUE, partial (WHERE NOT NULL) |
| idx_shop_votes_event_id | shop_votes | event_id | |

## 投票のUPSERTパターン

```sql
INSERT INTO shop_votes (event_id, shop_id, count)
VALUES ($1, $2, 1)
ON CONFLICT (event_id, shop_id)
DO UPDATE SET count = shop_votes.count + 1;
```

## 設計判断

- **event_dates**: 配列ではなく別テーブルに正規化 → 日付ごとの集計クエリが容易
- **response_availability**: JSONB ではなく別テーブル → CHECK制約、SQL集計が可能
- **shop_votes.count**: 匿名投票なので個別行ではなくカウントで管理 → UPSERTでアトミックに加算
- **shops.external_id/source**: 将来のホットペッパーAPI連携でupsert可能な設計
- **shops.id を VARCHAR**: 現在の文字列ID（shop-shibuya-01等）との互換性を維持
