const request = require("supertest");

let randomusername = (Math.random() + 1).toString(36).substring(7);
request("http://localhost:5011")
  .set("Content-Type", "application/json")
  .set('Accept', 'application/json')
  .post("/register")
  .send({
    username: randomusername,
    password: "password",
  })
  .end(function (err, res) {
    if (err) throw err;
    console.log(res);
  });
