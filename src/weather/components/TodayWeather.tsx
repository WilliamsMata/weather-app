import { Component, Match, Switch } from "solid-js";
import { GetWeatherIcon } from "./GetWeatherIcon";
import { useSettingsStore } from "../../store/useSettingsStore";
import { useLocationStore } from "../../store/useLocationStore";
import { openMeteoProvider } from "../../api/open-meteo/openMeteoProvider";
import { LoadingSpiner } from "./LoadingSpiner";
interface Props {
  class?: string;
  heightIcon: number;
  widthIcon: number;
  bigFont: boolean;
}

export const TodayWeather: Component<Props> = (props) => {
  const { settings } = useSettingsStore();
  const { location } = useLocationStore();

  const openMeteoQuery = openMeteoProvider({
    lat: location.lat,
    lon: location.lon,
    settings,
  });

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
                {location.city}
              </h1>
              <p class="my-2 text-xs text-slate-400 md:text-sm">
                Chance of rain:{" "}
                {openMeteoQuery.data?.hourly.precipitation_probability[hour]}%
              </p>
            </div>
            <h2 class={`text-4xl font-bold ${props.bigFont ? "text-5xl" : ""}`}>
              {openMeteoQuery.data?.hourly.temperature_2m[hour]}
              {openMeteoQuery.data?.hourly_units.temperature_2m}
            </h2>
          </div>

          <GetWeatherIcon
            weatherCode={openMeteoQuery.data!.hourly.weathercode[hour]}
            height={props.heightIcon}
            width={props.widthIcon}
          />
        </Match>
      </Switch>
    </article>
  );
};
