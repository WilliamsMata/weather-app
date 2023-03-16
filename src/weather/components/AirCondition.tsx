import {
  Component,
  For,
  Match,
  Switch,
  createSignal,
  createEffect,
} from "solid-js";

import realFeelIcon from "../../assets/real-feel.svg";
import windIcon from "../../assets/wind.svg";
import waterDropIcon from "../../assets/water-drop.svg";
import pressureIcon from "../../assets/pressure.svg";
import { AirConditionItem } from "./AirConditionItem";
import { openMeteoProvider } from "../../api/open-meteo/openMeteoProvider";
import { useLocationStore } from "../../store/useLocationStore";
import { useSettingsStore } from "../../store/useSettingsStore";
import { LoadingSpiner } from "./LoadingSpiner";

interface Props {
  class: string;
}

export interface AirConditionData {
  title: string;
  icon: string;
  data: string;
}

export const AirCondition: Component<Props> = (props) => {
  const { settings } = useSettingsStore();
  const { location } = useLocationStore();

  const openMeteoQuery = openMeteoProvider({
    lat: location.lat,
    lon: location.lon,
    settings,
  });

  const hour = new Date().getHours();

  const [airConditionData, setAirConditionData] = createSignal<
    AirConditionData[]
  >([]);

  createEffect(() => {
    if (openMeteoQuery.isSuccess) {
      setAirConditionData([
        {
          title: "Real Feel",
          icon: realFeelIcon,
          data: `${openMeteoQuery.data.hourly.apparent_temperature[hour]}°`,
        },
        {
          title: "Wind",
          icon: windIcon,
          data: `${openMeteoQuery.data.hourly.windspeed_10m[hour]} ${settings.wind}`,
        },
        {
          title: "Chance of rain",
          icon: waterDropIcon,
          data: `${openMeteoQuery.data.hourly.precipitation_probability[hour]}%`,
        },
        {
          title: "Pressure",
          icon: pressureIcon,
          data: `${openMeteoQuery.data.hourly.pressure_msl[hour]} hPa`,
        },
      ]);
    }
  });

  return (
    <article class={props.class}>
      <Switch>
        <Match when={openMeteoQuery.isLoading}>
          <LoadingSpiner />
        </Match>

        <Match when={openMeteoQuery.isSuccess}>
          <p class="text-xs font-bold text-slate-400">AIR CONDITIONS</p>

          <div class="flex h-full flex-wrap items-center justify-center sm:mx-4">
            <For each={airConditionData()}>
              {(data) => (
                <AirConditionItem
                  ref={data.title}
                  title={data.title}
                  icon={data.icon}
                  data={data.data}
                />
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </article>
  );
};
