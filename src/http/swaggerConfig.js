module.exports = {
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "API 문서",
      description: "testing the api",
      version: "0.1.0",
    },
    // externalDocs: {
    //   url: "https://swagger.io",
    //   description: "Find more info here",
    // },
    // host: "localhost",
    // schemes: ["http"],
    // consumes: ["application/json"],
    // produces: ["application/json"],
    tags: [{ name: "유저", description: "유저 관련 API" }],
    // definitions: {
    //   User: {
    //     $id: "User",
    //     type: "object",
    //     required: ["id", "email"],
    //     properties: {
    //       id: { type: "string", format: "uuid" },
    //       firstName: { type: "string", nullable: true },
    //       lastName: { type: "string", nullable: true },
    //       email: { type: "string", format: "email" },
    //     },
    //   },
    // },
    // securityDefinitions: {
    //   apiKey: {
    //     type: "apiKey",
    //     name: "apiKey",
    //     in: "header",
    //   },
    // },
  },
  exposeRoute: true,
};
