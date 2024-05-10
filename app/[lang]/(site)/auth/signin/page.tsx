import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../../dictionaries";
import SignInComponent from "@/components/auth/signIn/SignIn";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  let pageTitle;

  switch (params.lang) {
    case "en":
      pageTitle = `Devs Learning | Sign In`;
      break;

    case "es":
      pageTitle = `Devs Learning | Ingresar`;
      break;
  }

  return {
    title: pageTitle,
  };
}

export default async function SignIn({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="auth-template">
      <div className="container">
        <h1>{dictionary.signIn.title}</h1>
        <SignInComponent lang={lang} dictionary={dictionary} />
      </div>
    </div>
  );
}
