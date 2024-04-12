import { getDictionary } from "@/app/[lang]/dictionaries";

import "./styles.css";

export default async function Footer({ lang }: { lang: string }) {
  const dictionary = await getDictionary(lang);

  return (
    <footer>
      <div className="container">
        Devs Learning 2024<span className="separator">|</span>
        <span>
          {dictionary.footer.createdBy}{" "}
          <a href="https://github.com/sergiogregorutti/" target="_blank">
            @sergiogregorutti
          </a>
        </span>
      </div>
    </footer>
  );
}
