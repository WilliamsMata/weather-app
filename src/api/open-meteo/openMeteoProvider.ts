import { createQuery } from "@tanstack/solid-query";
import { OpenMeteo } from "../../interfaces/OpenMeteo";
import { openMeteoApi } from "./openMeteoApi";
import { useLocationStore } from "../../store/useLocationStore";
import { Settings } from "../../interfaces/Settings";

const { location } = useLocationStore();

interface Props {
  lat: number;
  lon: number;
  settings: Settings;
}

const getOpenMeteoApi = async ({
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
      precipitation_unit: settings.precipitation.toLowerCase(),
      hourly:
        "temperature_2m,apparent_temperature,precipitation_probability,weathercode,pressure_msl,windspeed_10m",
      daily: "weathercode,temperature_2m_max,temperature_2m_min",
      timezone: "America/New_York",
    },
  });
  console.log(data);
  return data;
};

export const openMeteoProvider = ({ lat, lon, settings }: Props) => {
  const openMeteoQuery = createQuery(
    () => ["open-meteo", { lat, lon, settings }],
    () => getOpenMeteoApi({ lat, lon, settings }),
    {
      get enabled() {
        return location.isOk;
      },
    }
  );

  return openMeteoQuery;
};
