import { useLocation } from "@solidjs/router";
import {
  Component,
  createEffect,
  For,
  Match,
  Switch,
  useContext,
} from "solid-js";
import { mapboxProvider } from "../../api/mapbox/mapboxProvider";
import { LoadingSpiner } from "./LoadingSpiner";
import { Feature } from "../../interfaces/Mapbox";
import { AppContext } from "../../context/AppContext";
import { debounce } from "@solid-primitives/scheduled";

export const SearchCity: Component = () => {
  const location = useLocation();
  const [state, { setSearch, setLocation }] = useContext(AppContext);

  const mapboxQuery = mapboxProvider();

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
      lat: data.center[1],
      lon: data.center[0],
      city: data.text,
    });

    setSearch("");
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
        value={state.search}
        oninput={handleInputChange}
        id="search-city"
        placeholder="Search for cities"
        autocomplete="off"
        class="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
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
