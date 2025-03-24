"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Heading from "@/components/ui/Heading";

export default function TechnologiesSection() {
  const { lang, dictionary } = useLanguage();

  return (
    <Container className="grid grid-cols-1 md:grid-cols-[45%_55%] py-12">
      <div className="flex flex-col order-2 md:order-1 items-center md:items-start justify-center">
        <Heading
          as="h2"
          className="text-blue-800 text-4xl mb-4"
          label={dictionary.home.technologiesSection.title}
        />
        <p className="mb-6 leading-[30px]">
          {dictionary.home.technologiesSection.description}
        </p>
        <Button
          label={dictionary.home.technologiesSection.cta}
          href={getLocalizedPathFromPrefix(lang, `/technologies`)}
        />
      </div>
      <div className="flex order-1 md:order-2 justify-center">
        <Image
          src="/assets/notebook.svg"
          width={400}
          height={274}
          alt="Free Content"
          className="h-auto w-[100%] md:w-[65%] mb-6 md:mb-0"
        />
      </div>
    </Container>
  );
}
