import { Component } from "solid-js";
interface Props {
  icon: string;
  text: string;
}

export const NavbarIcon: Component<Props> = (props) => {
  return (
    <figure class="flex cursor-pointer flex-col items-center justify-center rounded-lg py-2 transition hover:bg-slate-600">
      <img src={props.icon} alt={props.text} class="h-8 w-8" />
      <figcaption>{props.text}</figcaption>
    </figure>
  );
};
