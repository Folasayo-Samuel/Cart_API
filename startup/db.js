const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

module.exports = function () {
  const db = process.env.MONGO_URI;
  mongoose.connect(db).then(() => console.info("Connected to database..."));
};
