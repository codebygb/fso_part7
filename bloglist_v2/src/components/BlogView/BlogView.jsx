import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addBlogComment,
  getActiveBlog,
  removeActiveBlog,
} from "../../features/blog/activeBlogSlice";
import BlogCard from "../BlogCard/BlogCard";
import "./BlogView.css";

const BlogView = () => {
  const params = useParams();
  const blog = useSelector((state) => state.activeBlog);
  const username = useSelector((state) => state.login.username);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (val) => {
    setComment(val);
  };

  useEffect(() => {
    if (
      !("blogId" in params) &&
      blog &&
      Object.keys(blog).length === 0 &&
      Object.getPrototypeOf(blog) === Object.prototype
    ) {
      return navigate("/bloglist", { replace: true });
    }
    setComments(blog?.comments ?? []);
  }, [blog]);

  useEffect(() => {
    if ("blogId" in params) {
      dispatch(getActiveBlog(params.blogId));
    }
    return () => {
      dispatch(removeActiveBlog());
    };
  }, []);

  const addNewComment = () => {
    dispatch(addBlogComment(blog.id, comment));
    setComment("");
  };

  return (
    <div className="blog-view-container">
      <BlogCard className="blog-card-container" blog={blog} />
      <div className="blog-comment-container">
        <div className="blog-comments">
          {comments.map((c) => (
            <div className="comment-container" key={c.id}>
              <div className="comment">{c.message}</div>
              <div className="comment-user">
                - {c.user.username === username ? "You" : c.user.username}
              </div>
            </div>
          ))}
        </div>
        <label htmlFor="comment" className="blog-url-label">
          Add Comment
        </label>
        <input
          type="url"
          name="comment"
          id="comment"
          className="blog-comment-ip"
          onChange={(e) => onChange(e.target.value)}
          value={comment}
        />
        <button className="btn-add-comment" onClick={() => addNewComment()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default BlogView;
