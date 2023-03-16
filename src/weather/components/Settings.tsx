import { Component } from "solid-js";
import { useSettingsStore } from "../../store/useSettingsStore";

interface Props {
  class: string;
}

export const Settings: Component<Props> = (props) => {
  const { settings, setSettings } = useSettingsStore();

  const handleChange = (
    e: InputEvent & {
      currentTarget: HTMLInputElement;
      target: Element;
    }
  ) => {
    setSettings((settings) => {
      return {
        ...settings,
        [e.currentTarget.name]: e.currentTarget.value,
      };
    });

    localStorage.setItem(
      "settings",
      JSON.stringify({
        temperature: settings.temperature,
        wind: settings.wind,
      })
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
          checked={settings.temperature === "Celsius"}
          onInput={(e) => handleChange(e)}
        />
        <label for="temperature-1">Celsius</label>
        <input
          type="radio"
          name="temperature"
          id="temperature-2"
          value="Fahrenheit"
          checked={settings.temperature === "Fahrenheit"}
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
          checked={settings.wind === "kn"}
          onInput={(e) => handleChange(e)}
        />
        <label for="wind-1">Knots</label>
        <input
          type="radio"
          name="wind"
          id="wind-2"
          value="ms"
          checked={settings.wind === "ms"}
          onInput={(e) => handleChange(e)}
        />
        <label for="wind-2">m/s</label>
        <input
          type="radio"
          name="wind"
          id="wind-3"
          value="mph"
          checked={settings.wind === "mph"}
          onInput={(e) => handleChange(e)}
        />
        <label for="wind-3">Mph</label>
        <input
          type="radio"
          name="wind"
          id="wind-4"
          value="kmh"
          checked={settings.wind === "kmh"}
          onInput={(e) => handleChange(e)}
        />
        <label for="wind-4">Km/h</label>
        <div class="tab-bg tab-bg__wind"></div>
      </div>
    </div>
  );
};
