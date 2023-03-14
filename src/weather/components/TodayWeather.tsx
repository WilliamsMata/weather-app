import { Component } from "solid-js";
import clearSkyDay from "../../assets/weather-icons/clear-sky-day.svg";
import { GetWeatherIcon } from "./GetWeatherIcon";

interface Props {
  class?: string;
  heightIcon: number;
  widthIcon: number;
}

export const TodayWeather: Component<Props> = (props) => {
  return (
    <article class={props.class}>
      <div class="flex h-full flex-col justify-between">
        <div>
          <h1 class="text-3xl font-bold md:text-5xl">Madrid</h1>
          <p class="mt-2 text-xs text-slate-400 md:text-sm">
            Chance of rain: 0%
          </p>
        </div>
        <h2 class="text-6xl font-bold">31°</h2>
      </div>

      <GetWeatherIcon
        weatherCode={0}
        height={props.heightIcon}
        width={props.widthIcon}
      />
    </article>
  );
};
