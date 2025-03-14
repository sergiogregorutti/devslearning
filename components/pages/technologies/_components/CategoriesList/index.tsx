"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import CardLink from "@/components/ui/CardLink";

import "./styles.css";

export default function TechnologiesList({ categories }: { categories: any }) {
  const { lang } = useLanguage();

  return (
    <div className="categories-component">
      <div className="container">
        <div className="categories-list">
          {categories.map((category: any) => (
            <div key={category._id} className="category">
              <h2>{lang === "en" ? category.name : category.name_es}</h2>
              <div className="technologies-list">
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
      </div>
    </div>
  );
}
