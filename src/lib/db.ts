import { Pool, type QueryResultRow } from "pg";

let pool: Pool | null = null;
const NO_DB = process.env.NO_DB === 'true';

function getPool(): Pool {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    if (NO_DB) {
      // In NO_DB mode, we don't require a connection string
      // and will short-circuit queries to return empty results.
      // We still return a dummy pool reference by leaving `pool` as null
      // and guarding in `query()`.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - returning null is handled by callers in this module
      return null;
    }
    throw new Error("DATABASE_URL is not set");
  }
  pool = new Pool({
    connectionString,
    max: 5,
    // Fail fast in local/dev when remote DB is unreachable
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 10000,
    // Allow toggling SSL for managed Postgres providers
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  });
  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(sql: string, params: unknown[] = []) {
  if (NO_DB) {
    // Skip DB access entirely in NO_DB mode
    return [] as T[];
  }
  const poolInstance = getPool();
  // If NO_DB && no DATABASE_URL, getPool returns null; guard anyway
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!poolInstance) {
    return [] as T[];
  }
  const client = await poolInstance.connect();
  try {
    const result = await client.query<T>(sql, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

export async function queryOne<T extends QueryResultRow = QueryResultRow>(sql: string, params: unknown[] = []) {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}


