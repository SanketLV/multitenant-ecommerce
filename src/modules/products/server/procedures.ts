import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import { z } from "zod";
import { sortValues } from "../search-params";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";

      if (input.sort === "curated") {
        sort = "-createdAt";
      }
      if (input.sort === "hot_and_new") {
        sort = "name";
      }
      if (input.sort === "trending") {
        sort = "+createdAt";
      }

      if (input.minPrice || input.maxPrice) {
        where.price = {};
        if (input.minPrice) {
          where.price.greater_than_equal = input.minPrice;
        }
        if (input.maxPrice) {
          where.price.less_than_equal = input.maxPrice;
        }
      }

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1, // Fetch only top-level categories || Populate subcategories
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoriesData.docs.map((category) => ({
          ...category,
          subcategories: (category.subcategories?.docs ?? []).map(
            (subcategory) => ({
              // Because of "depth: 1" we are confident "subcategory" will be a type of "Category"
              ...(subcategory as Category),
              subcategories: undefined, // Remove subcategories from subcategories node
            })
          ),
        }));

        const subCategoriesSlugs = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subCategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );

          where["category.slug"] = {
            in: [parentCategory.slug, ...subCategoriesSlugs],
          };
        }
      }

      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 1, // Fetch only top-level categories || Populate category, Image
        where,
        sort,
      });

      return data;
    }),
});
