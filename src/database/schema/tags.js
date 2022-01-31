const mongoose = require("mongoose");

const tags = mongoose.model(
  "Tags",
  new mongoose.Schema({
    name: {
      type: String,
    },
    message: {
      type: String,
    },
  })
);

module.exports = tags;
