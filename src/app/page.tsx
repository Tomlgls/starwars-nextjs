import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Eclipse, Film, FlaskConical, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container m-auto my-8 flex flex-col px-6 lg:my-16 xl:my-24 ">
      <section>
        <Typography variant="h1" className="mb-4">
          Hello, world!
        </Typography>
        <Typography variant="h2" className="mb-2">
          Might the force be with you.
        </Typography>
        <Typography className="text-muted-foreground">
          This small application is a React playground for using NextJs and
          other components based on the latest standards.
        </Typography>
        <Typography className="text-muted-foreground">
          It consumes the{" "}
          <a
            href="https://swapi.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:underline"
          >
            https://swapi.dev/
          </a>{" "}
          API for get information about the Star Wars universe.
        </Typography>
        <div className="mt-4">
          <a
            href="https://github.com/Tomlgls/starwars-nextjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <GitHubLogoIcon /> Git repository
            </Button>
          </a>
        </div>
      </section>
      <hr className="my-8 divide-y" />
      <section>
        <Typography
          variant="h2"
          className="mb-2 inline-flex flex-row items-center gap-2"
        >
          <Rocket />
          Get started
        </Typography>
        <Typography className="text-muted-foreground">
          Select a route to start your journey in the Star Wars universe:
        </Typography>
        <div className="mt-4 flex gap-2">
          <Link href="films">
            <Button size="lg">
              <Film size={16} className="mr-2" />
              Films
            </Button>
          </Link>
          <Link href="planets">
            <Button size="lg">
              <Eclipse size={16} className="mr-2" />
              Planets
            </Button>
          </Link>
        </div>
      </section>
      <section className="mt-12">
        <Typography variant="h3" className="mb-4">
          Libraries
        </Typography>
        <div className="flex flex-wrap gap-4 lg:gap-8">
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/nextjs.svg"
              alt="NextJs"
              className="size-16"
              height={64}
              width={64}
            />
          </a>
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/react.svg"
              alt="ReactJs"
              className="size-16"
              height={64}
              width={64}
            />
          </a>
          <a
            href="https://tanstack.com/query/latest/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/react-query.svg"
              alt="React Queries"
              className="size-16"
              height={64}
              width={64}
            />
          </a>
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/tailwindcss.svg"
              alt="TailwindCSS"
              className="size-16"
              height={64}
              width={64}
            />
          </a>
          <a href="https://zod.dev/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/zod.svg"
              alt="Zod"
              className="size-16"
              height={64}
              width={64}
            />
          </a>
          <a
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/typescript.svg"
              alt="TypeScript"
              className="size-16"
              height={64}
              width={64}
            />
          </a>
          <a
            href="https://github.com/pmndrs/jotai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/jotai-mascot.png"
              alt="Jotai"
              className="size-16"
              height={64}
              width={64}
            />
          </a>
        </div>
        <div className="mt-12">
          <Typography variant="h3" className="mb-2">
            Testing libraries
          </Typography>
          <Typography className="mb-4  inline-flex items-center gap-2 text-sm font-normal italic text-muted-foreground">
            <FlaskConical size={15} /> Coming soon, in progress...
          </Typography>
          <div className="flex flex-wrap gap-4 lg:gap-8">
            <a
              href="https://testing-library.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/testing-library.svg"
                alt="Testing Library"
                className="size-16"
                height={64}
                width={64}
              />
            </a>
            <a
              href="https://jestjs.io/fr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/jest.svg"
                alt="Testing Library"
                className="size-16"
                height={64}
                width={64}
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
