const mongoose = require("mongoose");
const path = require("path");
const { nanoid } = require("nanoid");

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: nanoid,
    },
    author: {
      type: String,
      ref: "user",
    },
    title: {
      type: String,
      default: "Untitled",
    },
    body: {
      type: String,
      default: "NoContent",
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

schema.statics.findRecent = async function (skip = 0, limit = 30) {
  const posts = await this.find()
    .skip(skip)
    .limit(limit)
    .sort({ created_at: -1 })
    .populate("author", "username")
    .exec();
  return posts;
};

module.exports = mongoose.model(path.basename(__filename, path.extname(__filename)), schema);
