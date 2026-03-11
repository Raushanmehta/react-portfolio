import api from "./axios";

export const getAllProjects = () => {
  return api.get("/project/getall");
};

export const getProject = (id) => {
  return api.get(`/project/get/${id}`);
};