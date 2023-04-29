import { useContext, createSignal, createEffect } from "solid-js";
import { openMeteoProvider } from "../../../api/open-meteo";
import { AppContext } from "../../../context";

import realFeelIcon from "../../../assets/real-feel.svg";
import windIcon from "../../../assets/wind.svg";
import waterDropIcon from "../../../assets/water-drop.svg";
import pressureIcon from "../../../assets/pressure.svg";

export interface AirConditionData {
  title: string;
  icon: string;
  data: string;
}

export const useAirCondition = () => {
  const [state] = useContext(AppContext);

  const openMeteoQuery = openMeteoProvider();

  const hour = new Date().getHours();

  const [airConditionData, setAirConditionData] = createSignal<
    AirConditionData[]
  >([]);

  createEffect(() => {
    if (openMeteoQuery.isSuccess) {
      setAirConditionData([
        {
          title: "Real Feel",
          icon: realFeelIcon,
          data: `${openMeteoQuery.data.hourly.apparent_temperature[hour]}°`,
        },
        {
          title: "Wind",
          icon: windIcon,
          data: `${openMeteoQuery.data.hourly.windspeed_10m[hour]} ${state.settings.wind}`,
        },
        {
          title: "Chance of rain",
          icon: waterDropIcon,
          data: `${openMeteoQuery.data.hourly.precipitation_probability[hour]}%`,
        },
        {
          title: "Pressure",
          icon: pressureIcon,
          data: `${openMeteoQuery.data.hourly.pressure_msl[hour]} hPa`,
        },
      ]);
    }
  });

  return {
    openMeteoQuery,
    airConditionData,
  };
};
