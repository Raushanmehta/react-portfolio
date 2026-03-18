import api from "./axios";

export const getAllArticles = () => {
  return api.get("/articles/getall");
};

export const getArticleBySlug = (slug) => {
  return api.get(`/articles/${slug}`);
};