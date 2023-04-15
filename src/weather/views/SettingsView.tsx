import { Component } from "solid-js";
import { UnitsSettings, GeneralSettings } from "../components";

export const SettingsView: Component = () => {
  return (
    <>
      <section class="grid grid-cols-12 gap-2">
        <div class="col-span-12 flex flex-col gap-2 md:col-span-8">
          <h1 class="text-2xl font-bold">Units</h1>
          <UnitsSettings class="flex flex-col gap-4 rounded-lg bg-slate-800 p-4 " />
        </div>
        <div class="col-span-12 flex flex-col gap-2 md:col-span-8">
          <h1 class="text-2xl font-bold">Generals</h1>
          <GeneralSettings class="flex flex-col gap-4 rounded-lg bg-slate-800 p-4 " />
        </div>
      </section>
    </>
  );
};
