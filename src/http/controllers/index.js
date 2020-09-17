const { nanoid } = require("nanoid/async");

module.exports = {
  async index(req, res) {
    return {
      success: true,
      message: "hello world!",
      nanoid: await nanoid(),
    };
  },
};
