const request = require("supertest");

let randomusername = (Math.random() + 1).toString(36).substring(7);
let password = 'password'
let token
request("http://localhost:5011")
  .post("/register")
  .send({
    username: randomusername,
    password: password,
  })
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });
setTimeout( ()=>{

    request("http://localhost:5011")
  .post("/login")
  .send({
    username: randomusername,
    password: password,
  })
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
    token = JSON.parse(res.text).token.split(' ')[1]
    console.log(token)
  });
}, 200)
  
