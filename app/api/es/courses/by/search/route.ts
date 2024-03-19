import dbConnect from "../../../../../../lib/dbConnect";
import CourseEs from "../../../../../../models/CourseEs";

interface FindArgs {
  [key: string]: any;
}

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

export async function POST(request: Request) {
  await dbConnect();

  const payload = await request.json();

  const { page, size } = payload;
  let order = payload.order ? payload.order : "desc";
  let sortBy = payload.sortBy ? payload.sortBy : "_id";
  const findArgs: FindArgs = {};

  for (let key in payload.filters) {
    if (payload.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: payload.filters[key][0],
          $lte: payload.filters[key][1],
        };
      } else {
        findArgs[key] = payload.filters[key];
      }
    }
  }

  const { limit, offset } = getPagination(page, size);
  order === "desc" ? (order = "-") : (order = "");

  const courses = await CourseEs.paginate(findArgs, {
    offset,
    limit,
    select: "-photo",
    populate: { path: "category", select: "_id name" },
    sort: `${order}${sortBy}`,
  });

  return Response.json({
    totalItems: courses.totalDocs,
    courses: courses.docs,
    totalPages: courses.totalPages,
    currentPage: courses.page - 1,
  });
}
