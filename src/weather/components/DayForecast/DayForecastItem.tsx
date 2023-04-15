import { Component } from "solid-js";
import { DayForecastData, GetWeatherIcon, GetWeatherConditionText } from "..";

export const DayForecastItem: Component<DayForecastData> = (props) => {
  return (
    <div class="mx-4 my-4 flex items-center justify-between sm:mx-8 md:mx-0 md:text-sm lg:mx-4 lg:text-base xl:mx-8">
      <p class="w-12 text-slate-400">{props.day}</p>
      <div class="flex w-36 items-center gap-4">
        <GetWeatherIcon weatherCode={props.weatherCode} width={2} height={2} />
        <GetWeatherConditionText weatherCode={props.weatherCode} />
      </div>
      <p>
        {props.maxTemperature}
        <span class="text-slate-400">/{props.minTemperature}</span>
      </p>
    </div>
  );
};
