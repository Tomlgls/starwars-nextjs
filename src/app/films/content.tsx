"use client";

import { Comments, defaultComments } from "@/atoms/films-atoms";
import { LayoutContent } from "@/components/layout/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { useFilms } from "@/data/get-films";
import { getIdFromUrl } from "@/lib/utils";
import { useAtom } from "jotai";
import { AlertTriangle, MessagesSquare } from "lucide-react";
import Link from "next/link";

export default function FilmsContent() {
  // This useQuery could just as well happen in some deeper
  // child to <Films>, data will be available immediately either way
  const { error, data } = useFilms();

  const [comments] = useAtom<Comments>(defaultComments);

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
        <AlertTitle className="ml-2">No data found.</AlertTitle>
        <AlertDescription className="ml-2">
          Please come back later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <LayoutContent className="flex flex-col gap-8">
      <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.results && data.results.length > 0
          ? data.results.map((film) => (
              <Link
                key={getIdFromUrl(film.url)}
                href={`/films/${getIdFromUrl(film.url)}`}
              >
                <Card className="hover:bg-zinc-200 dark:hover:bg-zinc-900">
                  <CardHeader>
                    <CardTitle>
                      {getIdFromUrl(film.url)} &#8901; {film.title}
                    </CardTitle>
                    <CardDescription>Episode {film.episode_id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="small">
                      Release date:{" "}
                      {new Date(
                        Date.parse(film.release_date)
                      ).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">See details</Button>
                    {comments && comments[getIdFromUrl(film.url)] && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessagesSquare size={20} />
                        <Typography variant="small">
                          {comments[getIdFromUrl(film.url)].length}
                        </Typography>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </Link>
            ))
          : false}
      </div>
      {data.results?.length === 0 ? (
        <Alert>
          <AlertTriangle />
          <AlertTitle className="ml-2">There are no film yet.</AlertTitle>
          <AlertDescription className="ml-2">
            Please come back later.
          </AlertDescription>
        </Alert>
      ) : (
        false
      )}
    </LayoutContent>
  );
}
