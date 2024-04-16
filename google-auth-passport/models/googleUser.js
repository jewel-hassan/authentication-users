const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  googleId: {
    type: String,
    require: true,
  },
});

const UserInfo = mongoose.model("datausers", userSchema);
module.exports = UserInfo