import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/login/loginSlice";
import blogReducer from "./features/blog/blogSlice";
import userReducer from "./features/user/userSlice";
import loggedInReducer from "./features/global/globalSlice";
import activeBlogReducer from "./features/blog/activeBlogSlice";
import notificationReducer from "./features/notifications/notificationSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    blogs: blogReducer,
    notifications: notificationReducer,
    loggedIn: loggedInReducer,
    users: userReducer,
    activeBlog: activeBlogReducer,
  },
});
