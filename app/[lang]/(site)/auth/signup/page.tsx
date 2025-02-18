import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../../dictionaries";
import SignUpComponent from "@/ui/site/auth/signUp/SignUp";

export async function generateMetadata(
  props: {
    params: Promise<{ lang: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
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

export default async function SignUp(
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
    <div className="auth-template">
      <div className="container">
        <h1>{dictionary.signUp.title}</h1>
        <SignUpComponent lang={lang} dictionary={dictionary} />
      </div>
    </div>
  );
}
