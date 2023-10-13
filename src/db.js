const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  password: "Marta17",
  host: "localhost",
  port: 5432,
  database: "pasteleria_israel",
});

module.exports = pool;
