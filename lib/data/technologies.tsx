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
  query = "",
  currentPage = 1,
  sortBy = "createdAt",
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

  const technologies = await Technology.paginate(finalQuery, options);

  return technologies;
}

export async function fetchTechnologiesPages(query = "") {
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

  const technologies = await Technology.paginate(finalQuery, options);

  return technologies.totalPages;
}

export async function fetchTechnologyById(id: string) {
  await dbConnect();

  const technology = await Technology.findById(id);

  return {
    _id: technology._id.toString(),
    name: technology.name,
    imageWhite: technology.imageWhite,
    imageWhiteFilepath: technology.imageWhiteFilepath,
    imageLightBlue: technology.imageLightBlue,
    imageLightBlueFilepath: technology.imageLightBlueFilepath,
    createdAt: technology.createdAt,
    updatedAt: technology.updatedAt,
  };
}
