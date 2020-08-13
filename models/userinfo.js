var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "User Name is Required"],
    trim: true,
    minlength: [3, "Name should contain at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Psst! you forgot to put in your password."],
    trim: true,
    stripHtmlTags: true,
    minlength: [6, "Password should be at least 6 characters long :)"],
  },
});
const UserInfo = mongoose.model("UserInfo", UserSchema);
module.exports = UserInfo;
