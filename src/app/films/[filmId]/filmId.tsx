"use client";

import Loading from "@/app/loading";
import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import Navigation from "@/components/navigation/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Typography } from "@/components/ui/typography";
import { useFilm } from "@/data/get-film";
import { AlertTriangle, BookText, Eclipse } from "lucide-react";
import Link from "next/link";
import Planet from "./planet";

export default function FilmId({ id }: { id: string }) {
  const { error, data: film, isPending } = useFilm(id);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return (
      <Layout>
        <Alert>
          <AlertTriangle />
          <AlertTitle className="ml-2">An error occured.</AlertTitle>
          <AlertDescription className="ml-2">
            Please try again.
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  if (!film) {
    return (
      <Layout>
        <Alert>
          <AlertTriangle />
          <AlertTitle className="ml-2">No result for this film.</AlertTitle>
          <AlertDescription className="ml-2">
            Please come back later.
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Star wars films</LayoutTitle>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/films">Films</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{film.title ?? id}</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </LayoutHeader>
      <LayoutContent className="mt-6">
        <Typography variant="h1" className="mb-2 text-yellow-500">
          {film.title}
        </Typography>
        <Typography>Episode: {film.episode_id}</Typography>
        <Typography className="text-gray-400">
          Release date:{" "}
          {new Date(Date.parse(film.release_date)).toLocaleDateString()}
        </Typography>
        <div className="mb-4 mt-8 flex items-center gap-2">
          <BookText /> <Typography>Resume:</Typography>
        </div>
        <Typography>{film.opening_crawl}</Typography>
        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <Eclipse /> <Typography>Planets:</Typography>
          </div>
          {film.planets && film.planets.length > 0 ? (
            <div className="flex max-w-xl flex-row flex-wrap gap-4">
              {film.planets.map((planet, index) => (
                <Planet key={index} planet={planet} />
              ))}
            </div>
          ) : (
            "No planet found."
          )}
        </div>
        <hr className="my-8 divide-y" />
        <Navigation href="/films" text="Back to films list" />
      </LayoutContent>
    </Layout>
  );
}
