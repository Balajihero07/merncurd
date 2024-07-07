const mongoose = require("mongoose");
//Create Schema
const userDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sta: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userData = mongoose.model("UserData", userDataSchema);
module.exports = userData;