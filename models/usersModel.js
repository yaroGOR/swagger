const { checkPassword } = require("../helpers");
const client = require("./../db/connect");
class UserModel {
  constructor() {}

  async saveUser(username, password) {
    try {
      await client.query(
        "INSERT INTO users(username, password) VALUES($1, $2) RETURNING *",
        [username, password]
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUser(username) {
    try {
      const result = await client.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      console.log(result.rows)
      const user = result.rows[0];
      console.log(user)
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;
