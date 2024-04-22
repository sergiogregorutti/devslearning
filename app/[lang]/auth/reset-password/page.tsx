import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../../dictionaries";
import ResetPasswordComponent from "@/components/resetPassword/ResetPassword";

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

export default async function ResetPassword({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="reset-password">
      <div className="container">
        <h1>{dictionary.resetPassword.title}</h1>
        <ResetPasswordComponent lang={lang} dictionary={dictionary} />
      </div>
    </div>
  );
}
