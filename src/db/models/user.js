const mongoose = require("mongoose");
const path = require("path");
const { nanoid } = require("nanoid");
const { JWT } = require("jose");
const argon2 = require("argon2");
const typos = require("../../utils/mistypography.js");
const Post = require("../../db/models/post.js");

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: nanoid,
    },
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    autoIndex: true,
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: false,
    },
  },
);

schema.statics.findByUsername = async function (username) {
  return await this.findOne({ username }).exec();
};

schema.statics.findByEmail = async function (email) {
  return await this.findOne({ email }).exec();
};

schema.statics.signup = async function ({ username, email, password }) {
  try {
    const user = await this.create({
      username,
      email,
      password: await argon2.hash(password, {
        type: argon2.argon2id,
        timeCost: Number(process.env.ARGON2_TIME_COST),
        memoryCost: Number(process.env.ARGON2_MEMORY_COST),
        parallelism: Number(process.env.ARGON2_THREADS),
      }),
    });
    const jwt = await user.generateJWT();
    if (!jwt) {
      return {};
    }
    return { user, jwt };
  } catch (error) {
    return {};
  }
};

schema.statics.signin = async function (usernameOrEmail, password) {
  const user = await this.findOne()
    .or([{ username: usernameOrEmail }, { email: usernameOrEmail }])
    .exec();
  if (!user) {
    return {};
  }

  const passwords = typos(password);
  let isValidPassword = false;
  for (let i = 0; i < passwords.length; i++) {
    if (await argon2.verify(user.password, passwords[i])) {
      isValidPassword = true;
      break;
    }
  }

  if (!isValidPassword) {
    return {};
  }

  const jwt = await user.generateJWT();
  if (!jwt) {
    return {};
  }

  return { user, jwt };
};

schema.methods.generateJWT = async function (payload = {}) {
  try {
    Object.assign(payload, { uid: this.id });
    return await JWT.sign(payload, process.env.JWT_KEY, {
      header: {
        typ: "JWT",
      },
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    return null;
  }
};

schema.methods.posts = async function (skip = 0, limit = 30) {
  const posts = await Post.find({ author: this.id }, {author: 0}).skip(skip).limit(limit).sort({ created_at: -1 }).exec();
  return posts;
};

module.exports = mongoose.model(path.basename(__filename, path.extname(__filename)), schema);
