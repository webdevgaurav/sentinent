require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const { compareHashedPassword } = require("../services/Common");
const authenticateToken = require('../middleware/authenticationToken');

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.query.email,
    });
    if (!user) {
      res.status(201).json({ error: "Wrong Email" });
    }
    const matched = await compareHashedPassword(
      req.query.password,
      user.password
    );
    if (matched) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(201).json({ token, user });
    } else {
      return res
        .status(401)
        .json({ message: "Incorrect username or password" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/profile', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  res.json({ userId });
});

router.get("/logout", (req, res) => {
  // Logout logic
});

module.exports = router;
