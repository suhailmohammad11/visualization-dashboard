import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api"
});

export const fetchInsights = (filters = {}) => {
  return API.get("/insights", { params: filters });
};

export const fetchMeta = (field) => {
  return API.get(`/meta/${field}`);
};
