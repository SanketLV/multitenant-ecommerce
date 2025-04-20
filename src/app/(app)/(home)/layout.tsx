import configPromise from "@/payload.config";
import { getPayload } from "payload";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { SearchFilters } from "./search-filters";
import { Category } from "@/payload-types";

interface Props {
  children: React.ReactNode;
}

const HomeLayout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, // Fetch only top-level categories || Populate subcategories
    pagination: false,
    where: {
      parent: {
        exists: false, // Find top-level categories
      },
    },
  });

  const formattedData = data.docs.map((category) => ({
    ...category,
    subcategories: (category.subcategories?.docs ?? []).map((subcategory) => ({
      // Because of "depth: 1" we are confident "subcategory" will be a type of "Category"
      ...(subcategory as Category),
      subcategories: undefined, // Remove subcategories from subcategories node
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
