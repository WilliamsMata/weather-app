import {
  Component,
  For,
  createSignal,
  useContext,
  createEffect,
} from "solid-js";
import { CitiesItem } from "..";
import { AppContext } from "../../../context";

interface Props {
  class: string;
}

export const Cities: Component<Props> = (props) => {
  const [state] = useContext(AppContext);

  const [activeCity, setActiveCity] = createSignal<string>(state.history[0].id);

  createEffect(() => {
    setActiveCity(state.location.id);
  });

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
