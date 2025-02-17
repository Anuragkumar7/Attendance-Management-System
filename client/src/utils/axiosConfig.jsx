import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:8082/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
