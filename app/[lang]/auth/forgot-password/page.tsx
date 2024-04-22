import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../../dictionaries";
import ForgotPasswordComponent from "@/components/forgotPassword/ForgotPassword";

import "./styles.css";

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
    <div className="forgot-password">
      <div className="container">
        <h1>{dictionary.forgotPassword.title}</h1>
        <ForgotPasswordComponent lang={lang} dictionary={dictionary} />
      </div>
    </div>
  );
}
