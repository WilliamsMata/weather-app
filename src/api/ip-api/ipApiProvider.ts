import { createQuery } from "@tanstack/solid-query";
import { createSignal } from "solid-js";
import { IpApi, Ipify } from "../../interfaces/IpApi";
import { useLocationStore } from "../../store/useLocationStore";
import { ipApi } from "./ipApi";
import { ipifyApi } from "./ipifyApi";

const getIpifyApi = async (): Promise<Ipify> => {
  const { data } = await ipifyApi.get("");
  console.log(data);
  return data;
};

const getIpApi = async (ip: string): Promise<IpApi> => {
  const { data } = await ipApi.get(`/${ip}`);
  console.log(data);
  return data;
};

export const ipApiProvider = () => {
  const [enabled, setEnabled] = createSignal<boolean>(false);
  const { setLocation } = useLocationStore();

  const ipifyApiQuery = createQuery(() => ["ipify"], getIpifyApi, {
    staleTime: 1000 * 60 * 60,
    onSuccess: () => setEnabled(true),
  });

  const ipApiQuery = createQuery(
    () => ["ip"],
    () => getIpApi(ipifyApiQuery.data!.ip),
    {
      staleTime: 1000 * 60 * 60,
      get enabled() {
        return enabled();
      },
      onSuccess: (data) => {
        setLocation({
          isOk: true,
          lat: data?.lat,
          lon: data?.lon,
          city: data.city,
        });
      },
    }
  );

  return { ipifyApiQuery, ipApiQuery };
};
