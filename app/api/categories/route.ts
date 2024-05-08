import dbConnect from "../../../lib/dbConnect";
import Category from "../../../models/Category";

interface FindArgs {
  [key: string]: any;
}

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 10;
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
      findArgs[key] = payload.filters[key];
    }
  }

  const { limit, offset } = getPagination(page, size);
  order === "desc" ? (order = "-") : (order = "");

  const categories = await Category.paginate(findArgs, {
    offset,
    limit,
    select: "-photo",
    sort: `${order}${sortBy}`,
  });

  return Response.json({
    totalItems: categories.totalDocs,
    categories: categories.docs,
    totalPages: categories.totalPages,
    currentPage: categories.page - 1,
  });
}
