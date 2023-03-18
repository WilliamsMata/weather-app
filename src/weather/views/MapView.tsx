import { Component, createEffect, createSignal, useContext } from "solid-js";
import { AppContext } from "../../context";
import { Cities } from "../components";

export const MapView: Component = () => {
  const [state] = useContext(AppContext);
  const [windMetric, setWindMetric] = createSignal<string>();

  createEffect(() => {
    switch (state.settings.wind) {
      case "kn":
        return setWindMetric("kt");

      case "ms":
        return setWindMetric("m%2Fs");

      case "mph":
        return setWindMetric("mph");

      case "kmh":
        return setWindMetric("km%2Fh");

      default:
        return setWindMetric("kt");
    }
  });

  return (
    <section class="flex h-[calc(100vh_-_10rem)] w-full md:h-full">
      <iframe
        class="h-full w-full rounded-xl md:w-7/12 lg:w-8/12"
        src={`https://embed.windy.com/embed2.html?lat=${
          state.location.lat
        }&lon=${state.location.lon}&detailLat=${state.location.lat}&detailLon=${
          state.location.lon
        }&zoom=9&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=true&metricWind=${windMetric()}&metricTemp=%C2%B0${
          state.settings.temperature === "Celsius" ? "C" : "F"
        }&radarRange=-1`}
      />

      <Cities class="hidden h-full pl-2 md:block md:w-5/12 lg:w-4/12" />
    </section>
  );
};
