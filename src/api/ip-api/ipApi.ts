import axios from "axios";

export const ipApi = axios.create({
  baseURL: "http://ip-api.com/json",
});
