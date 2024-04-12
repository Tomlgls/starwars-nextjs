import { SiteConfig } from "@/lib/site-config";
import { FilmsResponse, FilmsResponseScheme } from "@/types/film.schema";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const getFilms: () => Promise<FilmsResponse> = async () =>
  fetch(`${SiteConfig.api_url}/films`)
    .then((res) => res.json())
    .then(FilmsResponseScheme.parse)
    .catch((error) => {
      console.log(error);
      return error;
    });

export function useFilms(): UseQueryResult<FilmsResponse, Error> {
  return useQuery({
    queryKey: ["films"],
    queryFn: getFilms,
  });
}
