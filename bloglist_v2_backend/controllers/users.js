const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");

userRouter.get("/", async (request, response, next) => {
  try {
    const id = request.params.id ? request.params.id : request.userId;
    if (id.length !== 24) {
      return response.json([]);
    }
    const user = await User.findById(request.userId);
    if (user) {
      const users = await User.find({});
      return response.json(
        users.map((u) => ({ name: u.name, blogs: u.blogsAdded, userId: u._id }))
      );
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

userRouter.post("/", async function (request, response, next) {
  try {
    const saltRound = 10;
    const body = request.body;

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: await bcrypt.hash(body.password, saltRound),
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser.toJSON());
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
