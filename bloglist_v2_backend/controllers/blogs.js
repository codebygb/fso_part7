const Blog = require("../models/blogs");
const comments = require("../models/comments");
const User = require("../models/users");
const blogRouter = require("express").Router();

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const id = request.params.id;

    if (id.length !== 24) {
      return response.json([]);
    }

    const user = await User.findById(request.userId);
    if (user) {
      const blog = await Blog.findById(id);
      console.log(blog);
      return response.json(blog);
    }
  } catch (err) {
    next(err);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const user = await User.findById(request.userId);
    if (user) {
      const blog = await new Blog({
        ...request.body,
        user: request.userId,
        likes: 0,
      }).save();
      if (blog) {
        user.blogs = user.blogs.concat(blog._id);
        user.blogsAdded += 1;
        await user.save();
        return response.status(201).json(blog);
      }
    }
    return response.status(404).json({ error: "User not found :(" });
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/like", async (request, response, next) => {
  try {
    const user = await User.findById(request.userId);
    if (user) {
      const blog = await Blog.findById(request.body.blogId);
      if (!blog.likedBy.includes(request.userId)) {
        blog.likedBy.push(request.userId);
        blog.likes = blog.likes + 1;
        user.likedBlogs = blog.id;
        blog.save();
        user.save();
        return response.status(201).json({
          ...blog.toJSON(),
        });
      }
      return response.status(409).json({ error: "Already Liked!" });
    }
    return response.status(404).json({ error: "User not found :(" });
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/user/:id", async (request, response, next) => {
  try {
    const id = request.params.id ? request.params.id : request.userId;
    if (id.length !== 24) {
      return response.json([]);
    }
    const user = await User.findById(request.userId);
    if (user) {
      const blogs = await Blog.find({ user: id });
      return response.json(blogs);
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/comments/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate({
      path: "comments",
      populate: "user",
    });
    return response.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
