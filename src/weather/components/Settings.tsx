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
        precipitation: settings.precipitation,
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
          value="m/s"
          checked={settings.wind === "m/s"}
          onInput={(e) => handleChange(e)}
        />
        <label for="wind-2">m/s</label>
        <input
          type="radio"
          name="wind"
          id="wind-3"
          value="Mph"
          checked={settings.wind === "Mph"}
          onInput={(e) => handleChange(e)}
        />
        <label for="wind-3">Mph</label>
        <input
          type="radio"
          name="wind"
          id="wind-4"
          value="Km/s"
          checked={settings.wind === "Km/s"}
          onInput={(e) => handleChange(e)}
        />
        <label for="wind-4">Km/h</label>
        <div class="tab-bg tab-bg__wind"></div>
      </div>

      <h2 class="text-sm font-bold text-slate-400">PRECIPITATION</h2>
      <div class="tabs-menu tabs-menu__precipitation">
        <input
          type="radio"
          name="precipitation"
          id="precipitation-1"
          value="Millimeters"
          checked={settings.precipitation === "Millimeters"}
          onInput={(e) => handleChange(e)}
        />
        <label for="precipitation-1">Millimeters</label>
        <input
          type="radio"
          name="precipitation"
          id="precipitation-2"
          value="Inch"
          checked={settings.precipitation === "Inch"}
          onInput={(e) => handleChange(e)}
        />
        <label for="precipitation-2">Inch</label>
        <div class="tab-bg tab-bg__precipitation"></div>
      </div>
    </div>
  );
};
