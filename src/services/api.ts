import axios from "axios";

const api = axios.create({
  baseURL: "http://myapp.local/php-wedding",
  // headers: {
  //   "Content-Type": "multipart/form-data",
  // },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
