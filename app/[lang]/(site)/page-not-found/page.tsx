import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../dictionaries";

export async function generateMetadata(
  props: {
    params: Promise<{ lang: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
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

export default async function NotFoundPage(
  props: {
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;

  const {
    lang
  } = params;

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
