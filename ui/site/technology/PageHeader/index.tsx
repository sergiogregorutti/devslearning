"use client";

import { getLocalizedPathFromPrefix } from "@/lib/language";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function PageHeader({
  technology,
  lang,
  dictionary,
}: {
  technology: any;
  lang: string;
  dictionary: any;
}) {
  return (
    <div className="page-header mt-12 sm:mt-18 lg:mt-22">
      <Container>
        <div className="page-header-content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link
                  className="item"
                  href={getLocalizedPathFromPrefix(lang, `/technologies/`)}
                >
                  {dictionary.technologies.technologies}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <span className="separator">/</span>
              </li>
            </ol>
          </nav>
          <div className="title-container">
            <h1>{technology.name}</h1>
          </div>
        </div>
      </Container>
    </div>
  );
}
