import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "../../(site)/dictionaries";
import Button from "@/components/ui/Button";

type Props = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageTitle = "Devs Learning | Course directory for developers";
  const description = "Discover the best courses to learn web development";

  return {
    title: pageTitle,
    description,
  };
}

export default async function Home(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;

  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="buttons-container">
        <Button label="Technologies" href="/admin/technologies" />
        <Button label="Courses" href="/admin/courses" />
      </div>
    </>
  );
}
