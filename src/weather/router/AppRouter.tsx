import { Component, lazy } from "solid-js";
import { Routes, Route, Navigate } from "@solidjs/router";

import AppLayout from "../layout/AppLayout";
import { CitiesView, SettingsView, WeatherView } from "../views";

export const AppRouter: Component = () => {
  return (
    <Routes>
      <Route path={"/"} component={AppLayout}>
        <Route path={"/weather"} component={WeatherView} />
        <Route path={"/cities"} component={CitiesView} />
        <Route path={"/settings"} component={SettingsView} />
      </Route>

      <Route path={"/*"} element={<Navigate href={"/weather"} />} />
    </Routes>
  );
};
