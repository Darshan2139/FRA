import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useApp } from "@/context/AppContext";

export const BreadcrumbBar = () => {
  const { location } = useApp();
  const { state, district = "District", block = "Block", village = "Village" } = location;
  return (
    <div className="border-b bg-background">
      <div className="container">
        <Breadcrumb className="py-2 text-sm">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">{state ?? "State"}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">{district}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">{block}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">{village}</BreadcrumbLink></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};
