import { Component, useContext } from "solid-js";
import { useQueryClient } from "@tanstack/solid-query";

import { TemperatureSettings, WindSettings } from "./";
import { AppContext } from "../../context";
import { handleSettingsChange } from "../../utils";

interface Props {
  class: string;
}

export const UnitsSettings: Component<Props> = (props) => {
  const [state, { setSettings }] = useContext(AppContext);

  const queryClient = useQueryClient();

  const handleChange = (settingName: string, newValue: string) => {
    handleSettingsChange(
      state,
      queryClient,
      setSettings,
      settingName,
      newValue
    );
  };

  return (
    <div class={props.class}>
      <TemperatureSettings
        class="text-sm font-bold text-slate-400"
        temperature={state.settings.temperature}
        onTemperatureChange={(value) => handleChange("temperature", value)}
      />
      <WindSettings
        class="text-sm font-bold text-slate-400"
        wind={state.settings.wind}
        onWindChange={(value) => handleChange("wind", value)}
      />
    </div>
  );
};
