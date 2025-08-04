const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.PGHOST, // or wherever the db is hosted
  user: process.env.PGUSER, // The user from .env
  database: process.env.PGDATABASE, // The database from .env
  password: process.env.PGPASSWORD, // The password from .env
  port: process.env.PGPORT, // The default port
});
