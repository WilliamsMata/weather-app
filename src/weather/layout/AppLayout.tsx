import { Component } from "solid-js";
import { Outlet } from "@solidjs/router";
import { Navbar } from "../components/Navbar";
import { SearchCity } from "../components/SearchCity";

const AppLayout: Component = () => {
  return (
    <main class="flex gap-2">
      <Navbar />

      <div class="pt-2">
        <SearchCity />
        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
