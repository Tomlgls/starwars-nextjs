"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Card className="error m-auto mt-4 max-w-lg">
      <CardHeader>
        <CardTitle>
          Sorry, an error occurred while processing your request !
        </CardTitle>
        <CardDescription>
          Try again or contact support if the problem persists.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={reset}>Try again</Button>
      </CardFooter>
    </Card>
  );
}
