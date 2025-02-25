import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import PageHeader from "@/components/layout/PageHeader";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";

import "./styles.css";

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
      pageTitle = "Devs Learning | About";
      description = "Browse between our technologies to learn web development";
      break;

    case "es":
      pageTitle = "Devs Learning | Acerca De";
      description =
        "Navega entre nuestras tecnologías para aprender desarrollo web";
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

export default async function Technologies(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;

  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <div className="about-page">
      <PageHeader title={dictionary.about.title} />
      <Container>
        <div className="content">
          <div className="col-content">
            <h2>{dictionary.about.mission}</h2>
            <p className="text">{dictionary.about.mission_description}</p>
            <h2>{dictionary.about.vision}</h2>
            <p className="text">{dictionary.about.vision_description}</p>
            <h2>{dictionary.about.team}</h2>
            <div className="team">
              <div className="card">
                <Image
                  src="/assets/team/sergio.jpg"
                  width={200}
                  height={200}
                  alt="Sergio Gregorutti"
                  className="image"
                />
                <h3>Sergio Gregorutti</h3>
                <span className="position">
                  {dictionary.about.team_members.sergio.position}
                </span>
                <span className="description"></span>
                <ul className="contact-info">
                  <li>
                    <Link
                      href="https://github.com/sergiogregorutti"
                      target="_blank"
                    >
                      <Image
                        src="/assets/icons/github.svg"
                        width={20}
                        height={20}
                        alt="GitHub"
                      />
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.linkedin.com/in/sergiogregorutti/"
                      target="_blank"
                    >
                      <Image
                        src="/assets/icons/linkedin.svg"
                        width={20}
                        height={20}
                        alt="LinkedIn"
                      />
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="card">
                <Image
                  src="/assets/team/florencia.jpeg"
                  width={200}
                  height={200}
                  alt="Florencia De Luca"
                  className="image"
                />
                <h3>Florencia De Luca</h3>
                <span className="position">
                  {dictionary.about.team_members.florencia.position}
                </span>
                <span className="description"></span>
                <ul className="contact-info">
                  <li>
                    <Link
                      href="https://www.linkedin.com/in/florencia-de-luca-87573227/"
                      target="_blank"
                    >
                      <Image
                        src="/assets/icons/linkedin.svg"
                        width={20}
                        height={20}
                        alt="LinkedIn"
                      />
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-image">
            <Image
              src="/assets/logo_vertical.svg"
              width={129}
              height={38}
              alt="Devs Learning"
              priority={true}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
