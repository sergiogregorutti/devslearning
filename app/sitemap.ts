import type { MetadataRoute } from "next";

import { fetchTechnologies } from "@/lib/data/technologies";
import { fetchCourses } from "@/lib/data/courses";

interface ITechnology {
  slug: string;
}
interface ICourse {
  _id: string;
}

const technologies: ITechnology[] = await fetchTechnologies();
const technologyRoutesEn: any = technologies.map(
  (tech) => `https://www.devslearning.com/technologies/${tech.slug}/courses`
);
const technologyRoutesEs: any = technologies.map(
  (tech) => `https://www.devslearning.com/es/technologies/${tech.slug}/courses`
);

const courses: ICourse[] = await fetchCourses();
const coursesRoutesEn: any = courses.map(
  (course) => `https://www.devslearning.com/courses/${course._id}/`
);
const coursesRoutesEs: any = courses.map(
  (course) => `https://www.devslearning.com/es/courses/${course._id}/`
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.devslearning.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.devslearning.com/es",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://www.devslearning.com/technologies",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://www.devslearning.com/es/technologies",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://www.devslearning.com/about",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: "https://www.devslearning.com/es/about",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    ...technologyRoutesEn.map((url: string) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    })),
    ...technologyRoutesEs.map((url: string) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    })),
    ...coursesRoutesEn.map((url: string) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    })),
    ...coursesRoutesEs.map((url: string) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    })),
  ];
}
