const client = require("./../connect");
const logger = require("../../winston");

const createUsers = async () => {
  try {
    await client.query(`
    CREATE TABLE IF NOT EXISTS users (
        user_id serial PRIMARY KEY,
        username VARCHAR (50) UNIQUE NOT NULL,
        password VARCHAR (200) NOT NULL,
        created_on TIMESTAMP NOT NULL DEFAULT NOW(),
        last_login TIMESTAMP
        )`);
    console.log("Table with users succesfully created");
  } catch (error) {
    logger.error(error.stack);
  }
};
module.exports = createUsers;
