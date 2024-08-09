require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { compareHashedPassword } = require("../services/Common");

const generateToken = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email" });
    }
    const matched = await compareHashedPassword(password, user.password);
    if (matched) {
      const accessToken = jwt.sign(
        { userId: user._id, userType: user.userType },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );
      const refreshToken = jwt.sign(
        { userId: user._id, userType: user.userType },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "dev" ? false : true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "dev" ? false : true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      delete user.password;
      return res.status(201).json({
        message: "Logged in succesfully",
        user,
      });
    } else {
      return res.status(401).json({ message: "Incorrect email or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const authenticateToken = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Access Token not provided" });
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      let message = "Authentication failed. Invalid access token";
      if (err.message === "jwt expired")
        message = "Authentication failed. Access token expired";
      return res.status(403).json({ message });
    }
    if (["POST", "PUT"].includes(req.method) && decoded.userType != "admin") {
      message = "Unauthorized access";
      return res.status(403).json({ message });
    }
    req.user = decoded;
    next();
  });
};

const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Refresh Token not provided" });
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      let message = "Authentication failed. Invalid refresh token";
      if (err.message === "jwt expired")
        message =
          "Authentication failed. Refresh token expired. Please login again";
      return res.status(403).json({ message });
    }
    const accessToken = jwt.sign(
      { userId: decoded._id, userType: decoded.userType },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "dev" ? false : true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    req.user = decoded;
    res.status(201).json({ message: "Token generated successfully" });
  });
};

const authStatus = (req, res) => {
  res.status(201).json({ loggedIn: true, user: req.user });
};

const removeCookies = (req, res) => {
  try {
    res.cookie("access_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "dev" ? false : true,
      sameSite: "strict",
      maxAge: -1,
    });
    res.cookie("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "dev" ? false : true,
      sameSite: "strict",
      maxAge: -1,
    });
    return res.status(201).json({ message: "logged out succesfully" });
  } catch (error) {
    return res.status(401).json({ message: error });
  }
};

module.exports = {
  generateToken,
  authenticateToken,
  refreshToken,
  authStatus,
  removeCookies,
};
