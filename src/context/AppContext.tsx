import {
  createContext,
  Accessor,
  Setter,
  useContext,
  createSignal,
} from "solid-js";
import { Location } from "../interfaces/Location";
import { Settings } from "../interfaces/Settings";

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
