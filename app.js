var http = require('http'); // 1 - Import Node.js core module
const dotenv = require("dotenv")

const pg = require('./db/connect')
const createUsers = require('./db/migrations/usersMigrations')
const createPosts = require('./db/migrations/postsMigrations')
const controller = require("./controllers/baseController")

dotenv.config()

const baseController = new controller()


var server = http.createServer(function (req, res) {   // 2 - creating server

    //handle incomming requests here..
    console.log(req)
    if (req.url==='/') {
        baseController.getPostById()
    }

});
createUsers()
createPosts()


server.listen(process.env.PORT); //3 - listen for any incoming requests
console.log(`Node.js web server at port ${process.env.PORT}  is running..`)
