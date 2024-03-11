const mongoose = require("mongoose");

authSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullName: String,
  email: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model("Auth", authSchema);
