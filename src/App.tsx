import type { Component } from "solid-js";
import { AppRouter } from "./weather/router/AppRouter";

const App: Component = () => {
  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
