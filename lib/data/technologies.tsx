import { unstable_noStore as noStore } from "next/cache";
import dbConnect from "@/lib/dbConnect";
import { Technology } from "@/lib/models";
import { ITechnology, ITechnologyCoursesCount } from "@/interfaces/course";

export async function fetchTechnologies(limit = 0) {
  noStore();
  await dbConnect();

  const options = {
    sort: "order",
  };

  let query = Technology.find({}, {}, options);

  if (limit > 0) {
    query = query.limit(limit);
  }

  const technologies = await query.exec();

  const simplifiedTechnologies = technologies.map((technology: any) => {
    return {
      ...technology.toObject(),
      _id: technology._id.toString(),
      technologyCategory: technology.technologyCategory.toString(),
    };
  });

  return simplifiedTechnologies;
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
  noStore();
  await dbConnect();

  const technology = await Technology.findById(id);

  return {
    _id: technology._id.toString(),
    order: technology.order,
    technologyCategory: technology.technologyCategory?.toString(),
    name: technology.name,
    slug: technology.slug,
    description: technology.description,
    description_es: technology.description_es,
    long_description: technology.long_description,
    long_description_es: technology.long_description_es,
    imageColor: technology.imageColor,
    imageColorFilepath: technology.imageColorFilepath,
    imageWhite: technology.imageWhite,
    imageWhiteFilepath: technology.imageWhiteFilepath,
    imageLightBlue: technology.imageLightBlue,
    imageLightBlueFilepath: technology.imageLightBlueFilepath,
    createdAt: technology.createdAt,
    updatedAt: technology.updatedAt,
  };
}

export async function fetchTechnologiesCoursesCount() {
  noStore();
  await dbConnect();

  const response: ITechnologyCoursesCount = {};

  const technologies: ITechnology[] = await Technology.find().populate({
    path: "courses",
    select: "name, language",
    match: {},
    options: { sort: { order: 1 } },
  });

  technologies.map((technology) => {
    let totalEnglishCourses = 0,
      totalSpanishCourses = 0;

    technology.courses?.map((course) => {
      switch (course.language) {
        case "en":
          totalEnglishCourses++;
          break;
        case "es":
          totalSpanishCourses++;
          break;
      }
    });

    response[technology._id] = {
      total: Number(technology.courses?.length),
      en: totalEnglishCourses,
      es: totalSpanishCourses,
    };
  });

  return response;
}

export async function fetchTechnologyStats(
  technologyId: string,
  language: string,
  pricing: string
) {
  noStore();
  await dbConnect();

  const languagesArray = decodeURIComponent(language)
    .split(",")
    .map((lang) => lang.trim())
    .filter(Boolean);

  const pricingArray = decodeURIComponent(pricing)
    .split(",")
    .map((lang) => lang.trim())
    .filter(Boolean);

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

  const technology: ITechnology = await Technology.findById(
    technologyId
  ).populate({
    path: "courses",
    select: "name language pricing",
    match: {},
    options: { sort: { order: 1 } },
  });

  let englishCourses = 0,
    spanishCourses = 0,
    paidCourses = 0,
    freeCourses = 0;

  technology.courses?.map((course) => {
    switch (course.language) {
      case "en":
        if (pricingNewArray.length && !pricingNewArray.includes(course.pricing))
          break;
        englishCourses++;
        break;
      case "es":
        if (pricingNewArray.length && !pricingNewArray.includes(course.pricing))
          break;
        spanishCourses++;
        break;
    }

    switch (course.pricing) {
      case "one-time-payment":
        if (languagesArray.length && !languagesArray.includes(course.language))
          break;
        paidCourses++;
        break;
      case "subscription":
        if (languagesArray.length && !languagesArray.includes(course.language))
          break;
        paidCourses++;
        break;
      case "free":
        if (languagesArray.length && !languagesArray.includes(course.language))
          break;
        freeCourses++;
        break;
    }
  });

  return {
    englishCourses,
    spanishCourses,
    paidCourses,
    freeCourses,
  };
}
