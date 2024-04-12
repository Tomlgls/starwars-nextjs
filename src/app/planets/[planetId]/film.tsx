// "use client";
// This component is a client component cause it uses the usePlanet hook and is imported in a client component

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
import { useFilm } from "@/data/get-film";
import { getIdFromUrl } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Film({ film }: { film: string }) {
  const filmId = getIdFromUrl(film);

  const { error, isPending, data } = useFilm(filmId);

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
          No information found for this film.
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Link href={`/films/${filmId}`}>
      <Badge variant="secondary">{data.title}</Badge>
    </Link>
  );
}
