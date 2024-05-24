import { unstable_noStore as noStore } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import Course from "../../models/Course";

const ITEMS_PER_PAGE = 4;
export async function fetchFilteredCourses(
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

  const courses = await Course.paginate(finalQuery, options);

  return courses;
}

export async function fetchCoursesPages(query = "") {
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

  const courses = await Course.paginate(finalQuery, options);

  return courses.totalPages;
}

export async function fetchCourseById(id: string) {
  await dbConnect();

  const course = await Course.findById(id);

  return {
    _id: course._id.toString(),
    name: course.name,
    image: course.image,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
  };
}
