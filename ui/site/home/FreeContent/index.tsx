import Image from "next/image";
import Container from "@/components/layout/Container";

import "./styles.css";

export default function FreeContent({
  dictionary,
}: {
  dictionary: { [key: string]: any };
}) {
  return (
    <div className="free-content bg-blue-300">
      <Container>
        <div className="content">
          <div className="col-text">
            <span className="title">{dictionary.home.freeContent.title}</span>
            <p>{dictionary.home.freeContent.description}</p>
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
