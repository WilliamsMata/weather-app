import {
  Component,
  For,
  createSignal,
  createEffect,
  Switch,
  Match,
} from "solid-js";
import { DayForecastItem, LoadingSpiner } from "..";
import { openMeteoProvider } from "../../../api/open-meteo";
import { getNextDays } from "../../../helpers";

interface Props {
  class: string;
  days: number;
}

export interface DayForecastData {
  day: string;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
}

export const DayForecast: Component<Props> = (props) => {
  const openMeteoQuery = openMeteoProvider();
  const [dayForecastData, setDayForecastData] = createSignal<DayForecastData[]>(
    []
  );

  const nextDays = getNextDays();

  createEffect(() => {
    if (openMeteoQuery.isSuccess && openMeteoQuery.data) {
      const daily = openMeteoQuery.data.daily;

      const newData = nextDays.map((day, index) => ({
        day,
        weatherCode: daily.weathercode[index],
        maxTemperature: Math.floor(daily.temperature_2m_max[index]),
        minTemperature: Math.floor(daily.temperature_2m_min[index]),
      }));

      setDayForecastData(newData);
    }
  });

  return (
    <article class={props.class}>
      <Switch>
        <Match when={openMeteoQuery.isLoading}>
          <LoadingSpiner />
        </Match>
        <Match when={openMeteoQuery.isSuccess}>
          <p class="text-xs font-bold text-slate-400">
            {props.days}-DAY FORECAST
          </p>
          <div class="flex h-full flex-col justify-around">
            <For each={dayForecastData().slice(0, props.days)}>
              {(data) => (
                <DayForecastItem
                  ref={data.day}
                  day={data.day}
                  weatherCode={data.weatherCode}
                  minTemperature={data.minTemperature}
                  maxTemperature={data.maxTemperature}
                />
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </article>
  );
};
