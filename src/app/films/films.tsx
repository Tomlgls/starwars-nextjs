import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import Navigation from "@/components/navigation/navigation";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import FilmsContent from "./content";

export default function Films() {
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
        </Breadcrumb>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-8">
        <FilmsContent />
        <Navigation href="/" text="Back to home" />
      </LayoutContent>
    </Layout>
  );
}
