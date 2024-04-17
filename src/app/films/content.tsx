"use client";

import { commentsAtom } from "@/atoms/films-atoms";
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
import { Film } from "@/types/film.schema";
import { useAtomValue } from "jotai";
import { AlertTriangle, MessagesSquare } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

const RenderComments = (url: string) => {
  // const [comments] = useMemo(() => useAtom(commentsAtom), []);

  const comments = useAtomValue(useMemo(() => commentsAtom, []));

  if (!comments || !comments[getIdFromUrl(url)]) {
    return false;
  }

  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <MessagesSquare size={20} />
      <Typography variant="small">
        {comments[getIdFromUrl(url)].length}
      </Typography>
    </div>
  );
};

function FilmCard(props: Film) {
  const { url, title, episode_id, release_date } = props;

  return (
    <Link href={`/films/${getIdFromUrl(url)}`}>
      <Card className="hover:bg-zinc-200 dark:hover:bg-zinc-900">
        <CardHeader>
          <CardTitle>
            {getIdFromUrl(url)} &#8901; {title}
          </CardTitle>
          <CardDescription>Episode {episode_id}</CardDescription>
        </CardHeader>
        <CardContent>
          <Typography variant="small">
            Release date:{" "}
            {new Date(Date.parse(release_date)).toLocaleDateString()}
          </Typography>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">See details</Button>
          {RenderComments(url)}
        </CardFooter>
      </Card>
    </Link>
  );
}

export default function FilmsContent() {
  // This useQuery could just as well happen in some deeper
  // child to <Films>, data will be available immediately either way
  const { error, data } = useFilms();

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
              <FilmCard key={getIdFromUrl(film.url)} {...film} />
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
