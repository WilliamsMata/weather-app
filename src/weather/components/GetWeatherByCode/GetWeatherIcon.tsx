import { Component, Switch, Match } from "solid-js";

import clearSkyDay from "../../../assets/weather-icons/clear-sky-day.svg";
import mainlyClearDay from "../../../assets/weather-icons/mainly-clear-day.svg";
import partlyCloudyDay from "../../../assets/weather-icons/partly-cloudy-day.svg";
import overcast from "../../../assets/weather-icons/overcast.svg";
import drizzleDay from "../../../assets/weather-icons/drizzle-day.svg";
import rain from "../../../assets/weather-icons/rain.svg";
import thunderstorm from "../../../assets/weather-icons/thunderstorm.svg";
import heavyRain from "../../../assets/weather-icons/heavy-rain.svg";

interface Props {
  weatherCode: number;
  width: number;
  height: number;
}

export const GetWeatherIcon: Component<Props> = (props) => {
  return (
    <Switch>
      <Match when={props.weatherCode === 0}>
        <img
          style={{
            width: `${props.width}rem`,
            height: `${props.height}rem`,
          }}
          src={clearSkyDay}
        />
      </Match>

      <Match when={props.weatherCode === 1}>
        <img
          style={{
            width: `${props.width}rem`,
            height: `${props.height}rem`,
          }}
          src={mainlyClearDay}
        />
      </Match>

      <Match when={props.weatherCode === 2}>
        <img
          style={{
            width: `${props.width}rem`,
            height: `${props.height}rem`,
          }}
          src={partlyCloudyDay}
        />
      </Match>

      <Match
        when={
          props.weatherCode === 3 ||
          props.weatherCode === 45 ||
          props.weatherCode === 48
        }
      >
        <img
          style={{
            width: `${props.width}rem`,
            height: `${props.height}rem`,
          }}
          src={overcast}
        />
      </Match>

      <Match
        when={
          props.weatherCode === 51 ||
          props.weatherCode === 53 ||
          props.weatherCode === 55 ||
          props.weatherCode === 56 ||
          props.weatherCode === 57
        }
      >
        <img
          style={{
            width: `${props.width}rem`,
            height: `${props.height}rem`,
          }}
          src={drizzleDay}
        />
      </Match>

      <Match
        when={
          props.weatherCode === 61 ||
          props.weatherCode === 63 ||
          props.weatherCode === 66 ||
          props.weatherCode === 71 ||
          props.weatherCode === 73 ||
          props.weatherCode === 77 ||
          props.weatherCode === 80 ||
          props.weatherCode === 81 ||
          props.weatherCode === 81 ||
          props.weatherCode === 85
        }
      >
        <img
          style={{
            width: `${props.width}rem`,
            height: `${props.height}rem`,
          }}
          src={rain}
        />
      </Match>

      <Match when={props.weatherCode === 95}>
        <img
          style={{
            width: `${props.width}rem`,
            height: `${props.height}rem`,
          }}
          src={thunderstorm}
        />
      </Match>

      <Match
        when={
          props.weatherCode === 65 ||
          props.weatherCode === 67 ||
          props.weatherCode === 75 ||
          props.weatherCode === 82 ||
          props.weatherCode === 86 ||
          props.weatherCode === 96 ||
          props.weatherCode === 99
        }
      >
        <img
          style={{
            width: `${props.width}rem`,
            height: `${props.height}rem`,
          }}
          src={heavyRain}
        />
      </Match>
    </Switch>
  );
};
