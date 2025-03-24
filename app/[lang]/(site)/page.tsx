import type { Metadata } from "next";
import { headers } from "next/headers";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import { redirect } from "next/navigation";
import { fetchTechnologies } from "@/lib/data/technologies";
import { fetchLatestCourses } from "@/lib/data/courses";
import HomePage from "@/components/pages/home";

type Props = {
  params: Promise<{ lang: string; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  let pageTitle;
  let description;

  switch (params.lang) {
    case "en":
      pageTitle = "Devs Learning | Learn, Explore, and Master Web Development";
      description =
        "Discover courses, technologies, and roadmaps to guide your development journey and become a web development expert.";
      break;

    case "es":
      pageTitle = "Devs Learning | Aprende, Explora y Domina el Desarrollo Web";
      description =
        "Descubre cursos, tecnologías y rutas de aprendizaje que guiarán tu viaje de desarrollo para convertirte en un experto en programación web.";
      break;
  }

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      siteName: "Devs Learning",
      images: [
        {
          url: "https://devslearning.com/assets/opengraph-image.png",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: ["https://devslearning.com/assets/opengraph-image.png"],
    },
  };
}

export default async function Home(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;

  const { lang } = params;

  const cookieStore = await cookies();
  const languageCookie = cookieStore.get("language");

  const token = cookieStore.get("token");
  let user = null;
  if (token) {
    user = jwt.decode(token.value);
  }

  if (languageCookie?.value === "es" && lang === "en") {
    redirect("/es/");
  } else {
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language");
    if (
      lang === "en" &&
      languageCookie?.value !== "en" &&
      acceptLanguage?.includes("es")
    ) {
      redirect("/es/");
    }
  }

  const technologies = await fetchTechnologies(4);
  const latestCourses = await fetchLatestCourses();

  return <HomePage technologies={technologies} latestCourses={latestCourses} />;
}
