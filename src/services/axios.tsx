import axios from "axios";

const baseUrl = "http://localhost:3000/";

const api = axios.create({
  baseURL: baseUrl,
});

// handle before call API
const handleBefore = (config: any) => {
  // Retrieve the token and attach it to the request
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(handleBefore, (error) => Promise.reject(error));

export default api;
