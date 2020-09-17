const RootController = require("./controllers/index.js");
const RootSchemas = require("./schemas/index.js");

const UserController = require("./controllers/user.js");
const UserSchemas = require("./schemas/user.js");

const PostController = require("./controllers/post.js");
const PostSchemas = require("./schemas/post.js");

module.exports = {
  async init(app) {
    app.get("/", RootSchemas.index, RootController.index);

    app.post("/signup", UserSchemas.signup, UserController.signup);
    app.post("/signin", UserSchemas.signin, UserController.signin);

    app.get("/users/:username/posts", UserSchemas.getPosts, UserController.getPosts);

    app.get("/posts", PostSchemas.get, PostController.get);
    app.post("/posts", PostSchemas.create, PostController.create);
  },
};
