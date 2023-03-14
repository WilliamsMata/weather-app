import { Component, For, createSignal } from "solid-js";
import { CitiesItem } from "./CitiesItem";

interface Props {
  class: string;
}

export interface CitiesData {
  weatherCode: number;
  city: string;
  temperature: number;
}

const citiesData: CitiesData[] = [
  {
    weatherCode: 0,
    city: "Madrid",
    temperature: 31,
  },
  {
    weatherCode: 63,
    city: "Vienna",
    temperature: 27,
  },
  {
    weatherCode: 65,
    city: "Athens",
    temperature: 33,
  },
];

export const Cities: Component<Props> = (props) => {
  const [activeCity, setActiveCity] = createSignal<string>(citiesData[0].city);

  return (
    <section class={props.class}>
      <div class="flex flex-col gap-4">
        <For each={citiesData}>
          {(data) => (
            <CitiesItem
              ref={data.city}
              city={data.city}
              temperature={data.temperature}
              weatherCode={data.weatherCode}
              activeCity={activeCity()}
              onClick={(city) => setActiveCity(city)}
            />
          )}
        </For>
      </div>
    </section>
  );
};
