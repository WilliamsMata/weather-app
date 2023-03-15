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
}

export const TodayWeather: Component<Props> = (props) => {
  const { settings } = useSettingsStore();
  const { location } = useLocationStore();

  const hour = new Date().getHours();

  const openMeteoQuery = openMeteoProvider({
    lat: location.lat,
    lon: location.lon,
    settings,
  });

  return (
    <article class={props.class}>
      <Switch>
        <Match when={openMeteoQuery.isLoading}>
          <LoadingSpiner />
        </Match>

        <Match when={openMeteoQuery.isSuccess}>
          <div class="flex h-full flex-col justify-between">
            <div>
              <h1 class="text-3xl font-bold md:text-5xl">{location.city}</h1>
              <p class="mt-2 text-xs text-slate-400 md:text-sm">
                Chance of rain:{" "}
                {openMeteoQuery.data?.hourly.precipitation_probability[hour]}%
              </p>
            </div>
            <h2 class="text-6xl font-bold">
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
