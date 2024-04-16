import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../ui/typography";

export const Footer = () => {
  return (
    <footer className="w-full border-t">
      <div className="m-auto w-full max-w-3xl px-2 py-4">
        <div className="grid grid-cols-1 items-center gap-4 min-[360px]:grid-cols-3">
          <Link href="/">
            <Image
              src="/images/star-wars-logo.svg"
              className="size-auto max-w-[110px]"
              width={0}
              height={0}
              alt="App logo"
              priority
            />
            <Typography className="pl-2">{SiteConfig.title}</Typography>
          </Link>
          <div>
            <Typography className="mb-2">Pages</Typography>
            <ul>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/films"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  Films
                </Link>
              </li>
              <li>
                <Link
                  href="/planets"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  Planets
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Typography className="mb-2">Resources:</Typography>
            <ul>
              <li>
                <a
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  href="https://github.com/Tomlgls/starwars-nextjs/blob/main/package.json"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Packages
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  href="https://github.com/Tomlgls/starwars-nextjs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                  href="https://www.tomlanglais.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex w-full items-center justify-center">
          <Typography className="text-xs text-muted-foreground">
            {new Date().getFullYear()} Star wars API
          </Typography>
        </div>
      </div>
    </footer>
  );
};
