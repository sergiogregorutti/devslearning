import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "../dictionaries";

import "../../../css/admin-template.css";

type Props = {
  params: { lang: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageTitle = "Devs Learning | Course directory for developers";
  const description = "Discover the best courses to learn web development";

  return {
    title: pageTitle,
    description,
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="admin-template">
      <div className="container">
        <div className="content-container">
          <div className="navigation">
            <ul className="menu">
              <li className="item">
                <Link href="/admin/technologies">Tecnologies</Link>
              </li>
              <li className="item">
                <Link href="/admin/courses">Courses</Link>
              </li>
            </ul>
          </div>
          <div className="content">
            <h1>Admin</h1>
            <Link className="btn btn-big" href="/admin/technologies">
              Tecnologies
            </Link>
            <Link className="btn btn-big" href="/admin/courses">
              Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
