import Link from "next/link";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import { getDictionary } from "../dictionaries";

import "./styles.css";

export default async function NotFoundPage({
  params,
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(params.lang);

  return (
    <div className="not-found">
      <div className="container">
        <h1>{dictionary.notFound.title}</h1>
        <p>{dictionary.notFound.description}</p>
        <p>
          <Link href={getLocalizedPathFromPrefix(params.lang, `/`)}>
            {dictionary.notFound.link}
          </Link>
        </p>
      </div>
    </div>
  );
}
