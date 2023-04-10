const { Client } = require("pg");
const logger = require("../winston");

const client = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});
client.connect((err) => {
  if (err) {
    logger.error(error.stack);
  } else {
    console.log("Connected to db");
  }
});

module.exports = client;
