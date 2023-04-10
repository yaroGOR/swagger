const request = require("supertest");

let password = "password";
let token;
const host = "http://localhost:5011";


const test = async () => {
    for (i=1; i<5; i++ ) {
        console.log(`Test # ${i}`)
        let randomusername = (Math.random() + 1).toString(36).substring(7);
        let post_id;
let post_filename;
try {
  await request(host)
    .post("/register")
    .send({
      username: randomusername,
      password: password,
    })
    .expect(200)
    .then((res) => {
      console.log("POST /register (register new user) SUCCESS ");
    });
} catch (error) {
          console.log("POST /register (register new user) FAIL ", error);
    
}
try {
  await request(host)
    .post("/login")
    .send({
      username: randomusername,
      password: password,
    })
    .expect(200)
    .then((res) => {
      token = JSON.parse(res.text).token;
      console.log("POST /login (login user) SUCCESS");
      console.log("JWT token = ", token);
    });
} catch (error) {
    console.log("POST /login (login user) FAIL", error);
}
try {
  await request(host)
    .post("/posts")
    .set("Authorization", "Bearer " + token)
    .send({
      title: randomusername,
      content: randomusername,
      author: randomusername,
    })
    .expect(200)
    .then((res) => {
      post_id = JSON.parse(res.text).id;
      console.log("POST /posts (create new post) SUCCESS");
    });
}catch (error) {
          console.log("POST /login (login user) FAIL", error);

}
try {
  await request(host)
    .put("/posts/" + String(post_id))
    .set("Authorization", "Bearer " + token)
    .send({
      title: randomusername,
      content: randomusername + "Update",
      author: randomusername,
    })
    .expect(200)
    .then((res) => {
      console.log(`PUT /posts/${post_id} (update new post) SUCCESS`);
    });
}catch (error) {
          console.log("POST /login (login user) FAIL", error);

}
try {
  await request(host)
    .get("/posts/" + String(post_id))
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(200)
    .then((res) => {
      post_filename = JSON.parse(res.text).title;
      console.log(`GET /posts${post_id} (get  post by id) SUCCESS`);
    });
}catch (error) {
          console.log("POST /login (login user) FAIL", error);

}
try {
  await request(host)
    .get("/posts/" + String(post_filename))
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(200)
    .then((res) => {
      console.log(
        `GET /posts/${post_filename} (get  post by filename) SUCCESS`
      );
    });

}catch (error) {
          console.log("POST /login (login user) FAIL", error);

}
try {
  await request(host)
    .delete("/posts/" + String(post_id))
    .set("Authorization", "Bearer " + token)
    .send()
    .expect(200)
    .then((res) => {
      console.log(`DELETE /posts/${post_id} (delete  post by id) SUCCESS`);
    });
} catch (error) {
    console.log("POST /login (login user) FAIL", error);

}
};
}



    test();


