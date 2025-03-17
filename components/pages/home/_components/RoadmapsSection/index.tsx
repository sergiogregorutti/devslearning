"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Heading from "@/components/ui/Heading";

export default function RoadmapsContent() {
  const { lang, dictionary } = useLanguage();

  return (
    <Container className="grid grid-cols-1 md:grid-cols-[45%_55%] py-12">
      <div className="flex justify-center">
        <Image
          src="/assets/man_sitting_with_a_laptop.svg"
          width={400}
          height={274}
          alt="Free Content"
          className="h-auto w-[100%] md:w-[65%] mb-6 md:mb-0"
        />
      </div>
      <div className="flex flex-col items-center md:items-start justify-center">
        <Heading
          as="h2"
          className="text-blue-800 text-4xl mb-4"
          label={dictionary.home.roadmapsSection.title}
        />
        <p className="mb-6 leading-[30px]">
          {dictionary.home.roadmapsSection.description}
        </p>
        <Button
          label={dictionary.home.roadmapsSection.cta}
          href={getLocalizedPathFromPrefix(lang, `/roadmaps`)}
        />
      </div>
    </Container>
  );
}
