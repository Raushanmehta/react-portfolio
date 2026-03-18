import api from "./axios";

export const sendMessage = async (payload) => {
  const { data } = await api.post("/message/send", payload);
  return data;
};