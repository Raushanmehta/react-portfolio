import axios from "axios";

const api = axios.create({
  baseURL: "https://portfolio-api-7m6m.a.com/api/v1",
  withCredentials: true,
});

export default api;