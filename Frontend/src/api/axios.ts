import axios from "axios";
import { getToken } from "../utils/storage";

const instance = axios.create({
  baseURL: "http://10.0.2.2:8000", // FastAPI running on localhost
});

// Attach JWT token for each request
instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
