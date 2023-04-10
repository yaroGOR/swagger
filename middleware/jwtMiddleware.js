const { verifyToken } = require("../helpers");
const logger = require("../winston");
class Middleware {
  constructor() {}
  // constructor(){
  //     this.middlewares = [];
  // }
  // use(func) {
  //     this.middlewares.push(func)
  // }
  // executeMiddleware(data, done) {
  //     console.log('execute')
  //    let {req,res} = data
  //     this.middlewares.reduceRight((done, next) => () => next(data, done), done) (req,res);
  //   }

  // run(req,res) {
  //     console.log('run')
  //     let data = {req,res}
  //     this.executeMiddleware(data, done => console.log('done'));
  //   }

  verifyTokenMiddleware(req, res) {
    try {
      let token;
      const auth = req.headers?.authorization;
      if (auth) {
        token = auth.split(" ")[1];
      } else {
        res.writeHead(511).end(JSON.stringify({ error: "You need JWT token" }));
        throw new Error("No Token");
      }
      if (verifyToken(token)) {
        return;
      } else {
        res.writeHead(500);
        res.end(JSON.stringify({ message: "Wrong token" }));
        throw new Error("Wrong Token");
      }
    } catch (error) {
      logger.error(error);
    }
  }
}
module.exports = new Middleware();
