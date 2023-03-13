import { Component } from "solid-js";
import { Options } from "./Navbar";

export const NavbarIcon: Component<Options> = (props) => {
  return (
    <figure class="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg py-2 hover:bg-slate-600">
      <img src={props.icon} alt={props.text} class="h-8 w-8" />
      <figcaption>{props.text}</figcaption>
    </figure>
  );
};
