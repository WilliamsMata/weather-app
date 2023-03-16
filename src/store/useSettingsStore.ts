import { createStore } from "solid-js/store";
import { Settings } from "../interfaces/Settings";

const initialValue: Settings = {
  temperature: "Celsius",
  wind: "kn",
};

export const useSettingsStore = () => {
  const [settings, setSettings] = createStore<Settings>(initialValue);

  return {
    settings,
    setSettings,
  };
};
