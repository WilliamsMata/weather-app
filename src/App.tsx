import { Component, onMount } from "solid-js";
import { AppRouter } from "./router/AppRouter";
import { useSettingsStore } from "./store/useSettingsStore";

const App: Component = () => {
  const { setSettings } = useSettingsStore();

  onMount(() => {
    const localSettings = localStorage.getItem("settings");
    if (!localSettings) return;

    setSettings(JSON.parse(localSettings));
  });

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
