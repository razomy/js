import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma",
  migrations: {
    path: "./migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
