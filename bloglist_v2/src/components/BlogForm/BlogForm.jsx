import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../features/blog/blogSlice";
import "./BlogForm.css";
import Notification from "../Notification/Notification";

const BlogForm = () => {
  const initialState = {
    title: "",
    url: "",
    author: "",
  };
  const [blog, setBlog] = useState(initialState);
  const user = useSelector((state) => state.login.userId);
  const dispatch = useDispatch();

  const onChange = (el, val) => {
    setBlog({ ...blog, [el]: val });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    dispatch(createBlog({ ...blog, user }));
    setBlog(initialState);
  };

  return (
    <>
      <div className="form-container">
        <form className="blog-form" onSubmit={(e) => handleFormSubmit(e)}>
          <div className="blog-title blog-item">
            <label htmlFor="title" className="blog-title-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="blog-title-ip"
              onChange={(e) => onChange("title", e.target.value)}
              required="required"
              value={blog.title}
            />
          </div>
          <div className="blog-author blog-item">
            <label htmlFor="author" className="blog-author-label">
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              className="blog-author-ip"
              onChange={(e) => onChange("author", e.target.value)}
              required="required"
              value={blog.author}
            />
          </div>
          <div className="blog-url blog-item">
            <label htmlFor="url" className="blog-url-label">
              URL
            </label>
            <input
              type="url"
              name="url"
              id="url"
              className="blog-url-ip"
              onChange={(e) => onChange("url", e.target.value)}
              required="required"
              value={blog.url}
            />
          </div>
          <button className="button" onClick={() => handleSubmit()}>
            Submit
          </button>
        </form>
      </div>
      <Notification />
    </>
  );
};
export default BlogForm;
