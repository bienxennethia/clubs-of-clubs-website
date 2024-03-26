const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER, // replace with your PostgreSQL username
  password: process.env.PGPASSWORD, // replace with your PostgreSQL password
  host: process.env.PGHOST, // replace with your PostgreSQL host
  port: process.env.PGPORT, // replace with your PostgreSQL port
  database: process.env.PGDATABASE, // replace with your PostgreSQL database name
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

module.exports = pool;
