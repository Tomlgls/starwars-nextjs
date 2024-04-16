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
import { usePlanet } from "@/data/get-planet";
import { AlertTriangle, Film as FilmIcon, Info } from "lucide-react";
import Link from "next/link";
import Film from "./film";

export default function PlanetId({ id }: { id: string }) {
  const { error, data: planet, isPending } = usePlanet(id);

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

  if (!planet) {
    return (
      <Layout>
        <Alert>
          <AlertTriangle />
          <AlertTitle className="ml-2">No result for this planet.</AlertTitle>
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
        <LayoutTitle>Star wars planets</LayoutTitle>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/planets">Planets</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{(planet && planet.name) ?? id}</BreadcrumbPage>
          </BreadcrumbItem>
        </Breadcrumb>
      </LayoutHeader>
      <LayoutContent className="mt-6">
        {planet && (
          <>
            <Typography variant="h1" className="mb-2 text-yellow-500">
              {planet.name}
            </Typography>
            <div className="mb-4 mt-8 flex items-center gap-2">
              <Info />
              <Typography>About the planet:</Typography>
            </div>
            <div className="flex flex-col gap-2">
              <Typography>Population: {planet.population}</Typography>
              <Typography>Surface water: {planet.surface_water}</Typography>
              <Typography>Rotation period: {planet.rotation_period}</Typography>
              <Typography>Orbital period: {planet.orbital_period}</Typography>
              <Typography>Diameter: {planet.diameter}</Typography>
              <Typography>Climate: {planet.climate}</Typography>
              <Typography>Gravity: {planet.gravity}</Typography>
              <Typography>Terrain: {planet.terrain}</Typography>
            </div>
            <div className="mt-8">
              <div className="mb-4 flex items-center gap-2">
                <FilmIcon /> <Typography>Films:</Typography>
              </div>
              {planet.films && planet.films.length > 0 ? (
                <div className="flex max-w-xl flex-row flex-wrap gap-4">
                  {planet.films.map((film, index) => (
                    <Film key={index} film={film} />
                  ))}
                </div>
              ) : (
                "No film found."
              )}
            </div>
          </>
        )}
        <hr className="my-8 divide-y" />
        <Navigation href="/planets" text="Back to planets list" />
      </LayoutContent>
    </Layout>
  );
}
