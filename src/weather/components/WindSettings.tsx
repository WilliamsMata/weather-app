import { Component } from "solid-js";

interface WindSettingsProps {
  class: string;
  wind: string;
  onWindChange: (value: string) => void;
}

export const WindSettings: Component<WindSettingsProps> = (props) => {
  return (
    <>
      <h2 class={props.class}>WIND SPEED</h2>
      <div class="tabs-menu tabs-menu__wind">
        <input
          type="radio"
          name="wind"
          id="wind-1"
          value="kn"
          checked={props.wind === "kn"}
          onInput={(e) => props.onWindChange(e.currentTarget.value)}
        />
        <label for="wind-1">Knots</label>
        <input
          type="radio"
          name="wind"
          id="wind-2"
          value="ms"
          checked={props.wind === "ms"}
          onInput={(e) => props.onWindChange(e.currentTarget.value)}
        />
        <label for="wind-2">m/s</label>
        <input
          type="radio"
          name="wind"
          id="wind-3"
          value="mph"
          checked={props.wind === "mph"}
          onInput={(e) => props.onWindChange(e.currentTarget.value)}
        />
        <label for="wind-3">Mph</label>
        <input
          type="radio"
          name="wind"
          id="wind-4"
          value="kmh"
          checked={props.wind === "kmh"}
          onInput={(e) => props.onWindChange(e.currentTarget.value)}
        />
        <label for="wind-4">Km/h</label>
        <div class="tab-bg tab-bg__wind"></div>
      </div>
    </>
  );
};
