"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import CardLink from "@/components/ui/CardLink";
import Heading from "@/components/ui/Heading";

export default function TechnologiesList({ categories }: { categories: any }) {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {categories.map((category: any) => (
        <div key={category._id}>
          <Heading
            as="h2"
            label={lang === "en" ? category.name : category.name_es}
            className="mb-5"
          />
          <div className="grid grid-cols-1 gap-4 md:gap-5">
            {category.technologies.map((technology: any) => (
              <CardLink
                key={technology.name}
                title={technology.name}
                imageSrc={technology.imageWhite}
                href={getLocalizedPathFromPrefix(
                  lang,
                  `/technologies/${technology.slug}/`
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
