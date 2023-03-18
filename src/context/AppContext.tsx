import { createContext } from "solid-js";
import { Location, Settings } from "../interfaces";

export type AppContextProps = {
  settings: Settings;
  location: Location;
  search: string;
};

export type AppContextMethods = {
  setSettings: (payload: Settings) => void;
  setLocation: (payload: Location) => void;
  setSearch: (payload: string) => void;
};

export const AppContext = createContext<[AppContextProps, AppContextMethods]>([
  {} as AppContextProps,
  {} as AppContextMethods,
]);
