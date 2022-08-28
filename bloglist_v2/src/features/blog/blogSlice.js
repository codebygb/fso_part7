import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blog";
import { sendNotification } from "../notifications/notificationSlice";

export const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => state.concat(action.payload),
    removeBlog: (state, action) =>
      state.filter((e) => e.id !== action.payload.id),
    updateBlog: (state, action) => {
      return state.map((e) => {
        if (e.id === action.payload.id) {
          return action.payload;
        }
        return e;
      });
    },
    getBlog: (state, action) => state.find((e) => e.id === action.payload.id),
  },
});

export const getBlogs = (userId) => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAllBlogs(userId);
      dispatch(setBlogs(blogs));
    } catch (error) {
      console.error(error);
      dispatch(
        sendNotification(
          error?.response?.data?.error || error.message,
          "error",
          5000,
          false
        )
      );
    }
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const result = await blogService.createBlogs(blog);
      dispatch(addBlog(result));
      dispatch(sendNotification("New Blog Added!!", "success", 5000, false));
    } catch (error) {
      console.error(error);
      dispatch(
        sendNotification(
          error?.response?.data?.error || error.message,
          "error",
          5000,
          false
        )
      );
    }
  };
};

export const likeBlog = (blogId) => {
  return async (dispatch) => {
    try {
      const result = await blogService.likeBlogs(blogId);
      dispatch(updateBlog(result));
      dispatch(sendNotification("Blog Liked!!", "success", 5000, false));
    } catch (error) {
      dispatch(
        sendNotification(
          error?.response?.data?.error ||
            error?.message ||
            "Failed to like blog",
          "error",
          5000,
          false
        )
      );
    }
  };
};

export const { setBlogs, addBlog, removeBlog, updateBlog, getBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
