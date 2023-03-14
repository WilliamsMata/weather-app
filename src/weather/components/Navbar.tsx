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
    <nav class="md:min-h-full md:w-24 md:pr-2">
      <div class="flex h-full justify-between bg-slate-800 px-2 md:flex-col md:justify-start md:rounded-2xl">
        <div class="flex items-center justify-center md:pt-4">
          <img src={umbrella} alt="umbrella" class="h-12 w-12" />
        </div>

        <div class="flex items-center justify-center md:mt-12 md:flex-col md:gap-4">
          <For each={navbarOptions}>
            {(opt) => (
              <A href={opt.path} class="w-20">
                <NavbarIcon icon={opt.icon} text={opt.text} ref={opt.text} />
              </A>
            )}
          </For>
        </div>
      </div>
    </nav>
  );
};
