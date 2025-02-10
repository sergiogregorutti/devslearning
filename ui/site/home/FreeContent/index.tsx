import Image from "next/image";

import "./styles.css";

export default function FreeContent({
  dictionary,
}: {
  dictionary: { [key: string]: any };
}) {
  return (
    <div className="free-content">
      <div className="container">
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
    </div>
  );
}
