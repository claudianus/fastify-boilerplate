const User = require("../../db/models/user.js");
const Post = require("../../db/models/post.js");

module.exports = {
  async get(req, res) {
    const { limit, skip } = req.query;
    const posts = await Post.findRecent(skip, limit);
    return {
      success: true,
      posts,
    };
  },
  async create(req, res) {
    if (!req.user) {
      throw {
        statusCode: 401,
        message: "Auth failed",
      };
    }

    const { title, body } = req.body;
    const post = await Post.create({
      title,
      body,
      author: req.user.id,
    });

    post.author = undefined;

    console.log(post);

    res.code(201);
    return {
      success: true,
      post,
    };
  },
};
