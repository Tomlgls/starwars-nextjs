"use client";

import Loading from "@/app/loading";
import { Comments, defaultComments } from "@/atoms/films-atoms";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useFilm } from "@/data/get-film";
import { useAtom } from "jotai";
import {
  AlertTriangle,
  BookText,
  Eclipse,
  MessageSquareQuote,
  SendHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Planet from "./planet";

const defaultComment = "";

export default function FilmId({ id }: { id: string }) {
  const { error, data: film, isPending } = useFilm(id);

  const [comments, setComments] = useAtom<Comments>(defaultComments); // Comments are stored in the global state using Jotai
  const [comment, setComment] = useState<string>(defaultComment);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const comment = String(formData.get("comment")).trim();

    if (!comment) return;

    const newComment = { id: new Date().toString(), comment };

    setComments((old) => ({
      ...old,
      [id]: [
        ...(old[id] ?? []),
        newComment, // Add the new comment to the list
      ],
    }));

    setComment("");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setComment(event.target.value);
  }

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
        <Typography className="text-muted-foreground">
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
        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <MessageSquareQuote /> <Typography>Comments:</Typography>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-sm items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="Add a new comment"
              onChange={handleChange}
              name="comment"
              value={comment}
            />
            <Button type="submit" className="gap-2" variant="secondary">
              <SendHorizontal size={20} /> Send
            </Button>
          </form>
          <div className="mt-4">
            {comments[id] && comments[id].length ? (
              <ul className="list-inside list-disc">
                {comments[id].map((comment) => (
                  <li key={comment.id} className="mt-2 text-sm">
                    {comment.comment}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography className="text-xs italic text-muted-foreground">
                No comment yet.
              </Typography>
            )}
          </div>
        </div>
        <hr className="my-8 divide-y" />
        <Navigation href="/films" text="Back to films list" />
      </LayoutContent>
    </Layout>
  );
}
