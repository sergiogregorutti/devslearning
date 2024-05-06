import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import Header from "@/app/[lang]/admin/components/header/Header";

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

  return (
    <>
      <Header user={user} lang={lang} /> {children}
    </>
  );
}
