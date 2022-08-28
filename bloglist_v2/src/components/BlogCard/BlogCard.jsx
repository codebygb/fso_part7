import "./BlogCard.css";
import like from "../../assets/icons/thumb_up.svg";
import link from "../../assets/icons/link.svg";
import { useSelector, useDispatch } from "react-redux";

import React, { useEffect } from "react";
import { likeBlog } from "../../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import { getActiveBlog } from "../../features/blog/activeBlogSlice";

export default function BlogCard({ blog }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeBlog = useSelector((state) => state.activeBlog);
  const handleLike = () => {
    dispatch(likeBlog(blog.id));
  };

  const handleOpen = () => {
    dispatch(getActiveBlog(blog.id));
  };

  useEffect(() => {
    if (activeBlog && Object.keys(activeBlog).length !== 0) {
      return navigate("/blog", { replace: true });
    }
  }, [activeBlog]);

  return (
    <div className="blog-card">
      <div className="blog-container">
        <div className="blog-card-author">
          {blog.author !== "" ? blog.author : "Unknown"}
        </div>
        <div className="blog-card-title" onClick={() => handleOpen()}>
          {blog.title}
        </div>
        <div className="blog-interact">
          <div className="blog-interact-container">
            <img src={link} alt="" className="link" />
            <a href={blog.url} className="url" target={"_blank"}>
              {blog.url}
            </a>
          </div>

          <div className="blog-interact-container">
            <img
              src={like}
              alt=""
              className="like"
              onClick={() => handleLike()}
            />
            <span className="like">{blog.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
