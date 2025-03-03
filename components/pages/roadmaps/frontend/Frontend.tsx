import FrontendEn from "./FrontendEn";
import FrontendEs from "./FrontendEs";

export default function Frontend({ lang }: { lang: string }) {
  return <>{lang === "en" ? <FrontendEn /> : <FrontendEs />}</>;
}
