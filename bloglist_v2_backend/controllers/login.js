const loginRouter = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { EXPIRY_TIME } = require("../utils/config");

loginRouter.post("/", async function (request, response, next) {
  try {
    const body = request.body;

    const user = await User.findOne({ username: body.username });

    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response
        .status(401)
        .json({ error: "Invalid Username or Password!!!" });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: EXPIRY_TIME,
    });

    response
      .status(200)
      .json({ token, username: user.username, userId: user._id });
  } catch (error) {
    next(error);
  }
});

loginRouter.get("/", async function (request, response, next) {
  try {
    console.log("error");
    if (request?.userId) {
      return response
        .status(200)
        .json({ userId: request.userId, username: request.username });
    }
    return response.status(401).json({});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = loginRouter;
