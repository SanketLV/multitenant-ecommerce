import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type CategoriesGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];

export interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string | null;
  parent?: string | Category | null;
  subcategories?: Category[] | null;
  createdAt: string;
  updatedAt: string;
}
