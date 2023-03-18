import { useQueryClient } from "@tanstack/solid-query";
import { Component, useContext } from "solid-js";
import { AppContext } from "../../context";
import { getOpenMeteoApi } from "../../api/open-meteo";

interface Props {
  class: string;
}

export const UnitsSettings: Component<Props> = (props) => {
  const [state, { setSettings }] = useContext(AppContext);

  const queryClient = useQueryClient();

  const handleChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => {
    setSettings({
      ...state.settings,
      [e.currentTarget.name]: e.currentTarget.value,
    });

    queryClient.prefetchQuery(
      [
        "open-meteo",
        {
          lat: state.location.lat,
          lon: state.location.lon,
          settings: state.settings,
        },
      ],
      () =>
        getOpenMeteoApi({
          lat: state.location.lat,
          lon: state.location.lon,
          settings: state.settings,
        }),
      {
        staleTime: 1000 * 60 * 60,
      }
    );
  };

  return (
    <div class={props.class}>
      <h2 class="text-sm font-bold text-slate-400">TEMPERATURE</h2>
      <div class="tabs-menu tabs-menu__temperature">
        <input
          type="radio"
          name="temperature"
          id="temperature-1"
          value="Celsius"
          checked={state.settings.temperature === "Celsius"}
          onInput={(e) => handleChange(e)}
        />
        <label for="temperature-1">Celsius</label>
        <input
          type="radio"
          name="temperature"
          id="temperature-2"
          value="Fahrenheit"
          checked={state.settings.temperature === "Fahrenheit"}
          onInput={(e) => handleChange(e)}
        />
        <label for="temperature-2">Fahrenheit</label>
        <div class="tab-bg tab-bg__temperature"></div>
      </div>

      <h2 class="text-sm font-bold text-slate-400">WIND SPEED</h2>
      <div class="tabs-menu tabs-menu__wind">
        <input
          type="radio"
          name="wind"
          id="wind-1"
          value="kn"
          checked={state.settings.wind === "kn"}
          onInput={(e) => handleChange(e)}
        />
        <label for="wind-1">Knots</label>
        <input
          type="radio"
          name="wind"
          id="wind-2"
          value="ms"
          checked={state.settings.wind === "ms"}
          onInput={(e) => handleChange(e)}
        />
        <label for="wind-2">m/s</label>
        <input
          type="radio"
          name="wind"
          id="wind-3"
          value="mph"
          checked={state.settings.wind === "mph"}
          onInput={(e) => handleChange(e)}
        />
        <label for="wind-3">Mph</label>
        <input
          type="radio"
          name="wind"
          id="wind-4"
          value="kmh"
          checked={state.settings.wind === "kmh"}
          onInput={(e) => handleChange(e)}
        />
        <label for="wind-4">Km/h</label>
        <div class="tab-bg tab-bg__wind"></div>
      </div>
    </div>
  );
};
