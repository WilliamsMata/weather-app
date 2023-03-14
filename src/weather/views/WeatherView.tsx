import { Component } from "solid-js";
import { AirCondition } from "../components/AirCondition";
import { DayForecast } from "../components/DayForecast";
import { TodayForecast } from "../components/TodayForecast";
import { TodayWeather } from "../components/TodayWeather";

export const WeatherView: Component = () => {
  return (
    <section class="grid h-full grid-cols-12 grid-rows-10 gap-2 md:grid-rows-6">
      <TodayWeather class="col-span-12 row-span-2 flex items-center justify-between px-4 md:col-span-8" />
      <TodayForecast
        class="col-span-12 row-span-2 rounded-xl bg-slate-800 p-4 md:col-span-8"
        days={7}
      />
      <AirCondition class="col-span-12 row-span-2 rounded-xl bg-slate-800 p-4 md:col-span-8" />
      <DayForecast
        class="col-span-12 row-span-4 row-start-7 rounded-xl bg-slate-800 p-4 md:col-span-4 md:col-start-9 md:row-span-6 md:row-start-1"
        days={7}
      />
    </section>
  );
};
