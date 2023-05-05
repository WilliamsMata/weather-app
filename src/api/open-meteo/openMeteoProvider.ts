import { useContext } from "solid-js";
import { createQuery } from "@tanstack/solid-query";

import { openMeteoApi } from "./";
import { OpenMeteo, Settings } from "../../interfaces";
import { AppContext } from "../../context";

interface Props {
  lat: number;
  lon: number;
  settings: Settings;
}

export const getOpenMeteoApi = async ({
  lat,
  lon,
  settings,
}: Props): Promise<OpenMeteo> => {
  const { data } = await openMeteoApi.get("/forecast", {
    params: {
      latitude: lat,
      longitude: lon,
      temperature_unit: settings.temperature.toLowerCase(),
      windspeed_unit: settings.wind,
      hourly:
        "temperature_2m,apparent_temperature,precipitation_probability,weathercode,pressure_msl,windspeed_10m",
      daily: "weathercode,temperature_2m_max,temperature_2m_min",
      timezone: "auto",
      current_weather: true,
    },
  });
  // console.log(data);
  return data;
};

export const openMeteoProvider = () => {
  const [state] = useContext(AppContext);

  const openMeteoQuery = createQuery(
    () => [
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
      get enabled() {
        return state.location.isOk;
      },
    }
  );

  return openMeteoQuery;
};
