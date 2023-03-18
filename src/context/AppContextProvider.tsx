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
    "12-hour-time": false,
  },
  location: {
    isOk: false,
    id: "",
    lat: 0,
    lon: 0,
    city: "",
  },
  search: "",
  history: [],
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
            "12-hour-time": state.settings["12-hour-time"],
          })
        );
      },
      toggle12HourTime() {
        setState("settings", {
          ...state.settings,
          "12-hour-time": !state.settings["12-hour-time"],
        });

        localStorage.setItem(
          "settings",
          JSON.stringify({
            temperature: state.settings.temperature,
            wind: state.settings.wind,
            "12-hour-time": state.settings["12-hour-time"],
          })
        );
      },
      setLocation(payload) {
        setState("location", payload);
      },
      setSearch(payload) {
        setState("search", payload);
      },
      addCityToHistory() {
        setState("history", (history) => {
          const newHistory = history.filter(
            (location) => location.id !== state.location.id
          );

          if (history.length > 4) {
            return [{ ...state.location }, ...newHistory.slice(0, 4)];
          }
          return [{ ...state.location }, ...newHistory];
        });
      },
    },
  ];

  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  );
};
