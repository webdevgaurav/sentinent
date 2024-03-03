const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  userType: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile: {
    type: String,
  },
  rating: {
    type: Number,
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
  status: {
    type: String,
  },
  lastLoggedIn: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.virtual("fullname").get(function () {
  return this.firstname + " " + this.lastname;
});

const User = mongoose.model("users", userSchema);

module.exports = User;
