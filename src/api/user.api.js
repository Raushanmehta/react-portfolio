import api from "./axios";

export const getMyProfile = () => {
  return api.get("/user/me/portfolio");
};