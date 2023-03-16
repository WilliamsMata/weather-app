import axios from "axios";

export const jsonIpApi = axios.create({
  baseURL: "https://ipv4.jsonip.com/",
});
