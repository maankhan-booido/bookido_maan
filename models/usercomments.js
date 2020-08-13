var mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
  username: String,
  comment: {
    type: String,
    trim: true,
    required: [true, "Comment is empty"],
  },
});
const comment = mongoose.model("UserComments", CommentSchema);
module.exports = comment;
