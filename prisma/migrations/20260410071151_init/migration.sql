-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_dates" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "date" TIMESTAMP NOT NULL,

    CONSTRAINT "event_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responses" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "response_availability" (
    "id" UUID NOT NULL,
    "response_id" UUID NOT NULL,
    "date" VARCHAR(20) NOT NULL,
    "answer" VARCHAR(5) NOT NULL,

    CONSTRAINT "response_availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "areas" (
    "id" VARCHAR(50) NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shops" (
    "id" VARCHAR(100) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "area_id" VARCHAR(50) NOT NULL,
    "genre" VARCHAR(100) NOT NULL,
    "budget" VARCHAR(100) NOT NULL,
    "address" VARCHAR(500) NOT NULL,
    "url" TEXT,
    "image_url" TEXT,
    "external_id" VARCHAR(200),
    "external_source" VARCHAR(50),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shop_votes" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "shop_id" VARCHAR(100) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "shop_votes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_dates_event_id_idx" ON "event_dates"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "event_dates_event_id_date_key" ON "event_dates"("event_id", "date");

-- CreateIndex
CREATE INDEX "responses_event_id_idx" ON "responses"("event_id");

-- CreateIndex
CREATE INDEX "response_availability_response_id_idx" ON "response_availability"("response_id");

-- CreateIndex
CREATE UNIQUE INDEX "response_availability_response_id_date_key" ON "response_availability"("response_id", "date");

-- CreateIndex
CREATE INDEX "shops_area_id_idx" ON "shops"("area_id");

-- CreateIndex
CREATE UNIQUE INDEX "shops_external_source_external_id_key" ON "shops"("external_source", "external_id");

-- CreateIndex
CREATE INDEX "shop_votes_event_id_idx" ON "shop_votes"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "shop_votes_event_id_shop_id_key" ON "shop_votes"("event_id", "shop_id");

-- AddForeignKey
ALTER TABLE "event_dates" ADD CONSTRAINT "event_dates_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "response_availability" ADD CONSTRAINT "response_availability_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "responses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shops" ADD CONSTRAINT "shops_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_votes" ADD CONSTRAINT "shop_votes_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shop_votes" ADD CONSTRAINT "shop_votes_shop_id_fkey" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
