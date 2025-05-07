import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  activeCategory?: string | null;
  activeCategoryName?: string | null;
  activeSubCategoryName?: string | null;
}

const BreadCrumbNavigation = ({
  activeCategory,
  activeCategoryName,
  activeSubCategoryName,
}: Props) => {
  if (!activeCategoryName || activeCategory === "all") return null;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {activeSubCategoryName ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-xl font-medium underline text-primary"
              >
                <Link href={`/${activeCategory}`}>{activeCategoryName}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-primary font-medium text-lg">
              /
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xl font-medium">
                {activeSubCategoryName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xl font-medium">
              {activeCategoryName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbNavigation;
