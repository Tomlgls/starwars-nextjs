import { SiteConfig } from "@/lib/site-config";
import { PlanetsResponse, PlanetsResponseScheme } from "@/types/planet.schema";
import {
  UseQueryResult,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import ky from "ky";
import { notFound } from "next/navigation";

export const getPlanets: (page?: string) => Promise<PlanetsResponse> = async (
  page: string = "1"
) =>
  ky
    .get(`${SiteConfig.api_url}/planets?page=${page}`)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) {
          notFound();
        }
        throw new Error("An error occured.");
      }

      return res.json();
    })
    .then(PlanetsResponseScheme.parse)
    .catch((error) => {
      throw new Error(error);
    });

export function usePlanets(
  page: string = "1"
): UseQueryResult<PlanetsResponse, Error> {
  return useQuery({
    queryKey: ["planets", page],
    queryFn: () => getPlanets(page),
    placeholderData: keepPreviousData,
    retry: false,
  });
}
