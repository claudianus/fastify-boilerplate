module.exports = {
  index: {
    schema: {
      description: "get hello world",
      summary: "hello world",
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
            nanoid: { type: "string" },
          },
        },
      },
    },
  },
};
