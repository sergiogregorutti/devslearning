import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  let pageTitle;

  switch (params.lang) {
    case "en":
      pageTitle = `Devs Learning | Page Not Found`;
      break;

    case "es":
      pageTitle = `Devs Learning | Página No Encontrada`;
      break;
  }

  return {
    title: pageTitle,
  };
}

import "./styles.css";

export default async function NotFoundPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="page-not-found">
      <div className="container">
        <h1>{dictionary.notFound.title}</h1>
        <p>{dictionary.notFound.description}</p>
      </div>
    </div>
  );
}
