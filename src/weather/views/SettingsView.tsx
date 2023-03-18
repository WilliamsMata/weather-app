import { Component } from "solid-js";
import { Settings } from "../components";

export const SettingsView: Component = () => {
  return (
    <>
      <h1 class="text-2xl font-bold">Units</h1>

      <section class="grid grid-cols-12 gap-2">
        <Settings class="col-span-12 flex flex-col gap-4 rounded-lg bg-slate-800 p-4 md:col-span-8" />
      </section>
    </>
  );
};
