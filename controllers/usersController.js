const { cryptPassword } = require("../helpers");
const UserModel = require("../models/usersModel");
const { checkPassword, generateToken } = require("../helpers");
const logger = require("../winston");

const model = new UserModel();
class UserController {
  constructor() {}

 async registerUser(req, res) {
    const password =await cryptPassword(req.body.password);
    try {
     await model.saveUser(req.body.username, password);
    } catch (error) {
      logger.error(error);

      res.writeHead(500);
      res.end(JSON.stringify({ error: error }));
    }
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Registered" }));
  }

 async loginUser(req, res) {
    try {
      const user = await model.getUser(req.body.username, req.body.password);
        console.log(req.body)
        console.log('user password', user)
      const passwordCompare = checkPassword(req.body.password, user.password);

      if (passwordCompare) {
        const token = generateToken(req.body.username);
        res.writeHead(200);
        res.write(JSON.stringify({ token }));
        res.end();
      } else {
        res.writeHead(500);
        res.write(JSON.stringify({ error: "Wrong password" }));
        res.end();
      }
    } catch (error) {
      logger.error(error);

      res.writeHead(500);
      res.write(JSON.stringify({ error: error }));
      res.end();
    }
  }
}
module.exports = UserController;
