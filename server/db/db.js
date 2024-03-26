const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER, // replace with your PostgreSQL username
  password: process.env.POSTGRES_PASSWORD, // replace with your PostgreSQL password
  host: process.env.POSTGRES_HOST, // replace with your PostgreSQL host
  port: process.env.PGPORT || 5432, // use the port from the environment variable or default to 5432
  database: process.env.POSTGRES_DATABASE, // replace with your PostgreSQL database name
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
  process.exit(-1);
});

module.exports = pool;
