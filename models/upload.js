var mongoose = require("mongoose");

var UploadbookSchema = mongoose.Schema({
  bookname: {
    type: String,
    required: [true, "User Name is Required"],
    unique: false,
  },
  authorname: {
    type: String,
    required: [true, "Author Name is Required"],
  },
  depname: {
    type: String,
    required: [true, "Department Name is Required"],
  },
  book: {
    type: String,
    required: [true, "Book URL is required"],
  },
});
const newbook = mongoose.model("Newbooks", UploadbookSchema);
module.exports = newbook;
