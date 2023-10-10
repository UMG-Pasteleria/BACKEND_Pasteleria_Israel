const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  password: "SEM2@23umg",
  host: "localhost",
  port: 5432,
  database: "pasteleria_israel",
});

module.exports = pool;

/*prueba de rama*/
