import { Component, For } from "solid-js";
import { CitiesItem, useCities } from "..";

interface Props {
  class: string;
}

export const Cities: Component<Props> = (props) => {
  const { state, activeCity, setActiveCity } = useCities();

  return (
    <section class={props.class}>
      <div class="flex flex-col gap-2">
        <For each={state.history}>
          {(data) => (
            <CitiesItem
              ref={data.city}
              id={data.id}
              city={data.city}
              lat={data.lat}
              lon={data.lon}
              activeCity={activeCity()}
              setActiveCity={setActiveCity}
            />
          )}
        </For>
      </div>
    </section>
  );
};
