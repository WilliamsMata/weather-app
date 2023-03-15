import { Component, createEffect, Match, onMount, Switch } from "solid-js";
import { AppRouter } from "./router/AppRouter";
import { useSettingsStore } from "./store/useSettingsStore";
import { ipApiProvider } from "./api/ip-api/ipApiProvider";

const App: Component = () => {
  const { setSettings } = useSettingsStore();

  onMount(() => {
    /* SETTINGS */
    const localSettings = localStorage.getItem("settings");
    if (!localSettings) return;
    setSettings(JSON.parse(localSettings));
  });

  /* DETECT IP */
  const { ipApiQuery } = ipApiProvider();

  return (
    <Switch>
      <Match when={ipApiQuery.isLoading}>
        <div class="flex min-h-screen items-center justify-center">
          <span class="loader" />
        </div>
      </Match>

      <Match when={ipApiQuery.isSuccess}>
        <AppRouter />
      </Match>
    </Switch>
  );
};

export default App;
