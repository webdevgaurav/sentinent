const mongoose = require("mongoose");
require("dotenv").config();

const { DB_CONNECT, DB_NAME } = process.env;
console.log(DB_CONNECT + DB_NAME);
mongoose.connect(DB_CONNECT + DB_NAME);
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
