const User = require("../db/models/user.js");
const { JWT } = require("jose");

module.exports = {
  async init(app) {
    app.decorateRequest("user", null);
    app.decorateRequest("isLoggedIn", false);
    const jwtRegex = /^Bearer ([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]+)$/;
    app.addHook("preHandler", async (request, reply) => {
      const authHeader = request.headers?.authorization;
      if (!authHeader) {
        return;
      }

      const regexResult = jwtRegex.exec(authHeader);
      if (!regexResult) {
        return;
      }

      const jwt = regexResult[1];

      try {
        const payload = await JWT.verify(jwt, process.env.JWT_KEY);
        request.user = await User.findById(payload.uid);
        request.isLoggedIn = true;
      } catch (error) {}
    });
  },
};
