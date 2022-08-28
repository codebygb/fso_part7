import React, { useEffect } from "react";
import BlogCard from "../BlogCard/BlogCard";
import "./BlogList.css";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../../features/blog/blogSlice";
import Notification from "../Notification/Notification";
import { useLocation } from "react-router-dom";
import { removeActiveBlog } from "../../features/blog/activeBlogSlice";

export default function BlogList() {
  const location = useLocation();
  const user = location.state;
  const blogs = useSelector((state) => (state.blogs ? state.blogs : []));
  const userId = user ? user : useSelector((state) => state.login.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeActiveBlog());
    dispatch(getBlogs(userId));
  }, []);

  return (
    <>
      <div className="blog-list">
        {blogs.map((e) => {
          return <BlogCard blog={e} key={e.id} />;
        })}
      </div>
      <Notification />
    </>
  );
}
