import { getCategoryList } from "@/functions/post";

export async function generateStaticParams() {
  const categoryList = getCategoryList();
  const paramList = categoryList.map((category) => ({ category }));
  return paramList;
}

const CategoryPage = async ({
  params: { category },
}: {
  params: { category: string };
}) => {
  return <></>;
};

export default CategoryPage;
