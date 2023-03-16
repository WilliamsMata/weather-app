import { Feature, Mapbox } from "../../interfaces/Mapbox";
import { mapboxApi } from "./mapboxApi";

export const getMapboxApi = async (city: string): Promise<Feature[]> => {
  const { data } = await mapboxApi.get<Mapbox>(`/${city}.json`);
  console.log(data.features);
  return data.features;
};
