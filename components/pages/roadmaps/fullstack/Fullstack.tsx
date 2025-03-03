import FullstackEn from "./FullstackEn";
import FullstackEs from "./FullstackEs";

export default function Fullstack({ lang }: { lang: string }) {
  return <>{lang === "en" ? <FullstackEn /> : <FullstackEs />}</>;
}
