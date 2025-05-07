import React from "react";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage = async ({ params }: Props) => {
  const { category } = await params;

  return <div className="capitalize">CategoryPage - {category}</div>;
};

export default CategoryPage;
