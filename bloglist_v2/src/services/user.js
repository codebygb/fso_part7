import axiosInstance from "./instance";
const baseUrl = "/api/users";

const getAllUsers = async () => {
  const response = await axiosInstance().get(`${baseUrl}`);
  return response.data;
};
const userService = {
  getAllUsers,
};
export default userService;
