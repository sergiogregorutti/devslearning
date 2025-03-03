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
const courses: ICourse[] = await fetchCourses();

const coursesRoutes: any = courses.map(
  (course) => `https://www.devslearning.com/courses/${course._id}/`
);
const technologiesRoutes: any = technologies.map(
  (tech) => `https://www.devslearning.com/technologies/${tech.slug}/`
);
const technologiesCoursesRoutes: any = technologies.map(
  (tech) => `https://www.devslearning.com/technologies/${tech.slug}/courses`
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
    ...coursesRoutes.map((url: string) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: {
          es: url.replace("devslearning.com", "devslearning.com/es"),
        },
      },
    })),
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
    ...technologiesRoutes.map((url: string) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: {
          es: url.replace("devslearning.com", "devslearning.com/es"),
        },
      },
    })),
    ...technologiesCoursesRoutes.map((url: string) => ({
      url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: {
          es: url.replace("devslearning.com", "devslearning.com/es"),
        },
      },
    })),
    {
      url: "https://www.devslearning.com/roadmaps",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
      alternates: {
        languages: {
          es: "https://www.devslearning.com/es/roadmaps",
        },
      },
    },
    {
      url: "https://www.devslearning.com/roadmaps/frontend",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
      alternates: {
        languages: {
          es: "https://www.devslearning.com/es/roadmaps/frontend",
        },
      },
    },
    {
      url: "https://www.devslearning.com/roadmaps/backend",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
      alternates: {
        languages: {
          es: "https://www.devslearning.com/es/roadmaps/backend",
        },
      },
    },
    {
      url: "https://www.devslearning.com/roadmaps/fullstack",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
      alternates: {
        languages: {
          es: "https://www.devslearning.com/es/roadmaps/fullstack",
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
  ];
}
