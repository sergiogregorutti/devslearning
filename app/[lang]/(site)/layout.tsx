import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");
import { getDictionary } from "@/app/[lang]/(site)/dictionaries";
import { Nunito, Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import Header from "@/ui/site/header/Header";
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
  metadataBase: new URL("https://desvlearning.com"),
  title: "Devs Learning | Course directory for developers",
  description: "Course directory for Developers",
  openGraph: {
    title: "Devs Learning | Course directory for developers",
    description: "Course directory for Developers",
    siteName: "Devs Learning",
    images: [
      {
        url: "https://devslearning.com/assets/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devs Learning | Course directory for developers",
    description: "Course directory for Developers",
    images: ["https://devslearning.com/assets/opengraph-image.png"],
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["sergiogregorutti@gmail.com", "https://sergiogregorutti.com"],
    },
  },
};

import "../global.css";

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: Promise<any>;
  }>
) {
  const params = await props.params;

  const { lang } = params;

  const { children } = props;

  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  let user = null;
  if (token) {
    user = jwt.decode(token.value);
  }
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} className={`${nunito.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning>
        <Header dictionary={dictionary} user={user} lang={lang} />
        {children}
        <Footer lang={lang} dictionary={dictionary} />

        {process.env.ENVIRONMENT === "production" ? (
          <>
            <SpeedInsights />
            <Analytics />
            <GoogleAnalytics
              gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? ""}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
