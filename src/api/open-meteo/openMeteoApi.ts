import axios from "axios";

export const openMeteoApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
});
