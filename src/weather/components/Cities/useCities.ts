import { useContext, createSignal, createEffect } from "solid-js";
import { createQuery } from "@tanstack/solid-query";

import { AppContext } from "../../../context";
import { getOpenMeteoApi } from "../../../api/open-meteo";
import { CitiesItemProps } from "./CitiesItem";

export const useCities = (props?: CitiesItemProps) => {
  const [state, { setLocation }] = useContext(AppContext);

  const [activeCity, setActiveCity] = createSignal<string>(state.history[0].id);

  createEffect(() => {
    setActiveCity(state.location.id);
  });

  const hour = new Date().getHours();

  if (!props)
    return {
      state,
      activeCity,
      setActiveCity,
    };

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
    props.setActiveCity(props!.id);

    setLocation({
      ...state.location,
      id: props.id,
      lat: props.lat,
      lon: props.lon,
      city: props.city,
    });
  };

  return {
    state,
    openMeteoQuery,
    hour,

    activeCity,
    setActiveCity,
    handleCityClick,
  };
};
