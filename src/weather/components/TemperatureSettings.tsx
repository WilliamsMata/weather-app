import { Component } from "solid-js";

interface TemperatureSettingsProps {
  class: string;
  temperature: string;
  onTemperatureChange: (value: string) => void;
}

export const TemperatureSettings: Component<TemperatureSettingsProps> = (
  props
) => {
  return (
    <>
      <h2 class={props.class}>TEMPERATURE</h2>
      <div class="tabs-menu tabs-menu__temperature">
        <input
          type="radio"
          name="temperature"
          id="temperature-1"
          value="Celsius"
          checked={props.temperature === "Celsius"}
          onInput={(e) => props.onTemperatureChange(e.currentTarget.value)}
        />
        <label for="temperature-1">Celsius</label>
        <input
          type="radio"
          name="temperature"
          id="temperature-2"
          value="Fahrenheit"
          checked={props.temperature === "Fahrenheit"}
          onInput={(e) => props.onTemperatureChange(e.currentTarget.value)}
        />
        <label for="temperature-2">Fahrenheit</label>
        <div class="tab-bg tab-bg__temperature"></div>
      </div>
    </>
  );
};
