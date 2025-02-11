import { unstable_noStore as noStore } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import { Course } from "@/lib/models";

export async function fetchCourses() {
  noStore();
  await dbConnect();

  const options = {
    sort: "name",
  };

  const courses = await Course.find({}, {}, options);

  return courses;
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredCourses(
  query: any = {},
  currentPage = 1,
  sortBy = "createdAt",
  order = "asc"
) {
  noStore();
  await dbConnect();

  order === "desc" ? (order = "-") : (order = "");

  let finalQuery = {};

  if (query.query !== undefined && query.query !== "") {
    const regexQuery = { $regex: new RegExp(query.query, "i") };
    finalQuery = {
      ...finalQuery,
      $or: [{ $text: { $search: query.query } }, { name: regexQuery }],
    };
  }

  if (query.technology) {
    finalQuery = {
      ...finalQuery,
      technology: query.technology,
    };
  }

  if (query.language) {
    const languagesArray = decodeURIComponent(query.language)
      .split(",")
      .map((lang) => lang.trim());

    if (languagesArray && languagesArray.length > 0) {
      finalQuery = {
        ...finalQuery,
        language: { $in: languagesArray },
      };
    }
  }

  if (query.pricing) {
    const pricingArray = decodeURIComponent(query.pricing)
      .split(",")
      .map((lang) => lang.trim());

    let pricingNewArray: string[] = [];
    pricingArray.forEach((pricing) => {
      if (pricing === "paid") {
        pricingNewArray.push("one-time-payment");
        pricingNewArray.push("subscription");
      }
      if (pricing === "free") {
        pricingNewArray.push("free");
      }
    });

    if (pricingNewArray && pricingNewArray.length > 0) {
      finalQuery = {
        ...finalQuery,
        pricing: { $in: pricingNewArray },
      };
    }
  }

  const options = {
    sort: `${order}${sortBy}`,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    populate: "technology",
  };

  const courses = await Course.paginate(finalQuery, options);

  return courses;
}

export async function fetchCoursesPages(query: any = {}) {
  noStore();
  await dbConnect();

  let finalQuery = {};

  if (query.query !== undefined && query.query !== "") {
    const regexQuery = { $regex: new RegExp(query.query, "i") };
    finalQuery = {
      ...finalQuery,
      $or: [{ $text: { $search: query.query } }, { name: regexQuery }],
    };
  }

  if (query.technology) {
    finalQuery = {
      ...finalQuery,
      technology: query.technology,
    };
  }

  if (query.language) {
    const languagesArray = decodeURIComponent(query.language)
      .split(",")
      .map((lang) => lang.trim());

    if (languagesArray && languagesArray.length > 0) {
      finalQuery = {
        ...finalQuery,
        language: { $in: languagesArray },
      };
    }
  }

  if (query.pricing) {
    const pricingArray = decodeURIComponent(query.pricing)
      .split(",")
      .map((lang) => lang.trim());

    let pricingNewArray: string[] = [];
    pricingArray.forEach((pricing) => {
      if (pricing === "paid") {
        pricingNewArray.push("one-time-payment");
        pricingNewArray.push("subscription");
      }
      if (pricing === "free") {
        pricingNewArray.push("free");
      }
    });

    if (pricingNewArray && pricingNewArray.length > 0) {
      finalQuery = {
        ...finalQuery,
        pricing: { $in: pricingNewArray },
      };
    }
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
    technology: course.technology.toString(),
    language: course.language,
    name: course.name,
    description: course.description,
    long_description: course.long_description,
    image: course.image,
    imageFilepath: course.imageFilepath,
    platform: course.platform,
    author: course.author,
    pricing: course.pricing,
    price: course.price,
    year: course.year,
    link: course.link,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
  };
}
