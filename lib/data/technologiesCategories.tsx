import { unstable_noStore as noStore } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import { TechnologyCategory } from "@/lib/models";

export async function fetchTechnologiesCategories() {
  noStore();
  await dbConnect();

  const options = {
    sort: "name",
  };

  const technologies = await TechnologyCategory.find({}, {}, options);

  return technologies;
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredTechnologiesCategories(
  query = "",
  currentPage = 1,
  sortBy = "order",
  order = "asc"
) {
  noStore();
  await dbConnect();

  order === "desc" ? (order = "-") : (order = "");

  let finalQuery = {};

  if (query !== "") {
    const regexQuery = { $regex: new RegExp(query, "i") };
    finalQuery = {
      $or: [{ $text: { $search: query } }, { name: regexQuery }],
    };
  }

  const options = {
    sort: `${order}${sortBy}`,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  };

  const categories = await TechnologyCategory.paginate(finalQuery, options);

  return categories;
}

export async function fetchTechnologiesCategoriesPages(query = "") {
  noStore();
  await dbConnect();

  let finalQuery = {};

  if (query !== "") {
    const regexQuery = { $regex: new RegExp(query, "i") };
    finalQuery = {
      $or: [{ $text: { $search: query } }, { name: regexQuery }],
    };
  }

  const options = {
    limit: ITEMS_PER_PAGE,
  };

  const categories = await TechnologyCategory.paginate(finalQuery, options);

  return categories.totalPages;
}

export async function fetchTechnologyCategoryById(id: string) {
  await dbConnect();

  const category = await TechnologyCategory.findById(id);

  return {
    _id: category._id.toString(),
    order: category.order,
    name: category.name,
    name_es: category.name_es,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

export async function fetchCategoriesWithTechnologies() {
  await dbConnect();

  const categories = await TechnologyCategory.find()
    .populate({
      path: "technologies",
      select: "order name slug imageWhite",
      match: {},
      options: { sort: { order: 1 } },
    })
    .sort("order");

  return categories;
}
