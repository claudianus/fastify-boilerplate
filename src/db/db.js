const mongoose = require("mongoose");

module.exports = {
  async init() {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    module.exports.db = mongoose.connection;
    console.log("MONGODB OK");
  },
};
