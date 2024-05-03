import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import { getDictionary } from "@/app/[lang]/dictionaries";
import Header from "@/components/header/Header";

export default async function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  let user = null;
  if (token) {
    user = jwt.decode(token.value);
  }
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header dictionary={dictionary} user={user} lang={lang} /> {children}
    </>
  );
}
