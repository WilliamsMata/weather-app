import { useContext, createSignal, createEffect } from "solid-js";
import { openMeteoProvider } from "../../../api/open-meteo";
import { AppContext } from "../../../context";
import { getConsecutiveHours } from "../../../helpers";

interface TodayData {
  hour: string;
  weatherCode: number;
  temperature: number;
}

interface Hours {
  format12: string[];
  format24: string[];
}

export const useTodayForecast = () => {
  const openMeteoQuery = openMeteoProvider();
  const [state] = useContext(AppContext);

  const [currentHour, setCurrentHour] = createSignal<number>();
  const [consecutiveHours, setConsecutiveHours] = createSignal<Hours>();
  const [todayData, setTodayData] = createSignal<TodayData[]>([]);

  createEffect(() => {
    if (openMeteoQuery.isSuccess && openMeteoQuery.data) {
      const hour = new Date(
        openMeteoQuery.data.current_weather.time
      ).getHours();
      setCurrentHour(hour);
      setConsecutiveHours(getConsecutiveHours(hour));

      const hoursToAdd = [0, 3, 6, 9, 12, 15];

      const newData = hoursToAdd.map((hours) => {
        const index = currentHour()! + hours;

        return {
          hour: state.settings["12-hour-time"]
            ? consecutiveHours()!.format12[hours / 3]
            : consecutiveHours()!.format24[hours / 3],
          weatherCode: openMeteoQuery.data?.hourly.weathercode[index] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[index] || 0,
        };
      });

      setTodayData(newData);
    }
  });

  return {
    openMeteoQuery,
    todayData,
  };
};
