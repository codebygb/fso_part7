const Blog = require("../models/blogs");
const Comment = require("../models/comments");
const User = require("../models/users");
const commentRouter = require("express").Router();

// commentRouter.get("/:id?", async (request, response, next) => {
//   try {
//     const id = request.params.id ? request.params.id : request.userId;
//     if (id.length !== 24) {
//       return response.json([]);
//     }
//     const user = await User.findById(request.userId);
//     if (user) {
//       const blog = await Blog.findById(id);
//       return response.json(blog);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

commentRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const blogId = body.blogId;
    const message = body.comment;
    if (message.trim() === "") {
      return response.status(200).json({ message: "Comment cannot be empty" });
    }
    const user = await User.findById(request.userId);
    const blog = await Blog.findById(blogId);
    if (user && blog) {
      const comment = await new Comment({
        blogId: blogId,
        message: message,
        user: request.userId,
        likes: 0,
      }).save();
      if (comment) {
        user.comments.push(comment._id);
        await user.save();
        blog.comments.push(comment._id);
        await blog.save();
        return response.status(201).json(comment);
      }
    }
    return response.status(404).json({ error: "User not found :(" });
  } catch (error) {
    next(error);
  }
});

commentRouter.put("/like", async (request, response, next) => {
  try {
    const user = await User.findById(request.userId);
    const commentId = request.body.commentId;
    if (user) {
      const comment = await Comment.findById(commentId);
      if (!comment.likedBy.includes(request.userId)) {
        comment.likedBy.push(request.userId);
        comment.likes = comment.likes + 1;
        user.likedComments = comment.id;
        comment.save();
        user.save();
        return response.status(201).json({
          ...comment.toJSON(),
        });
      }
      return response.status(200).json({ message: "Already Liked!" });
    }
    return response.status(404).json({ error: "User not found :(" });
  } catch (error) {
    next(error);
  }
});

module.exports = commentRouter;
