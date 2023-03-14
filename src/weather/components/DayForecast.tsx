import { Component, For } from "solid-js";
import { DayForecastItem } from "./DayForecastItem";

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

const dayForecastData: DayForecastData[] = [
  {
    day: "Today",
    weatherCode: 0,
    maxTemperature: 36,
    minTemperature: 22,
  },
  {
    day: "Tue",
    weatherCode: 1,
    maxTemperature: 37,
    minTemperature: 21,
  },
  {
    day: "Wed",
    weatherCode: 2,
    maxTemperature: 37,
    minTemperature: 21,
  },
  {
    day: "Thu",
    weatherCode: 3,
    maxTemperature: 37,
    minTemperature: 22,
  },
  {
    day: "Fri",
    weatherCode: 51,
    maxTemperature: 37,
    minTemperature: 21,
  },
  {
    day: "Sat",
    weatherCode: 61,
    maxTemperature: 35,
    minTemperature: 23,
  },
  {
    day: "Sun",
    weatherCode: 65,
    maxTemperature: 36,
    minTemperature: 22,
  },
];

export const DayForecast: Component<Props> = (props) => {
  return (
    <article class={props.class}>
      <p class="text-xs font-bold text-slate-400">{props.days}-DAY FORECAST</p>
      <div class="flex h-full flex-col justify-around">
        <For each={dayForecastData.slice(0, props.days)}>
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
    </article>
  );
};
