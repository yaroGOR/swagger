var http = require("http"); // 1 - Import Node.js core module
const dotenv = require("dotenv");

const createUsers = require("./db/migrations/usersMigrations");
const createPosts = require("./db/migrations/postsMigrations");

const { parseBody } = require("./helpers");

const Middleware = require("./middleware/jwtMiddleware");

const userController = require("./controllers/usersController");
const postsController = require("./controllers/postsController");
const logger = require("./winston");

dotenv.config();
const UsersController = new userController();
const PostsController = new postsController();

const requestListener = async function (req, res) {
  try {
    if (req.method === "POST" || "PUT") {
      await parseBody(req);
    }
    console.log(req.body);

    //register new user
    if (req.url === "/register" && req.method === "POST") {
      UsersController.registerUser(req, res);
    }
    //login user
    if (req.url === "/login" && req.method === "POST") {
      UsersController.loginUser(req, res);
    }

    if (req.url === "/posts" && req.method === "POST") {
      //create post
      Middleware.verifyTokenMiddleware(req, res);
      PostsController.createPost(req, res);
    }
    if (req.url.match(/\/posts\/[0-9]+/) && req.method === "PUT") {
      //update post {id}
      Middleware.verifyTokenMiddleware(req, res);


      PostsController.updatePost(req, res);
    }
    if (req.url.match(/\/posts\/[0-9]+/) && req.method === "GET") {
      Middleware.verifyTokenMiddleware(req, res);

      //get post by {id}
      PostsController.getPostById(req, res);
    }
    if (req.url.match(/\/posts\/[0-9]/) && req.method === "DELETE") {
      Middleware.verifyTokenMiddleware(req, res);

      //delete post {id}
      PostsController.deletePost(req, res);
    }

    if (req.url.match(/\/posts\/[a-zA-Z]/) && req.method === "GET") {
      Middleware.verifyTokenMiddleware(req, res);

      //get post by filename {filename}
      PostsController.getPostByFilename(req, res);
    }
  } catch (error) {
    console.log("main app");
    logger.error(error);
  }
};
var server = http.createServer(requestListener);
createUsers();
createPosts();

server.listen(process.env.PORT); //3 - listen for any incoming requests
console.log(`Node.js web server at port ${process.env.PORT}  is running..`);
