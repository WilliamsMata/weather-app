import {
  Component,
  createEffect,
  Match,
  onMount,
  Switch,
  useContext,
} from "solid-js";
import { AppRouter } from "./router/AppRouter";
import { ipApiProvider } from "./api/ip-api/ipApiProvider";
import { AppContext } from "./context/AppContext";

const App: Component = () => {
  const [state, { setSettings }] = useContext(AppContext);

  onMount(() => {
    /* SETTINGS */
    const localSettings = localStorage.getItem("settings");
    if (!localSettings) return;
    setSettings(JSON.parse(localSettings));
  });

  /* DETECT IP */
  const { ipWhoApiQuery } = ipApiProvider();

  return (
    <Switch>
      <Match when={ipWhoApiQuery.isLoading}>
        <div class="flex min-h-screen items-center justify-center">
          <span class="loader" />
        </div>
      </Match>

      <Match when={ipWhoApiQuery.isSuccess}>
        <AppRouter />
      </Match>
    </Switch>
  );
};

export default App;
