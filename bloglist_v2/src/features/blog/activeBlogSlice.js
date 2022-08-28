import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../services/blog";
import { sendNotification } from "../notifications/notificationSlice";

export const activeBlogSlice = createSlice({
  name: "activeBlog",
  initialState: {},
  reducers: {
    setActiveBlog: (state, action) => action.payload,
    addComment: (state, action) => ({
      ...state,
      comments: state.comments.concat(action.payload),
    }),
    removeActiveBlog: (state, action) => {
      return {};
    },
  },
});

export const getActiveBlog = (blogId) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.getBlogComments(blogId);
      dispatch(setActiveBlog(blog));
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

export const addBlogComment = (blogId, comment) => {
  return async (dispatch) => {
    try {
      const response = await blogService.addBlogComment(blogId, comment);
      if (response === 201) {
        dispatch(
          addComment({
            message: comment,
            user: { name: "You" },
            id: Date.now(),
          })
        );
      }
    } catch (error) {}
  };
};

export const { setActiveBlog, addComment, removeActiveBlog } =
  activeBlogSlice.actions;

export default activeBlogSlice.reducer;
