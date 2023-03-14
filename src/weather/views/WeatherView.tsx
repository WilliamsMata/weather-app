import { Component } from "solid-js";
import { TodayForecast } from "../components/TodayForecast";
import { TodayWeather } from "../components/TodayWeather";

export const WeatherView: Component = () => {
  return (
    <section class="grid h-full grid-cols-12 grid-rows-6 gap-2">
      <TodayWeather class="col-span-12 row-span-2 flex items-center justify-between px-4 md:col-span-8" />
      <TodayForecast class="col-span-12 row-span-2 rounded-xl bg-slate-800 p-4 md:col-span-8" />
    </section>
  );
};
