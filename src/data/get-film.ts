import { SiteConfig } from "@/lib/site-config";
import { Film, FilmScheme } from "@/types/film.schema";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import ky from "ky";
import { notFound } from "next/navigation";

export const getFilm: (id: string) => Promise<Film> = async (id: string) =>
  ky(`${SiteConfig.api_url}/films/${id}`)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) {
          notFound();
        }
        throw new Error("An error occured.");
      }

      return res.json();
    })
    .then(FilmScheme.parse)
    .catch((error) => {
      throw new Error(error);
    });

export function useFilm(id: string): UseQueryResult<Film, Error> {
  return useQuery({
    queryKey: ["film", id],
    queryFn: () => getFilm(id),
    enabled: !!id,
    retry: false,
  });
}
