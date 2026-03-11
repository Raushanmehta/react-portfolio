import api from "./axios";

export const getAllSkills = () => {
    return api.get("/skill/getall");
}