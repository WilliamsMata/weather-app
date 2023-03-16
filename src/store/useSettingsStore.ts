import { createStore } from "solid-js/store";
import { Settings } from "../interfaces/Settings";
import { useLocationStore } from "./useLocationStore";
import { openMeteoProvider } from "../api/open-meteo/openMeteoProvider";

const initialValue: Settings = {
  temperature: "Celsius",
  wind: "kn",
};

export const useSettingsStore = () => {
  const [settings, setSettings] = createStore<Settings>(initialValue);

  const { location } = useLocationStore();
  openMeteoProvider({
    lat: location.lat,
    lon: location.lon,
    settings,
  });

  return {
    settings,
    setSettings,
  };
};
