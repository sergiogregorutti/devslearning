import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../../dictionaries";
import ForgotPasswordComponent from "@/components/pages/auth/forgotPassword/ForgotPassword";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
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

export default async function ForgotPassword(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;

  const { lang } = params;

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
