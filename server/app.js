require("dotenv").config();
require("./config/db");

const { DB_CONNECT } = process.env;
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const errorHandler = require("./utils/errorHandler");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// Initialize routes
const authRoutes = require("./routes/authRoutes");
const service = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");
const trainingRoutes = require("./routes/trainingRoutes");

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

app.set("trust proxy", 1);

const store = new MongoDBStore({
  uri: DB_CONNECT, // MongoDB connection URI
  collection: "sessions", // Collection name for sessions
});

// Catch errors
store.on("error", function (error) {
  console.error("Session store error:", error);
});

// Use the session middleware with options
app.use(
  session({
    secret: "v567hjgfsdxhsertvhetr",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", authRoutes);
app.use("/service", service);
app.use("/users", userRoutes);
app.use("/training", trainingRoutes);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  err.status = "failed";
  err.statusCode = 404;
  next(err);
});

app.use(errorHandler);
module.exports = app;
