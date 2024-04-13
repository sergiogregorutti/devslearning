import { Nunito, Poppins } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

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
  title: "Devs Learning | Course directory for developers",
  description: "Course directory for Developers",
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["sergiogregorutti@gmail.com", "https://sergiogregorutti.com"],
    },
  },
};

import "./global.css";

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${poppins.variable}`}>
      <UserProvider>
        <body>
          <Header lang={lang} />
          {children}
          <Footer lang={lang} />
          <SpeedInsights />
          <Analytics />
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? ""}
          />
        </body>
      </UserProvider>
    </html>
  );
}
