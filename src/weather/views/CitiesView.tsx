import { Component } from "solid-js";
import { Cities } from "../components/Cities";
import { DayForecast } from "../components/DayForecast";
import { TodayForecast } from "../components/TodayForecast";
import { TodayWeather } from "../components/TodayWeather";

export const CitiesView: Component = () => {
  return (
    <>
      <section class="grid h-full grid-cols-12 gap-2">
        <Cities class="col-span-12 h-full md:col-span-6 lg:col-span-8" />

        <div class="col-span-12 h-full md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9">
          <TodayWeather
            class="mt-4 flex h-40 items-center justify-between border-b-2 border-b-slate-700 px-4 pb-4 md:mt-0"
            heightIcon={6}
            widthIcon={6}
            bigFont={false}
          />

          <TodayForecast days={3} class={"border-b-2 border-b-slate-700 p-4"} />

          <DayForecast days={3} class={"p-4"} />
        </div>
      </section>
    </>
  );
};
