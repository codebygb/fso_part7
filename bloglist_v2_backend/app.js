const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { info } = require("./utils/logger");
const { MONGODB_URI, PORT } = require("./utils/config");
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/users");
const requestLogger = require("./middleware/requestLogger");
const blogRouter = require("./controllers/blogs");
const { userExtactor, getToken } = require("./middleware/tokenHelper");
const { errorHandler } = require("./middleware/errorHandler");
const commentRouter = require("./controllers/comments");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info("Connected to MongoDB");
  })
  .catch((error) => {
    error("Error connecting to MongoDB:", error);
  });

app.use(cors());
app.use(express.json());
app.use(getToken);
app.use(userExtactor);
app.use(requestLogger);
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);
app.use(errorHandler);

app.get("/api/status", (request, response) => {
  response.status(200).send("Hello, World!");
});

module.exports = app;
