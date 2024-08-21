import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../../dictionaries";
import ForgotPasswordComponent from "@/ui/site/auth/forgotPassword/ForgotPassword";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  let pageTitle;

  switch (params.lang) {
    case "en":
      pageTitle = `Devs Learning | Forgot Password`;
      break;

    case "es":
      pageTitle = `Devs Learning | Olvide Mi Contraseña`;
      break;
  }

  return {
    title: pageTitle,
  };
}

export default async function ForgotPassword({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="auth-template">
      <div className="container">
        <h1>{dictionary.forgotPassword.title}</h1>
        <ForgotPasswordComponent dictionary={dictionary} />
      </div>
    </div>
  );
}
