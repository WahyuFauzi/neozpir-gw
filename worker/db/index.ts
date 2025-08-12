import { DrizzleD1Database, drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb(d1: D1Database) {
  return drizzle(d1, { schema });
}

export type DB = DrizzleD1Database<typeof schema>;
