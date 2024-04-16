import { SiteConfig } from "@/lib/site-config";
import { Planet, PlanetScheme } from "@/types/planet.schema";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import ky from "ky";
import { notFound } from "next/navigation";

export const getPlanet: (id: string) => Promise<Planet> = async (id: string) =>
  ky
    .get(`${SiteConfig.api_url}/planets/${id}`)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) {
          notFound();
        }
        throw new Error("An error occured.");
      }

      return res.json();
    })
    .then(PlanetScheme.parse)
    .catch((error) => {
      throw new Error(error);
    });

export function usePlanet(id: string): UseQueryResult<Planet, Error> {
  return useQuery({
    queryKey: ["planet", id],
    queryFn: () => getPlanet(id),
    enabled: !!id,
    retry: false,
  });
}
