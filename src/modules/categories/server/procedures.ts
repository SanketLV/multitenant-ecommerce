import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "categories",
      depth: 1, // Fetch only top-level categories || Populate subcategories
      pagination: false,
      where: {
        parent: {
          exists: false, // Find top-level categories
        },
      },
      sort: "name",
    });

    const formattedData = data.docs.map((category) => ({
      ...category,
      subcategories: (category.subcategories?.docs ?? []).map(
        (subcategory) => ({
          // Because of "depth: 1" we are confident "subcategory" will be a type of "Category"
          ...(subcategory as Category),
          // subcategories: undefined, // Remove subcategories from subcategories node
        })
      ),
    }));
    return formattedData;
  }),
});
