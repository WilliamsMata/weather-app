import { Component, JSX } from "solid-js";
import { createStore } from "solid-js/store";

import { AppContextMethods, AppContextProps, AppContext } from "./";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const initialState: AppContextProps = {
  settings: {
    temperature: "Celsius",
    wind: "kn",
  },
  location: {
    isOk: false,
    lat: 0,
    lon: 0,
    city: "",
  },
  search: "",
};

export const AppContextProvider: Component<Props> = (props) => {
  const [state, setState] = createStore<AppContextProps>(initialState);

  const store: [AppContextProps, AppContextMethods] = [
    state,
    {
      setSettings(payload) {
        setState("settings", payload);

        localStorage.setItem(
          "settings",
          JSON.stringify({
            temperature: state.settings.temperature,
            wind: state.settings.wind,
          })
        );
      },
      setLocation(payload) {
        setState("location", payload);
      },
      setSearch(payload) {
        setState("search", payload);
      },
    },
  ];

  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  );
};
