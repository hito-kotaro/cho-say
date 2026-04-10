import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrate: {
    url: process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL!,
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
