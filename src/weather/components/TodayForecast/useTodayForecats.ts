import { useContext, createSignal, createEffect } from "solid-js";

import { openMeteoProvider } from "../../../api/open-meteo";
import { AppContext } from "../../../context";

interface TodayData {
  hour: string;
  weatherCode: number;
  temperature: number;
}

export const useTodayForecast = () => {
  const openMeteoQuery = openMeteoProvider();
  const [state] = useContext(AppContext);

  const [todayData, setTodayData] = createSignal<TodayData[]>([]);

  createEffect(() => {
    if (openMeteoQuery.isSuccess) {
      setTodayData([
        {
          hour: state.settings["12-hour-time"] ? "6:00 AM" : "6:00",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[6] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[6] || 0,
        },
        {
          hour: state.settings["12-hour-time"] ? "9:00 AM" : "9:00",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[9] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[9] || 0,
        },
        {
          hour: state.settings["12-hour-time"] ? "12:00 PM" : "12:00",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[12] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[12] || 0,
        },
        {
          hour: state.settings["12-hour-time"] ? "3:00 PM" : "15:00",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[15] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[15] || 0,
        },
        {
          hour: state.settings["12-hour-time"] ? "6:00 PM" : "18:00",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[18] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[18] || 0,
        },
        {
          hour: state.settings["12-hour-time"] ? "9:00 PM" : "21:00",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[21] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[21] || 0,
        },
      ]);
    }
  });

  return {
    openMeteoQuery,
    todayData,
  };
};
