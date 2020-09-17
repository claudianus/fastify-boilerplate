const fastify = require("fastify")({
  logger: process.env.NODE_ENV !== "production",
  trustProxy: Boolean(process.env.TRUST_PROXY),
});

fastify.register(require("fastify-swagger"), require("./swaggerConfig.js"));

module.exports = {
  async init() {
    await require("./hooks.js").init(fastify);
    await require("./schemas/_shared.js").init(fastify);
    await require("./routes.js").init(fastify);
    await fastify.listen(process.env.HTTP_SERVER_PORT, process.env.HTTP_SERVER_HOST);

    console.log("SERVER OK");
  },
};
