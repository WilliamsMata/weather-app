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
    if (openMeteoQuery.isSuccess) {
      setDayForecastData([
        {
          day: "Today",
          weatherCode: openMeteoQuery.data.daily.weathercode[0],
          maxTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_max[0]
          ),
          minTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_min[0]
          ),
        },
        {
          day: nextDays[1],
          weatherCode: openMeteoQuery.data.daily.weathercode[1],
          maxTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_max[1]
          ),
          minTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_min[1]
          ),
        },
        {
          day: nextDays[2],
          weatherCode: openMeteoQuery.data.daily.weathercode[2],
          maxTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_max[2]
          ),
          minTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_min[2]
          ),
        },
        {
          day: nextDays[3],
          weatherCode: openMeteoQuery.data.daily.weathercode[3],
          maxTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_max[3]
          ),
          minTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_min[3]
          ),
        },
        {
          day: nextDays[4],
          weatherCode: openMeteoQuery.data.daily.weathercode[4],
          maxTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_max[4]
          ),
          minTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_min[4]
          ),
        },
        {
          day: nextDays[5],
          weatherCode: openMeteoQuery.data.daily.weathercode[5],
          maxTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_max[5]
          ),
          minTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_min[5]
          ),
        },
        {
          day: nextDays[6],
          weatherCode: openMeteoQuery.data.daily.weathercode[6],
          maxTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_max[6]
          ),
          minTemperature: Math.floor(
            openMeteoQuery.data.daily.temperature_2m_min[6]
          ),
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
