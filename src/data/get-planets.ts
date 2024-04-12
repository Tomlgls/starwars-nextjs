import { SiteConfig } from "@/lib/site-config";
import { PlanetsResponse, PlanetsResponseScheme } from "@/types/planet.schema";
import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

export const getPlanets: (page?: string) => Promise<PlanetsResponse> = async (
  page: string = "1"
) =>
  fetch(`${SiteConfig.api_url}/planets?page=${page}`)
    .then((res) => res.json())
    .then(PlanetsResponseScheme.parse)
    .catch((error) => {
      console.log(error);
      return error;
    });

export function usePlanets(
  page: string = "1"
): UseQueryResult<PlanetsResponse, Error> {
  return useQuery({
    queryKey: ["planets", page],
    queryFn: () => getPlanets(page),
    placeholderData: keepPreviousData,
  });
}
