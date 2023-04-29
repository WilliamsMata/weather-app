import { Component, For, Match, Switch } from "solid-js";

import { AirConditionItem, LoadingSpiner, useAirCondition } from "..";

interface Props {
  class: string;
}

export const AirCondition: Component<Props> = (props) => {
  const { airConditionData, openMeteoQuery } = useAirCondition();

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
