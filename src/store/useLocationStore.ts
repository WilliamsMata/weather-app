import { createStore } from "solid-js/store";

interface LocationStore {
  isOk: boolean;
  lat: number;
  lon: number;
  city: string;
}

const initialValue = {
  isOk: false,
  lat: 0,
  lon: 0,
  city: "",
};

export const useLocationStore = () => {
  const [location, setLocation] = createStore<LocationStore>(initialValue);

  return {
    location,
    setLocation,
  };
};
