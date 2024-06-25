import dotenv from "dotenv";
import {defineConfig} from "drizzle-kit";

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite"
  schema: "./src/db/schemas/*",
  out: "./drizzle",
  verbose: true,
  strict: true,
  breakpoints: false,
  migrations: {
    schema: "public", // used in PostgreSQL only and default to `drizzle`
  },
  dbCredentials: {
    url: process.env.DB_URL!,
  },
});
