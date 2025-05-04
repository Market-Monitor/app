import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./types";

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTGRES_DB!,
    host: process.env.POSTGRES_HOST!,
    user: process.env.POSTGRES_USER!,
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT)
      : 5432,
    max: 10,
    password: process.env.POSTGRES_PASSWORD!,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
