import { getPlanets } from "@/data/get-planets";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Planets from "./planets";

export default async function PlanetsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["planets", "1"],
    queryFn: () => getPlanets(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Planets />
    </HydrationBoundary>
  );
}
