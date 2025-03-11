"use client";
import React, { useEffect, useState } from "react";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/common/Counter";
import { ITechnologyCoursesCount } from "@/interfaces/course";

import "./styles.css";

export default function TechnologiesList({
  dictionary,
  lang,
  categories,
}: {
  dictionary: { [key: string]: any };
  lang: string;
  categories: any;
}) {
  return (
    <div className="categories">
      <div className="container">
        <div className="categories-list">
          {categories.map((category: any) => (
            <div key={category._id} className="category">
              <h2>{lang === "en" ? category.name : category.name_es}</h2>
              <div className="technologies-list">
                {category.technologies.map((technology: any) => (
                  <Link
                    className="technology-card transition-all duration-500"
                    key={technology.name}
                    href={getLocalizedPathFromPrefix(
                      lang,
                      `/technologies/${technology.slug}/`
                    )}
                  >
                    <Image
                      src={technology.imageWhite}
                      width={100}
                      height={100}
                      alt={technology.name}
                      priority={true}
                    />
                    <div className="technology-card-content">
                      <span>{technology.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
