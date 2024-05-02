import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";

import "./styles.css";

type Props = {
  params: { lang: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageTitle = "Devs Learning | Course directory for developers";
  const description = "Discover the best courses to learn web development";

  return {
    title: pageTitle,
    description,
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <h1>Admin</h1>
    </>
  );
}
