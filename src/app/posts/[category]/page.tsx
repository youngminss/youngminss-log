import { getCategoryList } from "@/functions/post";

export async function generateStaticParams() {
  const categoryList = getCategoryList();
  const paramList = categoryList.map((category) => ({ category }));
  return paramList;
}

const CategoryPage = async ({ category }: { category: string }) => {
  console.log(category);

  return <></>;
};

export default CategoryPage;
