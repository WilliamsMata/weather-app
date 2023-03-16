import { createQuery } from "@tanstack/solid-query";
import { createSignal } from "solid-js";
import { useLocationStore } from "../../store/useLocationStore";
import { jsonIpApi } from "./jsonIpApi";
import { IPWho, JSONIP } from "../../interfaces/IpApi";
import { ipWhoApi } from "./ipWhoApi";

const getJsonIpApi = async (): Promise<JSONIP> => {
  try {
    const { data } = await jsonIpApi.get("");
    //console.log(data);
    return data;
  } catch (error) {
    // default ip when error
    return {
      ip: "8.8.8.8",
      country: "string",
      "geo-ip": "string",
      "API Help": "string",
    };
  }
};

const getIpWhoApi = async (ip: string): Promise<IPWho> => {
  const { data } = await ipWhoApi.get(`/${ip}`);
  //console.log(data);
  return data;
};

export const ipApiProvider = () => {
  const [enabled, setEnabled] = createSignal<boolean>(false);
  const { setLocation } = useLocationStore();

  const jsonIpApiQuery = createQuery(() => ["jsonIp"], getJsonIpApi, {
    staleTime: 1000 * 60 * 60,
    onSuccess: () => setEnabled(true),
  });

  const ipWhoApiQuery = createQuery(
    () => ["ip"],
    () => getIpWhoApi(jsonIpApiQuery.data!.ip),
    {
      staleTime: 1000 * 60 * 60,
      get enabled() {
        return enabled();
      },
      onSuccess: (data) => {
        setLocation({
          isOk: true,
          lat: data?.latitude,
          lon: data?.longitude,
          city: data.city,
        });
      },
    }
  );

  return { jsonIpApiQuery, ipWhoApiQuery };
};
