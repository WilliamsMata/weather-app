import { Component } from "solid-js";
import { Routes, Route, Navigate } from "@solidjs/router";

import AppLayout from "../weather/layout/AppLayout";
import {
  CitiesView,
  SettingsView,
  WeatherView,
  MapView,
} from "../weather/views";

const AppRouter: Component = () => {
  return (
    <Routes>
      <Route path={"/"} component={AppLayout}>
        <Route path={"/weather"} component={WeatherView} />
        <Route path={"/cities"} component={CitiesView} />
        <Route path={"/map"} component={MapView} />
        <Route path={"/settings"} component={SettingsView} />
      </Route>

      <Route path={"/*"} element={<Navigate href={"/weather"} />} />
    </Routes>
  );
};

export default AppRouter;
