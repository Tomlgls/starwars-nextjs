import {
  BreadcrumbList,
  Breadcrumb as ShadcnBreadcrumb,
} from "../ui/breadcrumb";

export default function Breadcrumb({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShadcnBreadcrumb className="my-4">
      <BreadcrumbList>{children}</BreadcrumbList>
    </ShadcnBreadcrumb>
  );
}
