import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Eclipse, Film } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container m-auto my-8 flex flex-col px-6 lg:my-16 xl:my-24 ">
      <section className="flex flex-1 flex-col gap-4 lg:gap-6">
        <Typography variant="h1">Hello, world!</Typography>
        <Typography variant="h2">Might the force be with you.</Typography>
      </section>
      <hr className="my-8 divide-y" />
      <section className="flex flex-1 flex-col gap-4 lg:gap-6">
        <Typography variant="h2">Get started</Typography>
        <p>Select a data:</p>
        <div className="flex gap-2">
          <Link href="films">
            <Button>
              <Film size={16} className="mr-2" />
              Films
            </Button>
          </Link>
          <Link href="planets">
            <Button>
              <Eclipse size={16} className="mr-2" />
              Planets
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
