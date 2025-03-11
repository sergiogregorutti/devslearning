import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import { getLocalizedPathFromPrefix } from "@/lib/language";

import "./styles.css";

export default function TechnologiesSection({
  dictionary,
  lang,
}: {
  dictionary: { [key: string]: any };
  lang: string;
}) {
  return (
    <div className="free-content bg-blue-300">
      <Container>
        <div className="content">
          <div className="col-text">
            <span className="title">
              {dictionary.home.technologiesSection.title}
            </span>
            <p>{dictionary.home.technologiesSection.description}</p>
            <Button
              label={dictionary.home.technologiesSection.cta}
              href={getLocalizedPathFromPrefix(lang, `/technologies`)}
            />
          </div>
          <div className="col-image">
            <Image
              src="/assets/notebook.svg"
              width={400}
              height={274}
              alt="Free Content"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
