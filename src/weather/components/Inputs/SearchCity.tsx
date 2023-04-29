import { Component, For, Match, Switch } from "solid-js";

import { LoadingSpiner, useSearchCity } from "..";

export const SearchCity: Component = () => {
  const {
    state,
    location,
    mapboxQuery,
    handleInputChange,
    handleCityClick,
    handleMouseEnterInCitySearch,
  } = useSearchCity();

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      class={`relative md:px-0 ${
        location.pathname === "/cities"
          ? "md:col-span-6 lg:col-span-8"
          : location.pathname === "/map"
          ? "md:col-span-7 lg:col-span-8"
          : "md:col-span-8"
      }`}
    >
      <input
        type="search"
        name="city"
        value={state.search}
        oninput={handleInputChange}
        id="search-city"
        placeholder="Search for cities"
        autocomplete="off"
        class="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />

      <div class="absolute top-full z-50 w-full rounded-b-lg bg-slate-700">
        <Switch>
          <Match when={mapboxQuery.isFetching}>
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
                  onMouseEnter={(e) => handleMouseEnterInCitySearch(data)}
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
