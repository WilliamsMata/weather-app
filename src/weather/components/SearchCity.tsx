import { Component, createSignal } from "solid-js";

export const SearchCity: Component = () => {
  const [inputSearch, setInputSearch] = createSignal<string>("");

  const handleSubmit = (
    e: Event & {
      submitter: HTMLElement;
    } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    e.preventDefault();
    if (inputSearch().length === 0) return;
    console.log(inputSearch());
    setInputSearch("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        name="city"
        value={inputSearch()}
        oninput={(e) => setInputSearch(e.currentTarget.value)}
        id="search-city"
        placeholder="Search for cities"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      />
    </form>
  );
};
