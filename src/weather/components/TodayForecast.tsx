import {
  Component,
  For,
  Switch,
  Match,
  createSignal,
  createEffect,
} from "solid-js";
import { TodayForecastItem } from "./TodayForecastItem";
import { openMeteoProvider } from "../../api/open-meteo/openMeteoProvider";
import { useLocationStore } from "../../store/useLocationStore";
import { useSettingsStore } from "../../store/useSettingsStore";
import { LoadingSpiner } from "./LoadingSpiner";

interface Props {
  class?: string;
  days: number;
}

interface TodayData {
  hour: string;
  weatherCode: number;
  temperature: number;
}

export const TodayForecast: Component<Props> = (props) => {
  const { settings } = useSettingsStore();
  const { location } = useLocationStore();

  const openMeteoQuery = openMeteoProvider({
    lat: location.lat,
    lon: location.lon,
    settings,
  });

  const [todayData, setTodayData] = createSignal<TodayData[]>([]);

  createEffect(() => {
    if (openMeteoQuery.isSuccess) {
      setTodayData([
        {
          hour: "6:00 AM",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[6] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[6] || 0,
        },
        {
          hour: "9:00 AM",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[9] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[9] || 0,
        },
        {
          hour: "12:00 PM",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[12] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[12] || 0,
        },
        {
          hour: "3:00 PM",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[15] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[15] || 0,
        },
        {
          hour: "6:00 PM",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[18] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[18] || 0,
        },
        {
          hour: "9:00 PM",
          weatherCode: openMeteoQuery.data?.hourly.weathercode[21] || 0,
          temperature: openMeteoQuery.data?.hourly.temperature_2m[21] || 0,
        },
      ]);
    }
  });

  return (
    <article class={props.class}>
      <Switch>
        <Match when={openMeteoQuery.isLoading}>
          <LoadingSpiner />
        </Match>

        <Match when={openMeteoQuery.isSuccess}>
          <p class="text-xs font-bold text-slate-400">TODAY'S FORECAST</p>
          <div class="flex h-full justify-evenly gap-2 py-4">
            <For each={todayData().slice(0, props.days)}>
              {(data) => (
                <TodayForecastItem
                  ref={data.hour}
                  hour={data.hour}
                  temperature={data.temperature}
                  weatherCode={data.weatherCode}
                />
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </article>
  );
};
