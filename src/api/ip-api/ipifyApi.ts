import axios from "axios";

export const ipifyApi = axios.create({
  baseURL: "https://api.ipify.org",
  params: {
    format: "json",
  },
});
