import api from "./axios";

export const getAllApplications = () => {
  return api.get("/softwareapplication/getall");
};