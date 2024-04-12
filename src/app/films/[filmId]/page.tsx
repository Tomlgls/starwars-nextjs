import { getFilm } from "@/data/get-film";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import FilmId from "./filmId";

export default async function FilmsPage({
  params,
}: {
  params: { filmId: string };
}) {
  const queryClient = new QueryClient();

  if (!params.filmId) {
    // This is a Next.js function that will return a 404 page
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ["film", params.filmId],
    queryFn: () => getFilm(params.filmId),
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilmId id={params.filmId} />
    </HydrationBoundary>
  );
}
