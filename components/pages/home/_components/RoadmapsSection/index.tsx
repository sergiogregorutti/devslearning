"use client";

import { useLanguage } from "@/components/context/LanguageContext";
import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { getLocalizedPathFromPrefix } from "@/lib/language";

import "./styles.css";

export default function RoadmapsContent() {
  const { lang, dictionary } = useLanguage();

  return (
    <div className="roadmaps-content">
      <Container>
        <div className="content">
          <div className="col-image">
            <Image
              src="/assets/man_sitting_with_a_laptop.svg"
              width={400}
              height={274}
              alt="Free Content"
            />
          </div>
          <div className="col-text">
            <span className="title">
              {dictionary.home.roadmapsSection.title}
            </span>
            <p>{dictionary.home.roadmapsSection.description}</p>
            <Button
              label={dictionary.home.roadmapsSection.cta}
              href={getLocalizedPathFromPrefix(lang, `/roadmaps`)}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
