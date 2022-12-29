const { Pool } = require("pg");

// Create a connection pool to the database using the connection string
// from the environment variable DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
