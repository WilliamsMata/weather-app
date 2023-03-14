import { Component } from "solid-js";
import { GetWeatherIcon } from "./GetWeatherIcon";

interface Props {
  hour: string;
  weatherCode: number;
  temperature: number;
}

export const TodayForecastItem: Component<Props> = (props) => {
  return (
    <div class="flex flex-col items-center justify-between gap-2">
      <p class="text-center">{props.hour}</p>

      <GetWeatherIcon
        weatherCode={props.weatherCode}
        width={2.5}
        height={2.5}
      />

      <h3>{props.temperature}</h3>
    </div>
  );
};
