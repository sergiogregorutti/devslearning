import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import { getDictionary } from "@/app/[lang]/(site)/dictionaries";
import { Nunito, Poppins } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/ui/admin/header/Header";
import Navigation from "../../../../ui/admin/navigation/Navigation";
import Footer from "@/ui/common/footer/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Devs Learning | Admin",
  description: "Course directory for Developers",
};

import "../../global.css";
import "../../../../css/admin-template.css";

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { lang: string };
  }>
) {
  const params = await props.params;

  const {
    lang
  } = params;

  const {
    children
  } = props;

  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  let user = null;
  if (token) {
    user = jwt.decode(token.value);
  }
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={`${nunito.variable} ${poppins.variable}`}>
      <body>
        <Header user={user} lang={lang} />
        <div className="admin-template">
          <div className="container">
            <div className="content-container">
              <Navigation />
              <div className="content">{children}</div>
            </div>
          </div>
        </div>
        <Footer lang={lang} dictionary={dictionary} />
      </body>
    </html>
  );
}
