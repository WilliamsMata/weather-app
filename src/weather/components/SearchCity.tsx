import { useLocation } from "@solidjs/router";
import { Component, createEffect, For, Match, Switch } from "solid-js";
import { debounce } from "lodash";
import { getMapboxApi } from "../../api/mapbox/mapboxProvider";
import { useSearchStore } from "../../store/useSearchStore";
import { createQuery } from "@tanstack/solid-query";
import { LoadingSpiner } from "./LoadingSpiner";
import { Feature } from "../../interfaces/Mapbox";
import { useLocationStore } from "../../store/useLocationStore";
import { useSettingsStore } from "../../store/useSettingsStore";
import { openMeteoProvider } from "../../api/open-meteo/openMeteoProvider";

export const SearchCity: Component = () => {
  const location = useLocation();

  const { searchStore, setSearchStore } = useSearchStore();

  const mapboxQuery = createQuery(
    () => ["mapbox", searchStore.search],
    () => getMapboxApi(searchStore.search),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  const delayedSearch = debounce((value) => {
    setSearchStore({ search: value });
  }, 500);

  createEffect(() => {
    if (mapboxQuery.isSuccess) {
      console.log(mapboxQuery.data);
    }
  });

  const handleInputChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => {
    delayedSearch(e.currentTarget.value);
  };

  const { location: locationStore, setLocation } = useLocationStore();
  const { settings } = useSettingsStore();

  createEffect(() => {
    openMeteoProvider({
      lat: locationStore.lat,
      lon: locationStore.lon,
      settings,
    });
  });

  const handleCityClick = (data: Feature) => {
    setLocation((location) => {
      return {
        ...location,
        lat: data.center[1],
        lon: data.center[0],
        city: data.text,
      };
    });

    setSearchStore({ search: "" });
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      class={`relative md:px-0 ${
        location.pathname === "/cities"
          ? "md:col-span-6 lg:col-span-8"
          : "md:col-span-8"
      }`}
    >
      <input
        type="search"
        name="city"
        value={searchStore.search}
        oninput={handleInputChange}
        id="search-city"
        placeholder="Search for cities"
        autocomplete="off"
        class="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
      />

      <div class="absolute top-full z-50 w-full rounded-b-lg bg-slate-700">
        <Switch>
          <Match when={mapboxQuery.isLoading}>
            <div class="py-4">
              <LoadingSpiner />
            </div>
          </Match>

          <Match when={mapboxQuery.isSuccess}>
            <For each={mapboxQuery.data}>
              {(data) => (
                <div
                  class="cursor-pointer rounded-lg p-4 hover:bg-slate-800"
                  onclick={(e) => handleCityClick(data)}
                >
                  {data.place_name_en}
                </div>
              )}
            </For>
          </Match>
        </Switch>
      </div>
    </form>
  );
};
