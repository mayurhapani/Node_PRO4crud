const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://hapanimayur:Love1224@cluster0.iyurgqh.mongodb.net/bookData");

const bookSchema = new mongoose.Schema({
  bookname: {
    type: String,
    required: true,
  },
  bookauth: {
    type: String,
    required: true,
  },
  booksub: {
    type: String,
    required: true,
  },
  bookdisc: {
    type: String,
    required: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const bookModel = mongoose.model("books", bookSchema);
module.exports = bookModel;
