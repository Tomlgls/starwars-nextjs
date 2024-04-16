import { SiteConfig } from "@/lib/site-config";
import { FilmsResponse, FilmsResponseScheme } from "@/types/film.schema";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import ky from "ky";
import { notFound } from "next/navigation";

export const getFilms: () => Promise<FilmsResponse> = async () =>
  ky
    .get(`${SiteConfig.api_url}/films`)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404) {
          notFound();
        }
        throw new Error("An error occured.");
      }

      return res.json();
    })
    .then(FilmsResponseScheme.parse)
    .catch((error) => {
      throw new Error(error);
    });

export function useFilms(): UseQueryResult<FilmsResponse, Error> {
  return useQuery({
    queryKey: ["films"],
    queryFn: getFilms,
    retry: false,
  });
}
