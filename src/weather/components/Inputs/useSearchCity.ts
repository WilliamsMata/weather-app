import { useContext } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";
import { useLocation } from "@solidjs/router";
import { useQueryClient } from "@tanstack/solid-query";

import { mapboxProvider } from "../../../api/mapbox";
import { getOpenMeteoApi } from "../../../api/open-meteo";
import { AppContext } from "../../../context";
import { Feature } from "../../../interfaces";

export const useSearchCity = () => {
  const location = useLocation();

  const [state, { setSearch, setLocation, addCityToHistory }] =
    useContext(AppContext);

  const mapboxQuery = mapboxProvider();

  const queryClient = useQueryClient();

  const delayedSearch = debounce((value: string) => {
    setSearch(value);
  }, 500);

  const handleInputChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => {
    delayedSearch(e.currentTarget.value);
  };

  const handleCityClick = (data: Feature) => {
    setLocation({
      ...state.location,
      id: data.id,
      lat: data.center[1],
      lon: data.center[0],
      city: data.text,
    });

    addCityToHistory();

    setSearch("");
  };

  const handleMouseEnterInCitySearch = (data: Feature) => {
    queryClient.prefetchQuery(
      [
        "open-meteo",
        {
          lat: data.center[1],
          lon: data.center[0],
          settings: state.settings,
        },
      ],
      () =>
        getOpenMeteoApi({
          lat: data.center[1],
          lon: data.center[0],
          settings: state.settings,
        }),
      {
        staleTime: 1000 * 60 * 60,
      }
    );
  };

  return {
    state,
    location,
    mapboxQuery,

    handleInputChange,
    handleCityClick,
    handleMouseEnterInCitySearch,
  };
};
