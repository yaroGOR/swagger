const client = require("../db/connect");
const { writeToFile } = require("../helpers");
class PostsModel {
  constructor() {}

  async createPost(title, content, author) {
    try {
      const result = await client.query(
        "INSERT INTO posts (title, content, author) VALUES($1, $2, $3) RETURNING *",
        [title, content, author]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getPostById(id) {
    try {
      const result = await client.query(
        "SELECT * FROM posts WHERE post_id = $1",
        [id]
      );
      console.log(result.rows);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
  async updatePost(id, title, author, content) {
    try {
      const result = await client.query(
        "UPDATE posts SET title = $2, author = $3, content = $4 WHERE post_id = $1 RETURNING *",
        [id, title, author, content]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id) {
    try {
      await client.query("DELETE FROM posts WHERE post_id = $1", [id]);
    } catch (error) {
      throw error;
    }
  }

  async getPostByFileName(filename) {
    try {
      const post = await client.query("SELECT * FROM posts WHERE title = $1", [
        filename,
      ]);
      return post;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostsModel;
