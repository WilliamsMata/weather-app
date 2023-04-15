import { QueryClient } from "@tanstack/solid-query";

import { updateWeatherQuery } from "./queryUtils";
import { AppContextProps } from "../context";
import { Settings } from "../interfaces";

export const handleSettingsChange = (
  state: AppContextProps,
  queryClient: QueryClient,
  setSettings: (payload: Settings) => void,
  settingName: string,
  newValue: string
) => {
  setSettings({
    ...state.settings,
    [settingName]: newValue,
  });

  updateWeatherQuery(state, queryClient);
};
