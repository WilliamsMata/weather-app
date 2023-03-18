import { useQueryClient } from "@tanstack/solid-query";
import { Component, useContext } from "solid-js";
import { AppContext } from "../../context";
import { getOpenMeteoApi } from "../../api/open-meteo";

interface Props {
  class: string;
}

export const GeneralSettings: Component<Props> = (props) => {
  const [state, { toggle12HourTime }] = useContext(AppContext);

  return (
    <div class={props.class}>
      <div class="flex justify-between">
        <h2 class="text-sm font-bold text-slate-400">12-Hour-Time</h2>
        <label class="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            value=""
            class="peer sr-only"
            checked={state.settings["12-hour-time"]}
            oninput={() => toggle12HourTime()}
          />
          <div class="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none   dark:border-gray-600 " />
        </label>
      </div>
    </div>
  );
};
