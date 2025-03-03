import BackendEn from "./BackendEn";
import BackendEs from "./BackendEs";

export default function Backend({ lang }: { lang: string }) {
  return <>{lang === "en" ? <BackendEn /> : <BackendEs />}</>;
}
