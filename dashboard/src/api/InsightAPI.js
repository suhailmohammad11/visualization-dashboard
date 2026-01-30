import axios from "axios";

const API = axios.create({
  baseURL: "https://visualization-dashboard-eq6z.onrender.com/api",
});

export const fetchInsights = (filters = {}) => {
  return API.get("/insights", { params: filters });
};

export const fetchMeta = (field) => {
  return API.get(`/meta/${field}`);
};
