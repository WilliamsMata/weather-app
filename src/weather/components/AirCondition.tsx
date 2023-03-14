import { Component, For } from "solid-js";

import realFeelIcon from "../../assets/real-feel.svg";
import windIcon from "../../assets/wind.svg";
import waterDropIcon from "../../assets/water-drop.svg";
import pressureIcon from "../../assets/pressure.svg";
import { AirConditionItem } from "./AirConditionItem";

interface Props {
  class: string;
}

export interface AirConditionData {
  title: string;
  icon: string;
  data: string;
}

const airConditionData: AirConditionData[] = [
  {
    title: "Real Feel",
    icon: realFeelIcon,
    data: "30°",
  },
  {
    title: "Wind",
    icon: windIcon,
    data: "0.2 km/h",
  },
  {
    title: "Chance of rain",
    icon: waterDropIcon,
    data: "0%",
  },
  {
    title: "Pressure",
    icon: pressureIcon,
    data: "1015.4 hPa",
  },
];

export const AirCondition: Component<Props> = (props) => {
  return (
    <article class={props.class}>
      <p class="text-xs font-bold text-slate-400">AIR CONDITIONS</p>

      <div class="flex h-full flex-wrap items-center justify-center sm:mx-4">
        <For each={airConditionData}>
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
    </article>
  );
};
