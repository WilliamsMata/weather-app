import { Component, Switch, useContext, Match } from "solid-js";
import { GetWeatherIcon } from "./";
import { AppContext } from "../../context/AppContext";
import { createQuery } from "@tanstack/solid-query";
import { getOpenMeteoApi } from "../../api/open-meteo/openMeteoProvider";
import { LoadingSpiner } from "./LoadingSpiner";

interface Props {
  id: string;
  city: string;
  lat: number;
  lon: number;
  activeCity: string;
  setActiveCity: (id: string) => void;
}

export const CitiesItem: Component<Props> = (props) => {
  const [state, { setLocation }] = useContext(AppContext);

  const hour = new Date().getHours();

  const openMeteoQuery = createQuery(
    () => [
      "open-meteo",
      {
        lat: props.lat,
        lon: props.lon,
        settings: state.settings,
      },
    ],
    () =>
      getOpenMeteoApi({
        lat: props.lat,
        lon: props.lon,
        settings: state.settings,
      }),
    {
      staleTime: 1000 * 60 * 60,
      get enabled() {
        return state.location.isOk;
      },
    }
  );

  const handleCityClick = () => {
    props.setActiveCity(props.id);

    setLocation({
      ...state.location,
      id: props.id,
      lat: props.lat,
      lon: props.lon,
      city: props.city,
    });
  };

  return (
    <Switch>
      <Match when={openMeteoQuery.isLoading}>
        <div class="flex min-h-[7rem] items-center justify-center">
          <LoadingSpiner />
        </div>
      </Match>

      <Match when={openMeteoQuery.isSuccess}>
        <div
          class={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-4 ${
            props.activeCity !== props.id
              ? "bg-slate-800"
              : "outline outline-blue-900"
          }`}
          onClick={() => handleCityClick()}
        >
          <div class="flex items-center justify-center">
            <GetWeatherIcon
              height={5}
              width={5}
              weatherCode={openMeteoQuery.data!.hourly.weathercode[hour]}
            />
          </div>

          <h2 class="ml-4 grow text-2xl md:text-xl xl:text-2xl">
            {props.city}
          </h2>

          <h2 class="text-4xl md:text-2xl xl:text-4xl">
            {openMeteoQuery.data?.hourly.temperature_2m[hour]}°
            {state.settings.temperature === "Celsius" ? "C" : "F"}
          </h2>
        </div>
      </Match>
    </Switch>
  );
};
