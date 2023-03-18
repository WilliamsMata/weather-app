import { Component, Match, onMount, Switch, useContext } from "solid-js";
import AppRouter from "./router/AppRouter";
import { AppContext } from "./context";
import { ipApiProvider } from "./api/ip-api";
import { openMeteoProvider } from "./api/open-meteo/openMeteoProvider";
import { ErrorView } from "./weather/views";

const App: Component = () => {
  const [, { setSettings }] = useContext(AppContext);

  onMount(() => {
    /* SETTINGS */
    const localSettings = localStorage.getItem("settings");
    if (!localSettings) return;
    setSettings(JSON.parse(localSettings));
  });

  /* DETECT IP */
  const { ipWhoApiQuery } = ipApiProvider();
  const openMeteoQuery = openMeteoProvider();

  return (
    <Switch>
      <Match when={ipWhoApiQuery.isLoading}>
        <div class="flex min-h-screen items-center">
          <span class="loader" />
        </div>
      </Match>

      <Match when={openMeteoQuery.isError}>
        <ErrorView />
      </Match>

      <Match when={ipWhoApiQuery.isSuccess}>
        <AppRouter />
      </Match>
    </Switch>
  );
};

export default App;
