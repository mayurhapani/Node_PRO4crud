const express = require("express");
const app = express();
const db = require("./config/database");
const bookModel = require("./models/book");
const multer = require("multer");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

let editedBook = {};
let isId = "";

// file upload middelware start

const fileUpload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const imageUpload = multer({ storage: fileUpload }).single("image");
// file upload middelware end

app.get("/", async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.render("index", { books, editedBook, isId });
  } catch (err) {
    console.log(err);
    return false;
  }
});

app.post("/addBook", imageUpload, async (req, res) => {
  const { bookname, bookauth, booksub, bookdisc, mrp, price } = req.body;
  let image = req.file.path || "";

  if (isId) {
    try {
      let book = await bookModel.findOneAndUpdate(
        { _id: isId },
        { bookname, bookauth, booksub, bookdisc, mrp, price, image }
      );
    } catch (err) {
      console.log(err);
      return false;
    }
    isId = "";
    editedBook = {};
    return res.redirect("/");
  }

  try {
    let book = await bookModel.create({ bookname, bookauth, booksub, bookdisc, mrp, price, image });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    return false;
  }
});

app.get("/deleteData", async (req, res) => {
  try {
    let user = await bookModel.findOneAndDelete({ _id: req.query.id });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    return false;
  }
});

app.get("/editData", async (req, res) => {
  try {
    editedBook = await bookModel.findOne({ _id: req.query.id });
    isId = req.query.id;
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    return false;
  }
});

app.listen(8002, (err) => {
  if (!err) console.log("Server is running on http://localhost:8002");
});
