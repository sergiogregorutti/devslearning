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
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <script type='text/javascript'>
          window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', 'bf44692fcb061ad2509652dae2260a7ded59bfac', { region: 'eu' });
        </script>
      </head>
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
