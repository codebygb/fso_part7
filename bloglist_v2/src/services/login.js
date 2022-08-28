import axiosInstance from "./instance";
const baseUrl = "/api/login";
const login = async (username, password) => {
  const response = await axiosInstance().post(baseUrl, {
    username,
    password,
  });
  return response.data;
};

const checkAuth = async () => {
  const response = await axiosInstance().get(baseUrl);
  return { data: response.data, status: response.status };
};
const loginService = { login, checkAuth };
export default loginService;
