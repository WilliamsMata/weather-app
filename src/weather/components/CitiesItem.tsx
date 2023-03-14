import { Component } from "solid-js";
import { GetWeatherIcon } from "./GetWeatherIcon";

interface Props {
  weatherCode: number;
  city: string;
  temperature: number;
  activeCity: string;
  onClick: (city: string) => void;
}

export const CitiesItem: Component<Props> = (props) => {
  return (
    <div
      class={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-4 ${
        props.activeCity !== props.city
          ? "bg-slate-800"
          : "outline outline-blue-900"
      }`}
      onClick={() => props.onClick(props.city)}
    >
      <div class="flex items-center justify-center">
        <GetWeatherIcon height={5} width={5} weatherCode={props.weatherCode} />
      </div>

      <h2 class="ml-4 grow text-2xl">{props.city}</h2>

      <h2 class="text-4xl">{props.temperature}°</h2>
    </div>
  );
};
