"use client";

import { LayoutContent } from "@/components/layout/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Typography } from "@/components/ui/typography";
import { usePlanets } from "@/data/get-planets";
import { getIdFromUrl } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

// TO DO
// The provided count is the total number of items and not the total number of pages.
// We need to calculate the number of pages based on the limit, which is 10 : 60 / 10
// We display previous and next button based on API return, we could do it based on the count.

const limit = 10;

const RangeIndexSchema = z.object({
  page: z.number(),
  type: z.enum(["page", "ellipsis"]),
});

type RangeIndex = z.infer<typeof RangeIndexSchema>;

// Build the pagination numbers
// count: total number of items
// page: current page
// delta: number of pages to show before and after the current page
function buildPagination(count: number, page: number): RangeIndex[] {
  const delta = 3;
  const range: RangeIndex[] = [];

  const type = "page";

  if (count > 1) {
    if (page > count - delta) {
      // If the current page is close to the end
      for (let i = count + 1 - delta; i <= count; i++) {
        if (i !== 0) range.push({ page: i, type });
      }

      if (count > delta) {
        range.unshift({ page: count - delta, type: "ellipsis" });
      }
    } else {
      for (let i = 1; i <= count; i++) {
        if (i <= delta) {
          range.push({ page: i, type });
        } else {
          range.push({ page: i, type: "ellipsis" });
          break;
        }
      }

      if (delta < count) {
        range.push({ page: count, type });
      }
    }
  } else {
    return [{ page, type }];
  }

  return range;
}

// Calculate the number of pages based on the count and limit
function getPaginationCount(count: number, limit: number) {
  return Math.ceil(count / limit);
}

export default function PlanetsContent() {
  const [page, setPage] = useState(1);
  const { error, data, isFetching } = usePlanets(page.toString());

  const renderPagination = (rangeIndex: RangeIndex, page: number) => {
    if (rangeIndex.type === "ellipsis") {
      return (
        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    return (
      <PaginationItem key={rangeIndex.page}>
        <PaginationLink
          isActive={rangeIndex.page === page}
          className="cursor-pointer"
          onClick={() => setPage(rangeIndex.page)}
        >
          {rangeIndex.page}
        </PaginationLink>
      </PaginationItem>
    );
  };

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
      {data.results && data.results.length > 0 ? (
        <>
          <div className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {data.results.map((planet) => (
              <Link
                key={getIdFromUrl(planet.url)}
                href={`/planets/${getIdFromUrl(planet.url)}`}
              >
                <Card className="hover:bg-zinc-900">
                  <CardHeader>
                    <CardTitle>
                      {getIdFromUrl(planet.url)} &#8901; {planet.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="small">{planet.terrain}</Typography>
                    {planet.films && planet.films.length > 0 ? (
                      <Badge className="mt-4">
                        {planet.films.length} film
                        {planet.films.length > 1 ? "s" : false}
                      </Badge>
                    ) : (
                      false
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">See details</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          {(data.next || data.previous) && data.count && (
            <div className="center-content flex">
              <Pagination>
                <PaginationContent>
                  {data.previous && (
                    <PaginationItem>
                      <PaginationPrevious
                        className="cursor-pointer"
                        onClick={() => setPage((p) => p - 1)}
                      />
                    </PaginationItem>
                  )}
                  {buildPagination(
                    getPaginationCount(data.count, limit),
                    page
                  ).map((index) => renderPagination(index, page))}
                  {data.next && (
                    <PaginationItem>
                      {isFetching ? (
                        <Loader />
                      ) : (
                        <PaginationNext
                          className="cursor-pointer"
                          onClick={() => setPage((p) => p + 1)}
                        />
                      )}
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        false
      )}
      {data.results?.length === 0 ? (
        <Alert>
          <AlertTriangle />
          <AlertTitle className="ml-2">There are no planet yet.</AlertTitle>
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
