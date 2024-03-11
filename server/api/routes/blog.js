const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Blog = require("../../model/blog");

// sending blog post
router.post("/", (req, res) => {
  const newBlog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.descrption,
    imageUrl: req.body.imageUrl,
    category: req.body.category,
    content: req.body.content,
    createdAt: new Date(),
  });
  newBlog
    .save()
    .then((result) => {
      res.status(200).json({
        new_blog: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//get blog
router.get("/", (req, res) => {
  Blog.find()
    .then((result) => {
      res.status(200).json({
        blog: result,
      });
    })
    .catch((result) => {
      res.status(500).json({
        error: err,
      });
    });
});

//get by id
router.get("/:id", (req, res) => {
  Blog.find({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        blog: result,
      });
    })
    .catch((result) => {
      res.status(500).json({
        error: err,
      });
    });
});

//delete blog
router.delete("/:id", (req, res) => {
  Blog.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        blog: result,
      });
    })
    .catch((result) => {
      res.status(500).json({
        error: err,
      });
    });
});

//update blog
router.put("/:id", (req, res) => {
  Blog.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.status(200).json({
        UpdatedOne: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//count blog

router.get("/get/count", (req, res) => {
  Blog.find()
    .countDocuments()
    .then((result) => {
      res.status(200).json({
        total: result,
      });
    })
    .catch((result) => {
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
