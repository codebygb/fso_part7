import axios from "axios";
let baseUrl = "/api/notes";

let token = null;

export const setBaseUrl = (url) => {
  baseUrl = url;
};

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl} /${id}`, newObject);
  return response.data;
};
