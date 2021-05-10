require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// routers
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const blogRouter = require("./routes/blog");

class App {
  constructor() {
    this.app = express();
    this.uses();
    this.routes();
  }

  uses() {
    // middlewares
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "public")));
  }

  routes() {
    // routes
    this.app.use("/", indexRouter);
    this.app.use("/api/v1/auth", authRouter);
    this.app.use("/api/v1/users", usersRouter);
    this.app.use("/api/v1/blog", blogRouter);
  }
}

module.exports = new App().app;
