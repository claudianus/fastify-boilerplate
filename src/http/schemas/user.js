module.exports = {
  signup: {
    schema: {
      description: "회원가입",
      tags: ["유저"],
      summary: "회원가입",
      body: {
        username: { $ref: "username#" },
        password: { $ref: "password#" },
        email: { $ref: "email#" },
      },
      response: {
        201: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            user: { $ref: "user#" },
            jwt: { $ref: "jwt#" },
          },
        },
      },
    },
  },
  signin: {
    schema: {
      description: "로그인",
      tags: ["유저"],
      summary: "로그인",
      body: {
        usernameOrEmail: { type: "string", maxLength: 254 },
        password: { $ref: "password" },
      },
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            user: { $ref: "user#" },
            jwt: { $ref: "jwt#" },
          },
        },
      },
    },
  },
  getPosts: {
    schema: {
      description: "유저 게시물 조회",
      tags: ["유저"],
      summary: "유저 게시물 조회",
      query: {
        skip: { type: "integer", minimum: 0, default: 0 },
        limit: { type: "integer", minimum: 30, maximum: 30, default: 30 },
      },
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            username: { $ref: "username#" },
            posts: {
              type: "array",
              items: { $ref: "post#" },
            },
          },
        },
      },
    },
  },
};
