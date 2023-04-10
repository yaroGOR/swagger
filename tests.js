const request = require("supertest");

let randomusername = (Math.random() + 1).toString(36).substring(7);
let password = 'password'
request("http://localhost:5011")
  .post("/register")
  .send({
    username: randomusername,
    password: password,
  })
  .expect(200)
  .expect(body=>{console.log(body)})
  .end(function (err, res) {
    if (err) throw err;
  });
