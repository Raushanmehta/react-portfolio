import api from "./axios";

export const getAllTimelines = () => {
    return api.get("/timeline/getall");
};