import { Metadata } from "next";
import * as React from "react";
import { getDictionary } from "../../../dictionaries";
import ActivateAccountComponent from "@/ui/site/auth/activateAccount/ActivateAccount";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
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

export default async function ActivateAccount({
  params: { lang, token },
}: {
  params: { lang: string; token: string };
}) {
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
