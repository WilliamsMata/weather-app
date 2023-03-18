import {
  Component,
  For,
  Switch,
  Match,
  createSignal,
  createEffect,
  useContext,
} from "solid-js";
import { TodayForecastItem, LoadingSpiner } from "./";
import { openMeteoProvider } from "../../api/open-meteo";
import { AppContext } from "../../context";

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
