import { SiteConfig } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../ui/typography";

export const Footer = () => {
  return (
    <footer className="w-full border-t">
      <div className="m-auto w-full max-w-3xl px-2 py-4">
        <div className="grid grid-cols-1 items-center sm:grid-cols-3">
          <div>
            <Link href="/">
              <Image
                src="/images/logo.png"
                width={80}
                height={50}
                alt="app logo"
                className="size-auto"
              />
              <Typography>{SiteConfig.title}</Typography>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Typography>Pages</Typography>
            <Link href="/" className="text-sm text-gray-500 hover:underline">
              Home
            </Link>
            <Link
              href="/films"
              className="text-sm text-gray-500 hover:underline"
            >
              Films
            </Link>
            <Link
              href="/planets"
              className="text-sm text-gray-500 hover:underline"
            >
              Planets
            </Link>
          </div>
          <div className="flex flex-col  gap-2">
            <Typography>Resources:</Typography>
            <a
              className="text-sm text-gray-500 hover:underline"
              href="https://github.com/Tomlgls/starwars-nextjs/blob/main/package.json"
              target="_blank"
              rel="noopener noreferrer"
            >
              Packages
            </a>
            <a
              className="text-sm text-gray-500 hover:underline"
              href="https://github.com/Tomlgls/starwars-nextjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              className="text-sm text-gray-500 hover:underline"
              href="https://www.tomlanglais.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          </div>
        </div>
        <div className="mt-12 flex w-full items-center justify-center">
          <Typography className="text-xs text-gray-500">
            {new Date().getFullYear()} Star wars API
          </Typography>
        </div>
      </div>
    </footer>
  );
};
