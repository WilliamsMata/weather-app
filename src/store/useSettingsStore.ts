import { createStore } from "solid-js/store";
import { Settings } from "../interfaces/Settings";

const initialValue = {
  temperature: "Celsius",
  wind: "Knots",
  precipitation: "Millimeters",
};

export const useSettingsStore = () => {
  const [settings, setSettings] = createStore<Settings>(initialValue);

  return {
    settings,
    setSettings,
  };
};
