import { getPlanet } from "@/data/get-planet";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import PlanetId from "./planetId";

export default async function PlanetsPage({
  params,
}: {
  params: { planetId: string };
}) {
  const queryClient = new QueryClient();

  if (!params.planetId) {
    notFound();
  }

  await queryClient.prefetchQuery({
    queryKey: ["planet", params.planetId],
    queryFn: () => getPlanet(params.planetId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlanetId id={params.planetId} />
    </HydrationBoundary>
  );
}
