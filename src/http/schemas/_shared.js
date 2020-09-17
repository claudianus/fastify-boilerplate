const { init } = require("../../db/models/user");

module.exports = {
  async init(app) {
    app.addSchema({
      description: "유저정보 스키마",
      $id: "user",
      type: "object",
      properties: {
        //_id: { type: "string" },
        username: { type: "string" },
        email: { type: "string" },
        created_at: { type: "integer" },
      },
    });

    app.addSchema({
      description: "JWT 인증 헤더 스키마",
      $id: "jwt",
      type: "string",
      pattern: "^Bearer ([A-Za-z0-9-_=]+.[A-Za-z0-9-_=]+.[A-Za-z0-9-_.+/=]+)$",
    });

    app.addSchema({
      description: "유저네임 스키마",
      $id: "username",
      type: "string",
      maxLength: 36,
    });

    app.addSchema({
      description: "비밀번호 스키마",
      $id: "password",
      type: "string",
      minLength: 8,
      maxLength: 128,
    });

    app.addSchema({
      description: "이메일 스키마",
      $id: "email",
      type: "string",
      format: "email",
      maxLength: 254,
    });

    app.addSchema({
      description: "게시물 스키마",
      $id: "post",
      type: "object",
      properties: {
        _id: { type: "string" },
        author: { $ref: "user#" },
        title: { type: "string" },
        body: { type: "string" },
        created_at: { type: "integer" },
      },
    });

    console.log("SHARED SCHEMA OK");
  },
};
