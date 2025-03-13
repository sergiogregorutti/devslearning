import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../../../dictionaries";
import ActivateAccountComponent from "@/components/pages/auth/activateAccount/ActivateAccount";

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  let pageTitle;

  switch (params.lang) {
    case "en":
      pageTitle = `Devs Learning | Activate Account`;
      break;

    case "es":
      pageTitle = `Devs Learning | Activar Cuenta`;
      break;
  }

  return {
    title: pageTitle,
  };
}

export default async function ActivateAccount(props: {
  params: Promise<{ lang: string; token: string }>;
}) {
  const params = await props.params;

  const { lang, token } = params;

  const dictionary = await getDictionary(lang);

  return (
    <div className="auth-template">
      <div className="container">
        <h1>{dictionary.activateAccount.title}</h1>
        <ActivateAccountComponent token={token} dictionary={dictionary} />
      </div>
    </div>
  );
}
