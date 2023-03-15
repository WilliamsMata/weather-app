import { createStore } from "solid-js/store";

interface Settings {
  temperature: string;
  wind: string;
  precipitation: string;
}

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
