"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Language({
  stats,
  dictionary,
}: {
  stats: any;
  dictionary: { [key: string]: any };
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();
  const language = params.get("language");

  const handleChange = () => {
    const english = (document.getElementById("languageEn") as HTMLInputElement)
      ?.checked;
    const spanish = (document.getElementById("languageEs") as HTMLInputElement)
      ?.checked;

    let languageValue = "";
    if (english && spanish) {
      languageValue = "en,es";
    } else {
      if (english) {
        languageValue = "en";
      }

      if (spanish) {
        languageValue = "es";
      }
    }

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("language", encodeURIComponent(languageValue) || "");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="item">
      <label className="form-label">{dictionary.technologies.language}</label>
      <div className="options">
        <label className="ckeckbox-wrapper">
          {dictionary.technologies.english}{" "}
          {stats.englishCourses !== undefined
            ? `(${stats.englishCourses})`
            : null}
          <input
            type="checkbox"
            id="languageEn"
            onChange={handleChange}
            defaultChecked={language?.includes("en") ? true : false}
          />
          <span className="checkmark"></span>
        </label>
        <label className="ckeckbox-wrapper">
          {dictionary.technologies.spanish}{" "}
          {stats.spanishCourses !== undefined
            ? `(${stats.spanishCourses})`
            : null}
          <input
            type="checkbox"
            id="languageEs"
            onChange={handleChange}
            defaultChecked={language?.includes("es") ? true : false}
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </div>
  );
}
