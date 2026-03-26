const { Pool } = require('pg');

const isLocal = process.env.DATABASE_URL?.includes('localhost');
const connectionString = isLocal
  ? process.env.DATABASE_URL
  : process.env.DATABASE_URL?.includes('sslmode=')
    ? process.env.DATABASE_URL
    : `${process.env.DATABASE_URL}${process.env.DATABASE_URL?.includes('?') ? '&' : '?'}sslmode=verify-full`;

const pool = new Pool({
  connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: true },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

module.exports = { pool };
