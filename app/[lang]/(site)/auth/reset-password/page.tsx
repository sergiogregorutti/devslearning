import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../../dictionaries";
import ResetPasswordComponent from "@/ui/site/auth/resetPassword/ResetPassword";

export async function generateMetadata(
  props: {
    params: Promise<{ lang: string }>;
  }
): Promise<Metadata> {
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

export default async function ResetPassword(
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
        <h1>{dictionary.resetPassword.title}</h1>
        <ResetPasswordComponent dictionary={dictionary} />
      </div>
    </div>
  );
}
