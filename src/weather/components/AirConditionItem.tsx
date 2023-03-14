import { Component } from "solid-js";
import { AirConditionData } from "./AirCondition";

export const AirConditionItem: Component<AirConditionData> = (props) => {
  return (
    <div class="flex w-6/12 items-center gap-4">
      <img src={props.icon} alt={props.title} class="h-6 w-6" />
      <div>
        <p class="text-slate-400">{props.title}</p>
        <h3 class="text-xl font-bold md:text-2xl">{props.data}</h3>
      </div>
    </div>
  );
};
