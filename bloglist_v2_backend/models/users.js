const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  passwordHash: { type: String, required: true },
  blogsAdded: {
    type: Number,
    default: 0,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  likedBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likedComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    try {
      returnedObject.id = returnedObject._id.toString();
    } catch (err) {}
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
