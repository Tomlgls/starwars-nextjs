import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Navigation(props: { href: string; text: string }) {
  const { href, text } = props;
  return (
    <div className="mt-8">
      <Link href={href}>
        <Button>
          <ArrowLeft size={16} className="mr-2" />
          {text}
        </Button>
      </Link>
    </div>
  );
}
