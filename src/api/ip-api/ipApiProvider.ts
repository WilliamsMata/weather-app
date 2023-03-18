import { createQuery } from "@tanstack/solid-query";
import { createSignal, useContext } from "solid-js";

import { jsonIpApi, ipWhoApi } from "./";
import { IPWho, JSONIP } from "../../interfaces";
import { AppContext } from "../../context";

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
  const [store, { setLocation }] = useContext(AppContext);

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
          id: "ip-location",
          lat: data?.latitude,
          lon: data?.longitude,
          city: data.city,
        });
      },
    }
  );

  return { jsonIpApiQuery, ipWhoApiQuery };
};
