var express = require("express");
var router = express.Router();
// This is for server side validation
const { check, validationResult } = require("express-validator");
var userinfo = require("../models/userinfo");
var usercomment = require("../models/usercomments");
var newbook = require("../models/upload");
const app = require("../app");
// This is for uploading files
const path = require("path");
const crypto = require("crypto");
var mongoose = require("mongoose");
//To view entered data in json format on console log
const bodyParser = require("body-parser");
const { db } = require("../models/userinfo");
const { contains } = require("jquery");

/* GET index page of web application */
router.get("/", function (req, res, next) {
  res.render("index");
});

/* GET  signin page of my bookido */
router.get("/signin", function (req, res, next) {
  res.render("signin");
});
/* GET adminlogin page. */
router.get("/adminlogin", function (req, res, next) {
  res.render("adminlogin");
});
/* GET admin page. */
router.get("/admin", function (req, res, next) {
  res.render("admin");
});
/* Authorize Admin */
router.post("/authorizeadmin", async function (req, res, next) {
  let admin_name = req.body.name;
  let admin_password = req.body.password;
  if (admin_name.match("maankhan") && admin_password.match("pakistan117"))
    return res.redirect("admin");
  else return res.redirect("/adminlogin");
});

/* GET signup page. */
router.get("/signup", function (req, res, next) {
  res.render("signup");
});
// Go to signin page after registeration
router.post("/welcome", async function (req, res, next) {
  let register_user = new userinfo(req.body);
  await register_user.save();
  res.redirect("signin");
});
// Authorize user credentials through database data
router.post("/signin", async function (req, res, next) {
  let authorize_user = await userinfo.findOne({
    name: req.body.name,
    password: req.body.password,
  });
  if (!authorize_user) return res.send("USER NOT FOUND");
  req.session.user = authorize_user;
  return res.redirect("welcome");
});
// After authorrization take user to welcome page
router.get("/welcome", async function (req, res, next) {
  res.render("welcome");
});

/* GET upload page */
router.get("/upload", async function (req, res, next) {
  res.render("upload");
});
// Upload Book in DB
router.post("/upload", async function (req, res, next) {
  let book = new newbook(req.body); //fetching all the data from upload page and storing it in variable book
  console.log(book);
  await book.save(); //waiting for saving data in database
  res.redirect("available"); //redirecting user to "available" page to let him see the added book
});
/* GET available books */
router.get("/available", async function (req, res, next) {
  let books = await newbook.find(); //get all the book data present in DB in this array named books
  console.log(books);
  res.render("available", { heading: "Available Books", books: books }); //go to available.pug and take these variables there
});
/* BOOKS AVAILABLE TO USERS */
router.get("/SE", async function (req, res, next) {
  let books = await newbook.find(); //get all the book data present in DB in this array named books
  console.log(books);
  res.render("SE", { heading: "Available Books", books: books }); //go to available.pug and take these variables there
});

/* GET comments */
router.get("/comment", async function (req, res, next) {
  let comment = await usercomment.find();
  // console.log(comment);
  res.render("comment", { heading: "Comments in DB", comment });
});

//Edit Book Info
router.get("/edit/:id", async function (req, res, next) {
  let edit_book = await newbook.findById(req.params.id);
  res.render("edit", { edit_book });
});
//when editting is done; upon submit do all of this
router.post("/edit/:id", async function (req, res, next) {
  let editted_book = await newbook.findById(req.params.id);
  editted_book.bookname = req.body.bookname;
  editted_book.authorname = req.body.authorname;
  editted_book.depname = req.body.depname;
  book_newurl = req.body.bookurl;
  await editted_book.save();
  // res.send("done:)");
  res.redirect("/available");
});

// Delete a Book by its id
router.get("/delete/:id", async function (req, res, next) {
  let selectedbook = await newbook.findByIdAndDelete(req.params.id);
  res.redirect("/available");
});

/* GET users. */
router.get("/userinfo", async function (req, res, next) {
  let user = await userinfo.find();
  // console.log(user);
  res.render("userinfo", { title: "Users in DB", user });
});
// Delete a User Account by its id
router.get("/user/delete/:id", async function (req, res, next) {
  let selecteduser = await userinfo.findByIdAndDelete(req.params.id);
  res.redirect("/userinfo");
});

// Delete a Book by its id
router.get("/comment/delete/:id", async function (req, res, next) {
  let selectedcomment = await usercomment.findByIdAndDelete(req.params.id);
  res.redirect("/comment");
});

/* SE DEPARTMENT */
router.get("/SE", function (req, res, next) {
  res.render("SE");
});

/* Log Out */
router.get("/logout", function (req, res, next) {
  req.session.user = null;
  res.redirect("/");
});
module.exports = router;
