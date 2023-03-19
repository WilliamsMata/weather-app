import { useContext } from "solid-js";
import { createQuery } from "@tanstack/solid-query";

import { mapboxApi } from "./";
import { AppContext } from "../../context";
import { Feature, Mapbox } from "../../interfaces";

export const getMapboxApi = async (city: string): Promise<Feature[]> => {
  const { data } = await mapboxApi.get<Mapbox>(`/${city}.json`);
  // console.log(data.features);
  return data.features;
};

export const mapboxProvider = () => {
  const [state] = useContext(AppContext);

  const mapboxQuery = createQuery(
    () => ["mapbox", state.search],
    () => getMapboxApi(state.search),
    {
      staleTime: 1000 * 60 * 60,
      get enabled() {
        return state.search.length > 1;
      },
    }
  );

  return mapboxQuery;
};
