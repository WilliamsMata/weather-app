import { Component } from "solid-js";
import computerSvg from "../../assets/computer.svg";

export const ErrorView: Component = () => {
  return (
    <div class="flex min-h-screen items-center justify-center">
      <div class="flex w-full max-w-xl flex-col items-center justify-center gap-4 p-4 text-center text-slate-200">
        <p>
          Hello! It seems that you are having a problem on our website. We have
          noticed that you have an ad blocker extension activated and this may
          be preventing some elements of our page from displaying correctly.
        </p>
        <p>
          So that you can fully enjoy the experience on our website, we
          recommend that you temporarily disable your ad blocker so that you can
          access all the content and features we offer.
        </p>
        <img src={computerSvg} alt="error" />
      </div>
    </div>
  );
};
