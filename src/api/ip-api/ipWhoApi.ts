import axios from "axios";

export const ipWhoApi = axios.create({
  baseURL: "https://ipwho.is/",
});
