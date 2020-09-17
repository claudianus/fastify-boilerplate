module.exports = {
  get: {
    schema: {
      description: "게시물 조회",
      tags: ["게시물"],
      summary: "게시물",
      query: {
        skip: { type: "integer", default: 0, minimum: 0 },
        limit: { type: "integer", default: 30, minimum: 30, maximum: 30 },
      },
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            posts: {
              type: "array",
              items: { $ref: "post#" },
            },
            maxPostsCount: { type: "integer" },
          },
        },
      },
    },
  },
  create: {
    schema: {
      description: "게시물 생성",
      tags: ["게시물"],
      summary: "게시물",
      headers: {
        type: "object",
        required: ["authorization"],
        properties: {
          authorization: { $ref: "jwt#" },
        },
      },
      body: {
        type: "object",
        required: ["title"],
        properties: {
          title: { type: "string", minLength: 3, maxLength: 30 },
          body: { type: "string", minLength: 0, maxLength: 5000, default: "" },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            post: { $ref: "post#" },
          },
        },
      },
    },
  },
};
