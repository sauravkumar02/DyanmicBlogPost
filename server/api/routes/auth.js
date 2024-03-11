const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../../model/auth");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

router.post("/user/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(200).json({
            newUser: result,
          });
        })
        .catch((result) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});

router.post("/user/login", (req, res) => {
  User.find({ email: req.body.email })
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "user not found",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            message: "Wrong Password",
          });
        }
        const token = jwt.sign(
          {
            email: user[0].email,
            fullName: user[0].fullName,
          },
          "i am sk",
          {
            expiresIn: "365d",
          }
        );
        res.status(200).json({
          email: user[0].email,
          fullName: user[0].fullName,
          token: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/admin/login", (req, res) => {
  if (req.body.email === "sam@gmail.com" && req.body.password === "123") {
    const token = jwt.sign(
      {
        email: "sam@gmail.com",
        fullName: "Sam",
      },
      "i am sk",
      {
        expiresIn: "365d",
      }
    );
    res.status(200).json({
      email: "sam@gmail.com",
      fullName: "Sam",
      token: token,
    });
  } else {
    res.status(404).json({
      message: "Bad Request",
    });
  }
});

router.post("/user/reset-password", (req, res) => {
  const { email, token } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      console.log(user.resetPasswordToken);
      return user.save();
    })
    .then(() => {
      res.status(200).json({ message: "Password reset email sent" });
    })
    .catch((error) => {
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "Error resetting password" });
    });
});

router.post("/user/reset-password/:token", (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      return user.save();
    })
    .then(() => {
      res.status(200).json({ message: "Password reset successful" });
    })
    .catch((error) => {
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "Error resetting password" });
    });
});

module.exports = router;
