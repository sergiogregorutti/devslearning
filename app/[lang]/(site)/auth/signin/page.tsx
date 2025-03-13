import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../../dictionaries";
import SignInComponent from "@/components/pages/auth/signIn/SignIn";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
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

export default async function SignIn(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;

  const { lang } = params;

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
