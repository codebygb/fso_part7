import axiosInstance from "./instance";
const baseUrl = "/api/blogs";
const baseUrlComment = "/api/comments";

const getAllBlogs = async (userId) => {
  const response = axiosInstance().get(`${baseUrl}/user/${userId}`);
  return (await response).data;
};

const createBlogs = async (newObject) => {
  const response = await axiosInstance().post(baseUrl, newObject);
  return response.data;
};

const updateBlogs = async (id, newObject) => {
  const response = await axiosInstance().put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

const removeBlogs = async (id) => {
  const response = await axiosInstance().delete(`${baseUrl}/${id}`);
  return response.data;
};

const likeBlogs = async (id) => {
  const response = await axiosInstance().put(`${baseUrl}/like`, { blogId: id });
  return response.data;
};

const getBlogComments = async (id) => {
  const response = await axiosInstance().get(`${baseUrl}/comments/${id}`);
  return response.data;
};

const addBlogComment = async (blogId, comment) => {
  const response = await axiosInstance().post(`${baseUrlComment}`, {
    blogId,
    comment,
  });
  return response.status;
};

const blogService = {
  getAllBlogs,
  createBlogs,
  updateBlogs,
  removeBlogs,
  likeBlogs,
  getBlogComments,
  addBlogComment,
};
export default blogService;
