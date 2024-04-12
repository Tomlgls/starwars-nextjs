import { SiteConfig } from "@/lib/site-config";
import { Film, FilmScheme } from "@/types/film.schema";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const getFilm: (id: string) => Promise<Film> = async (id: string) =>
  fetch(`${SiteConfig.api_url}/films/${id}`)
    .then((res) => res.json())
    .then(FilmScheme.parse)
    .catch((error) => {
      console.log(error);
      return error;
    });

export function useFilm(id: string): UseQueryResult<Film, Error> {
  return useQuery({
    queryKey: ["film", id],
    queryFn: () => getFilm(id),
    enabled: !!id,
  });
}
