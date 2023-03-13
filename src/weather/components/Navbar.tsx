import { Component, createMemo, For } from "solid-js";
import { A } from "@solidjs/router";

import { NavbarIcon } from "./NavbarIcon";
import umbrella from "../../assets/umbrella.svg";
import sunCloudy from "../../assets/sun-cloudy.svg";
import menu from "../../assets/menu.svg";
import settings from "../../assets/settings.svg";

interface Options {
  icon: string;
  text: string;
  path: string;
}

const navbarOptions: Options[] = [
  {
    icon: sunCloudy,
    text: "Weather",
    path: "/weather",
  },
  {
    icon: menu,
    text: "Cities",
    path: "/cities",
  },
  {
    icon: settings,
    text: "Settings",
    path: "/settings",
  },
];

export const Navbar: Component = () => {
  return (
    <nav class="min-h-screen w-24 p-2">
      <div class="h-full rounded-2xl bg-slate-800">
        <div class="flex items-center justify-center pt-4">
          <img src={umbrella} alt="umbrella" class="h-12 w-12" />
        </div>

        <div class="mt-12 flex flex-col items-center justify-center gap-4">
          <For each={navbarOptions}>
            {(opt) => (
              <A href={opt.path} class="w-full">
                <NavbarIcon icon={opt.icon} text={opt.text} ref={opt.text} />
              </A>
            )}
          </For>
        </div>
      </div>
    </nav>
  );
};
