import { unstable_noStore as noStore } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import Technology from "../../models/Technology";

export async function fetchTechnologies() {
  noStore();
  await dbConnect();

  const options = {
    sort: "name",
  };

  const technologies = await Technology.find({}, {}, options);

  return technologies;
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredTechnologies(
  query: any = "",
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

  if (query.technologyCategory) {
    finalQuery = {
      ...finalQuery,
      technologyCategory: query.technologyCategory,
    };
  }

  const options = {
    sort: `${order}${sortBy}`,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    populate: "technologyCategory",
  };

  const technologies = await Technology.paginate(finalQuery, options);

  return technologies;
}

export async function fetchTechnologiesPages(query: any = "") {
  noStore();
  await dbConnect();

  let finalQuery = {};

  if (query !== "") {
    const regexQuery = { $regex: new RegExp(query, "i") };
    finalQuery = {
      $or: [{ $text: { $search: query } }, { name: regexQuery }],
    };
  }

  if (query.technologyCategory) {
    finalQuery = {
      ...finalQuery,
      technologyCategory: query.technologyCategory,
    };
  }

  const options = {
    limit: ITEMS_PER_PAGE,
  };

  const technologies = await Technology.paginate(finalQuery, options);

  return technologies.totalPages;
}

export async function fetchTechnologyById(id: string) {
  await dbConnect();

  const technology = await Technology.findById(id);

  return {
    _id: technology._id.toString(),
    order: technology.order,
    technologyCategory: technology.technologyCategory?.toString(),
    name: technology.name,
    slug: technology.slug,
    imageWhite: technology.imageWhite,
    imageWhiteFilepath: technology.imageWhiteFilepath,
    imageLightBlue: technology.imageLightBlue,
    imageLightBlueFilepath: technology.imageLightBlueFilepath,
    createdAt: technology.createdAt,
    updatedAt: technology.updatedAt,
  };
}
