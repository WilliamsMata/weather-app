import { Component } from "solid-js";
import { Outlet } from "@solidjs/router";
import { Navbar } from "../components/Navbar";
import { SearchCity } from "../components/SearchCity";

const AppLayout: Component = () => {
  return (
    <main class="flex min-h-screen flex-col md:flex-row md:p-2">
      <Navbar />

      <div class="flex w-full flex-col gap-4 px-2 pt-2 md:pt-0">
        <div class="md:grid md:grid-cols-12">
          <SearchCity />
        </div>

        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
