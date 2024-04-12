// "use client";
// This component is a client component cause it uses the usePlanet hook and is imported in a client component

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
import { usePlanet } from "@/data/get-planet";
import { getIdFromUrl } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Planet({ planet }: { planet: string }) {
  const planetId = getIdFromUrl(planet);

  const { error, isPending, data } = usePlanet(planetId);

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert>
        <AlertTriangle />
        <AlertTitle className="ml-2">An error occured.</AlertTitle>
        <AlertDescription className="ml-2">Please try again.</AlertDescription>
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert>
        <AlertTriangle />
        <AlertTitle className="ml-2">
          No information found for this planet.
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Link href={`/planets/${planetId}`}>
      <Badge variant="secondary">{data.name}</Badge>
    </Link>
  );
}
