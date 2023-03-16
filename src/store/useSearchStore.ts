import { createStore } from "solid-js/store";

interface SearchStore {
  search: string;
}

const initialValue = {
  search: "",
};

export const useSearchStore = () => {
  const [searchStore, setSearchStore] = createStore<SearchStore>(initialValue);

  return {
    searchStore,
    setSearchStore,
  };
};
