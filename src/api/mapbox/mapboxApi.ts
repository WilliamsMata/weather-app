import axios from "axios";

export const mapboxApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 3,
    language: "en",
    access_token:
      "pk.eyJ1Ijoid2lsbGlhbXM5OSIsImEiOiJjbGI4NGUzZjIwaGVwM3dwamE2ZjBranJhIn0.ox4uTNzyZ6uqm1GhR6hlmw",
  },
});
