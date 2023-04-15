import { Component } from "solid-js";

export const LoadingSpiner: Component = () => {
  return (
    <div class="flex h-full w-full items-center justify-center">
      <span class="loader-spinner"></span>
    </div>
  );
};
