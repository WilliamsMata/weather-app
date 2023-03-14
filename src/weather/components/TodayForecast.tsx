import { Component, For } from "solid-js";
import { TodayForecastItem } from "./TodayForecastItem";

interface Props {
  class?: string;
  days: number;
}

interface TodayData {
  hour: string;
  weatherCode: number;
  temperature: number;
}

const todayData: TodayData[] = [
  {
    hour: "6:00 AM",
    weatherCode: 0,
    temperature: 25,
  },
  {
    hour: "9:00 AM",
    weatherCode: 1,
    temperature: 28,
  },
  {
    hour: "12:00 PM",
    weatherCode: 2,
    temperature: 33,
  },
  {
    hour: "3:00 PM",
    weatherCode: 3,
    temperature: 34,
  },
  {
    hour: "6:00 PM",
    weatherCode: 51,
    temperature: 32,
  },
  {
    hour: "9:00 PM",
    weatherCode: 61,
    temperature: 25,
  },
];

export const TodayForecast: Component<Props> = (props) => {
  return (
    <article class={props.class}>
      <p class="text-xs font-bold text-slate-400">TODAY'S FORECAST</p>
      <div class="flex h-full justify-evenly gap-2 py-4">
        <For each={todayData.slice(0, props.days)}>
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
    </article>
  );
};
