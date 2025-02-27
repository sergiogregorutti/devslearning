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
  (tech) => `https://www.devslearning.com/technologies/${tech.slug}`
);
const technologyRoutesEs: any = technologies.map(
  (tech) => `https://www.devslearning.com/es/technologies/${tech.slug}`
);
const technologyCoursesRoutesEn: any = technologies.map(
  (tech) => `https://www.devslearning.com/technologies/${tech.slug}/courses`
);
const technologyCoursesRoutesEs: any = technologies.map(
  (tech) => `https://www.devslearning.com/es/technologies/${tech.slug}/courses`
);

const courses: ICourse[] = await fetchCourses();
const coursesRoutesEn: any = courses.map(
  (course) => `https://www.devslearning.com/courses/${course._id}`
);
const coursesRoutesEs: any = courses.map(
  (course) => `https://www.devslearning.com/es/courses/${course._id}`
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.devslearning.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          es: "https://www.devslearning.com/es",
        },
      },
    },
    {
      url: "https://www.devslearning.com/technologies",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
      alternates: {
        languages: {
          es: "https://www.devslearning.com/es/technologies",
        },
      },
    },
    {
      url: "https://www.devslearning.com/courses",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
      alternates: {
        languages: {
          es: "https://www.devslearning.com/es/courses",
        },
      },
    },
    {
      url: "https://www.devslearning.com/about",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
      alternates: {
        languages: {
          es: "https://www.devslearning.com/es/about",
        },
      },
    },
    ...technologies.map((technology: any) => ({
      url: `https://www.devslearning.com/technologies/${technology.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: {
          es: `https://www.devslearning.com/es/technologies/${technology.slug}`,
        },
      },
    })),
    ...technologies.map((technology: any) => ({
      url: `https://www.devslearning.com/technologies/${technology.slug}/courses`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: {
          es: `https://www.devslearning.com/es/technologies/${technology.slug}/courses`,
        },
      },
    })),
    ...courses.map((course: any) => ({
      url: `https://www.devslearning.com/courses/${course._id}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: {
          es: `https://www.devslearning.com/es/courses/${course._id}`,
        },
      },
    })),
  ];
}
