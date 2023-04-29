import { Component, For, Switch, Match } from "solid-js";
import { TodayForecastItem, LoadingSpiner, useTodayForecast } from "..";

interface Props {
  class?: string;
  days: number;
}

export const TodayForecast: Component<Props> = (props) => {
  const { openMeteoQuery, todayData } = useTodayForecast();

  return (
    <article class={props.class}>
      <Switch>
        <Match when={openMeteoQuery.isLoading}>
          <LoadingSpiner />
        </Match>

        <Match when={openMeteoQuery.isSuccess}>
          <p class="text-xs font-bold text-slate-400">TODAY'S FORECAST</p>
          <div class="flex h-full justify-evenly gap-2 py-4">
            <For each={todayData().slice(0, props.days)}>
              {(data) => (
                <TodayForecastItem
                  ref={data.hour}
                  hour={data.hour}
                  temperature={data.temperature}
                  weatherCode={data.weatherCode}
                />
              )}
            </For>
          </div>
        </Match>
      </Switch>
    </article>
  );
};
