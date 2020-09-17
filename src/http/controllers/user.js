const User = require("../../db/models/user.js");
const post = require("../../db/models/post.js");

module.exports = {
  async signup(req, res) {
    const { user, jwt } = await User.signup(req.body);
    if (!user) {
      throw {
        statusCode: 409,
        message: "the user who uses the username or email already exists",
      };
    }
    res.code(201);
    return {
      success: true,
      user,
      jwt,
    };
  },
  async signin(req, res) {
    const { usernameOrEmail, password } = req.body;
    const { user, jwt } = await User.signin(usernameOrEmail, password);
    if (!user) {
      throw {
        statusCode: 401,
        message: "the username or password is invalid",
      };
    }
    return {
      success: true,
      user,
      jwt,
    };
  },
  async getPosts(req, res) {
    const { skip, limit } = req.query;
    const { username } = req.params;
    const user = await User.findByUsername(username);
    if (!user) {
      throw {
        statusCode: 404,
        message: "no user found",
      };
    }
    const posts = await user.posts(skip, limit);
    return {
      success: true,
      username,
      posts,
    };
  },
};
