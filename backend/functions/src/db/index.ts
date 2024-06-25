import {drizzle} from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import * as authSchema from "./schemas/auth";

const connectionString = process.env.DB_URL;

if (!connectionString) {
  throw new Error("DB_URL env variable is not set");
}

const client = postgres(connectionString);
export const db = drizzle(client, {schema: {}});
