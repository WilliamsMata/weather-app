import { Component, Match, Switch, useContext } from "solid-js";
import { GetWeatherConditionText, GetWeatherIcon, LoadingSpiner } from "..";
import { AppContext } from "../../../context";
import { openMeteoProvider } from "../../../api/open-meteo";

interface Props {
  class?: string;
  heightIcon: number;
  widthIcon: number;
  bigFont: boolean;
}

export const CurrentWeather: Component<Props> = (props) => {
  const [state] = useContext(AppContext);

  const openMeteoQuery = openMeteoProvider();

  const hour = new Date().getHours();

  return (
    <article class={props.class}>
      <Switch>
        <Match when={openMeteoQuery.isLoading}>
          <LoadingSpiner />
        </Match>

        <Match when={openMeteoQuery.isSuccess}>
          <div class="flex h-full flex-col justify-between">
            <div>
              <h1
                class={`text-4xl font-bold ${
                  props.bigFont ? "" : "md:text-3xl"
                }`}
              >
                {state.location.city}
              </h1>
              <h4 class="my-2">
                <GetWeatherConditionText
                  weatherCode={openMeteoQuery.data!.current_weather.weathercode}
                />
              </h4>
              <p class="my-2 text-xs text-slate-400 md:text-sm">
                Chance of rain:{" "}
                {openMeteoQuery.data?.hourly.precipitation_probability[hour]}%
              </p>
            </div>
            <h2 class={`text-4xl font-bold ${props.bigFont ? "text-5xl" : ""}`}>
              {openMeteoQuery.data?.current_weather.temperature}
              {openMeteoQuery.data?.hourly_units.temperature_2m}
            </h2>
          </div>

          <GetWeatherIcon
            weatherCode={openMeteoQuery.data!.current_weather.weathercode}
            height={props.heightIcon}
            width={props.widthIcon}
          />
        </Match>
      </Switch>
    </article>
  );
};
