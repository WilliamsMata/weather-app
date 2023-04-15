import { QueryClient } from "@tanstack/solid-query";

import { getOpenMeteoApi } from "../api/open-meteo";
import { AppContextProps } from "../context";

export const updateWeatherQuery = (
  state: AppContextProps,
  queryClient: QueryClient
) => {
  queryClient.prefetchQuery(
    [
      "open-meteo",
      {
        lat: state.location.lat,
        lon: state.location.lon,
        settings: state.settings,
      },
    ],
    () =>
      getOpenMeteoApi({
        lat: state.location.lat,
        lon: state.location.lon,
        settings: state.settings,
      }),
    {
      staleTime: 1000 * 60 * 60,
    }
  );
};
