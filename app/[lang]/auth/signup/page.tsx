import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../../dictionaries";
import SignUpComponent from "@/components/signUp/SignUp";

import "./styles.css";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  let pageTitle;

  switch (params.lang) {
    case "en":
      pageTitle = `Devs Learning | Sign Up`;
      break;

    case "es":
      pageTitle = `Devs Learning | Registrarse`;
      break;
  }

  return {
    title: pageTitle,
  };
}

export default async function SignUp({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="signup">
      <div className="container">
        <h1>{dictionary.signUp.title}</h1>
        <SignUpComponent lang={lang} dictionary={dictionary} />
      </div>
    </div>
  );
}
