import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { getDictionary } from "@/app/[lang]/(site)/dictionaries";
import { Nunito, Poppins } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/ui/admin/header/Header";
import Navigation from "../../../../ui/admin/navigation/Navigation";
import Footer from "@/components/footer/Footer";

import theme from "../../theme";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "Devs Learning | Admin",
  description: "Course directory for Developers",
};

import "../../global.css";
import "../../../../css/admin-template.css";

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  let user = null;
  if (token) {
    user = jwt.decode(token.value);
  }
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={`${nunito.variable} ${poppins.variable}`}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Header user={user} lang={lang} />
            <div className="admin-template">
              <div className="container">
                <div className="content-container">
                  <Navigation />
                  <div className="content">{children}</div>
                </div>
              </div>
            </div>
            <Footer dictionary={dictionary} />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
