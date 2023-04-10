const PostsModel = require("../models/postsModel");
const { writeToFile } = require("../helpers");
const logger = require("../winston");

const model = new PostsModel();


class PostsController {
  async createPost(req, res) {
    try {
      const { title, author, content } = req.body;
      const post = await model.createPost(title, author, content);
      writeToFile(post, title);
      console.log(JSON.stringify(post));
      const post_id = post.post_id

      res.writeHead(200);
      res.end(JSON.stringify({ message: "Created", id:post_id }));
    } catch (error) {
      logger.error(error);
      res.writeHead(500);
      res.end(JSON.stringify({error:"An error occured"}))

    }
  }

  async getPostById(req, res) {
    try {
      const id = req.url.split("/")[2];
      const post = await model.getPostById(id);
      console.log("post", post);
      res.writeHead(200);
      res.end(JSON.stringify(post));
    } catch (error) {
      logger.error(error);
      res.writeHead(500);
      res.end(JSON.stringify({error:"An error occured"}))
    }
  }

  async updatePost(req, res) {
    try {
      const id = req.url.split("/")[2];
      const { title, author, content } = req.body;
      const post = await model.updatePost(id, title, author, content);
      writeToFile(post, title);
      res.writeHead(200);
      res.end(JSON.stringify({ message: "Updated" }));
    } catch (error) {
      logger.error(error);
      res.writeHead(500);
      res.end(JSON.stringify({error:"An error occured"}))
    }
  }

  async getPostByFilename(req, res) {
    try {
      const filename = req.url.split("/")[2];
      const post = await model.getPostByFileName(filename);
      res.writeHead(200);
      res.end(JSON.stringify(post.rows[0]));
    } catch (error) {
      logger.error(error);
      res.writeHead(500);
      res.end(JSON.stringify({error:"An error occured"}))
    }
  }

  async deletePost(req, res) {
    try {
      const id = req.url.split("/")[2];
      await model.deletePost(id);
      res.writeHead(200);
      res.end(JSON.stringify({ message: "Deleted" }));
    } catch (error) {
      logger.error(error);
      res.writeHead(500);
      res.end(JSON.stringify({error:"An error occured"}))
    }
  }
}

module.exports = PostsController;
