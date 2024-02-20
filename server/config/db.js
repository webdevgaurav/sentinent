const mongoose = require("mongoose");
require("dotenv").config();

const { DB_CONNECT } = process.env;
mongoose.connect(DB_CONNECT);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
