import { SiteConfig } from "@/lib/site-config";
import { Planet, PlanetScheme } from "@/types/planet.schema";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const getPlanet: (id: string) => Promise<Planet> = async (id: string) =>
  fetch(`${SiteConfig.api_url}/planets/${id}`)
    .then((res) => res.json())
    .then(PlanetScheme.parse)
    .catch((error) => {
      console.log(error);
      return error;
    });

export function usePlanet(id: string): UseQueryResult<Planet, Error> {
  return useQuery({
    queryKey: ["planet", id],
    queryFn: () => getPlanet(id),
    enabled: !!id,
  });
}
