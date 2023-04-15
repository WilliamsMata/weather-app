import { Component } from "solid-js";
import { Match, Switch } from "solid-js/web";

interface Props {
  weatherCode: number;
}

export const GetWeatherConditionText: Component<Props> = (props) => {
  return (
    <Switch>
      <Match when={props.weatherCode === 0}>
        <p>Clear sky</p>
      </Match>

      <Match when={props.weatherCode === 1}>
        <p>Mainly clear</p>
      </Match>

      <Match when={props.weatherCode === 2}>
        <p>partly cloudy</p>
      </Match>

      <Match
        when={
          props.weatherCode === 3 ||
          props.weatherCode === 45 ||
          props.weatherCode === 48
        }
      >
        <p>Overcast</p>
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
        <p>Drizzle</p>
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
        <p>Rain</p>
      </Match>

      <Match when={props.weatherCode === 95}>
        <p>Thunderstorm</p>
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
        <p>Heavy rain</p>
      </Match>
    </Switch>
  );
};
